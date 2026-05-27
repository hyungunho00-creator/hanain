# -*- coding: utf-8 -*-
"""
파이프라인: gen_url → 다운로드 → WebP 변환 → Supabase Storage 업로드 → posts.og_image PATCH

각 단계는 idempotent. state.json 기준으로 미완료 항목만 처리.

실행:
    python3 pipeline.py download   # gen_url → sandbox_path
    python3 pipeline.py upload     # sandbox_path → storage_url
    python3 pipeline.py patch      # storage_url → posts.og_image
    python3 pipeline.py all        # 위 3단계 연속 실행
"""
import os
import sys
import json
import time
import io
import urllib.request
import urllib.error

from state_manager import load_state, save_state, update_slug, summary

HERE = os.path.dirname(os.path.abspath(__file__))
DOWNLOAD_DIR = os.path.join(HERE, "downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

BUCKET = "blog-images"
STORAGE_PUBLIC_BASE = f"{SB}/storage/v1/object/public/{BUCKET}"


# ──────────────────────────────────────────────────────────────────
def download_one(slug: str, gen_url: str) -> str:
    """genspark CDN에서 PNG 다운로드 → WebP 변환 → 로컬 저장. sandbox_path 반환."""
    target = os.path.join(DOWNLOAD_DIR, f"{slug}.webp")
    if os.path.exists(target) and os.path.getsize(target) > 1024:
        return target

    # 1) PNG 받기
    req = urllib.request.Request(
        gen_url,
        headers={"User-Agent": "Mozilla/5.0 hanain-image-pipeline/1.0"},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        raw = r.read()
    if len(raw) < 1024:
        raise RuntimeError(f"too small ({len(raw)} bytes)")

    # 2) WebP 변환 (Pillow 사용)
    from PIL import Image
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    # 1280x720 (16:9 web header) 로 리사이즈 — CDN 대역폭 절약
    img = img.resize((1280, 720), Image.LANCZOS)
    img.save(target, "WEBP", quality=82, method=6)
    return target


def cmd_download():
    state = load_state()
    pending = [(s, e) for s, e in state.items() if e.get("gen_url") and not e.get("sandbox_path")]
    print(f"[download] pending: {len(pending)}")
    for i, (slug, entry) in enumerate(pending, 1):
        try:
            path = download_one(slug, entry["gen_url"])
            sz = os.path.getsize(path)
            update_slug(slug, sandbox_path=path, sandbox_size=sz)
            print(f"  [{i:3d}/{len(pending)}] OK {slug[:50]:<50} {sz//1024}KB")
        except Exception as ex:
            print(f"  [{i:3d}/{len(pending)}] FAIL {slug[:50]}: {ex}")
            errors = entry.get("errors", [])
            errors.append(f"download: {ex}")
            update_slug(slug, errors=errors)


# ──────────────────────────────────────────────────────────────────
def upload_one(slug: str, sandbox_path: str) -> str:
    """Supabase Storage에 업로드 → public URL 반환. 이미 있으면 PUT으로 덮어쓰기 (idempotent)."""
    object_key = f"{slug}.webp"
    upload_url = f"{SB}/storage/v1/object/{BUCKET}/{object_key}"
    with open(sandbox_path, "rb") as f:
        data = f.read()
    req = urllib.request.Request(
        upload_url,
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {SERVICE_KEY}",
            "apikey": SERVICE_KEY,
            "Content-Type": "image/webp",
            "x-upsert": "true",  # 이미 있으면 덮어쓰기
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            r.read()
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {body[:200]}")
    return f"{STORAGE_PUBLIC_BASE}/{object_key}"


def cmd_upload():
    state = load_state()
    pending = [(s, e) for s, e in state.items() if e.get("sandbox_path") and not e.get("storage_url")]
    print(f"[upload] pending: {len(pending)}")
    for i, (slug, entry) in enumerate(pending, 1):
        try:
            url = upload_one(slug, entry["sandbox_path"])
            update_slug(slug, storage_url=url)
            print(f"  [{i:3d}/{len(pending)}] OK {slug[:50]:<50} → {url}")
        except Exception as ex:
            print(f"  [{i:3d}/{len(pending)}] FAIL {slug[:50]}: {ex}")
            errors = entry.get("errors", [])
            errors.append(f"upload: {ex}")
            update_slug(slug, errors=errors)


# ──────────────────────────────────────────────────────────────────
def patch_one(slug: str, storage_url: str) -> int:
    """posts.og_image PATCH."""
    body = json.dumps({"og_image": storage_url}).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?slug=eq.{slug}",
        data=body,
        method="PATCH",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=minimal",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code


def cmd_patch():
    state = load_state()
    pending = [(s, e) for s, e in state.items() if e.get("storage_url") and not e.get("db_patched")]
    print(f"[patch] pending: {len(pending)}")
    for i, (slug, entry) in enumerate(pending, 1):
        st = patch_one(slug, entry["storage_url"])
        ok = st in (200, 204)
        if ok:
            update_slug(slug, db_patched=True, db_patch_status=st)
            print(f"  [{i:3d}/{len(pending)}] OK  http={st} {slug[:50]}")
        else:
            errors = entry.get("errors", [])
            errors.append(f"patch: http={st}")
            update_slug(slug, errors=errors, db_patch_status=st)
            print(f"  [{i:3d}/{len(pending)}] ERR http={st} {slug[:50]}")


# ──────────────────────────────────────────────────────────────────
def cmd_summary():
    summary()


def main():
    if len(sys.argv) < 2:
        cmd_summary()
        return
    cmd = sys.argv[1]
    if cmd == "download":
        cmd_download()
    elif cmd == "upload":
        cmd_upload()
    elif cmd == "patch":
        cmd_patch()
    elif cmd == "all":
        cmd_download(); cmd_upload(); cmd_patch()
    elif cmd == "summary":
        cmd_summary()
    else:
        print(f"unknown command: {cmd}")
    print()
    cmd_summary()


if __name__ == "__main__":
    main()
