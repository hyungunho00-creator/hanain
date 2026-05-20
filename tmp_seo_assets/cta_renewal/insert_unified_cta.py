# -*- coding: utf-8 -*-
"""
288개 기존 글 본문(content) 끝에 통일 CTA HTML 박스 일괄 삽입.

규칙:
- 이미 CTA_UNIFIED_V2026_05 마커가 있는 글은 SKIP (재삽입 방지, idempotent)
- 본문 마지막 공백·줄바꿈 정리 후 CTA_INLINE_BLOCK 추가
- placeholder {{PARTNER_PHONE}}, {{POST_TITLE}}는 BlogPostPage.jsx 런타임에서 치환
"""
import urllib.request, urllib.error, json, os, sys, time

sys.path.insert(0, os.path.dirname(__file__))
from inline_cta_template import CTA_INLINE_BLOCK, CTA_MARKER_START

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

HEADERS_GET = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public", "Range": "0-999"}
HEADERS_PATCH = {
    "apikey": KEY, "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json", "Accept-Profile": "public",
    "Content-Profile": "public", "Prefer": "return=minimal",
}


def patch(post_id, new_content):
    body = json.dumps({"content": new_content}).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{post_id}", data=body, method="PATCH", headers=HEADERS_PATCH,
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code


def main():
    print("[1/2] DB fetch...")
    req = urllib.request.Request(f"{SB}/rest/v1/posts?select=id,slug,content&order=id", headers=HEADERS_GET)
    posts = json.loads(urllib.request.urlopen(req, timeout=30).read())
    print(f"      {len(posts)} posts")

    targets = []
    already = []
    for p in posts:
        if CTA_MARKER_START in p["content"]:
            already.append(p["id"])
            continue
        # 본문 끝의 공백·줄바꿈 정리 후 CTA 추가
        tail_trimmed = p["content"].rstrip()
        new_content = tail_trimmed + CTA_INLINE_BLOCK
        targets.append({"id": p["id"], "slug": p["slug"], "new_content": new_content,
                        "delta": len(new_content) - len(p["content"])})

    print(f"      이미 통일 CTA 있음 (SKIP): {len(already)}건")
    print(f"      삽입 대상: {len(targets)}건")
    if already and len(already) <= 30:
        print(f"      already ids: {already}")

    if not targets:
        print("\n✅ 모든 글에 이미 통일 CTA 적용됨")
        return

    print(f"\n[2/2] PATCH 실행 ({len(targets)}건)...")
    ok = 0
    results = []
    for i, t in enumerate(targets, 1):
        status = patch(t["id"], t["new_content"])
        flag = "OK" if status in (200, 204) else "ERR"
        if flag == "OK":
            ok += 1
        results.append({"id": t["id"], "slug": t["slug"], "http": status, "delta": t["delta"], "result": flag})
        if i % 25 == 0 or i == len(targets) or flag == "ERR":
            print(f"  [{i:3d}/{len(targets)}] {flag} http={status} id={t['id']:3d} Δ+{t['delta']}")
        time.sleep(0.03)

    print(f"\n=== {ok}/{len(targets)} OK ===")

    out = os.path.join(os.path.dirname(__file__), "insert_unified_cta_results.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"    log: {out}")


if __name__ == "__main__":
    main()
