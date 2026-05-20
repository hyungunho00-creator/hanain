# -*- coding: utf-8 -*-
"""
288개 글의 통일 CTA를 v1 → v2로 교체.

규칙:
- 기존 v1 마커(<!-- CTA_UNIFIED_V2026_05 -->...<!-- /CTA_UNIFIED_V2026_05 -->) 블록 제거
- 새 v2 CTA 블록 (CTA_INLINE_BLOCK) 추가
- 이미 v2 마커가 있는 글은 SKIP (idempotent)
- v1/v2 마커 모두 없는 글은 그냥 v2 추가
"""
import urllib.request, urllib.error, json, os, sys, time, re

sys.path.insert(0, os.path.dirname(__file__))
from inline_cta_template import CTA_INLINE_BLOCK, CTA_MARKER_START, CTA_OLD_MARKERS

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

HEADERS_GET = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public", "Range": "0-999"}
HEADERS_PATCH = {
    "apikey": KEY, "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json", "Accept-Profile": "public",
    "Content-Profile": "public", "Prefer": "return=minimal",
}


def strip_old_cta(content: str) -> tuple[str, bool]:
    """이전 버전 마커로 감싸인 CTA 블록을 통째로 제거. 제거되었으면 True."""
    removed = False
    for start_m, end_m in CTA_OLD_MARKERS:
        # marker로 감싸인 영역 (마커 포함) 제거 — 가장 안전하게 비탐욕 매칭
        pattern = re.compile(
            re.escape(start_m) + r".*?" + re.escape(end_m),
            re.DOTALL,
        )
        if pattern.search(content):
            content = pattern.sub("", content)
            removed = True
    return content, removed


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
    already_v2 = []
    for p in posts:
        if CTA_MARKER_START in p["content"]:
            already_v2.append(p["id"])
            continue
        # v1 CTA 제거 (있으면) + v2 CTA 추가
        stripped, removed_old = strip_old_cta(p["content"])
        new_content = stripped.rstrip() + CTA_INLINE_BLOCK
        targets.append({
            "id": p["id"], "slug": p["slug"], "new_content": new_content,
            "removed_old": removed_old,
            "delta": len(new_content) - len(p["content"]),
        })

    print(f"      이미 v2 적용됨 (SKIP): {len(already_v2)}건")
    print(f"      교체 대상: {len(targets)}건")
    removed_count = sum(1 for t in targets if t["removed_old"])
    print(f"        - v1 마커 제거 후 v2 삽입: {removed_count}건")
    print(f"        - 마커 없이 v2 신규 삽입: {len(targets) - removed_count}건")

    if not targets:
        print("\n✅ 모든 글에 이미 v2 통일 CTA 적용됨")
        return

    print(f"\n[2/2] PATCH 실행 ({len(targets)}건)...")
    ok = 0
    results = []
    for i, t in enumerate(targets, 1):
        status = patch(t["id"], t["new_content"])
        flag = "OK" if status in (200, 204) else "ERR"
        if flag == "OK":
            ok += 1
        results.append({
            "id": t["id"], "slug": t["slug"], "http": status,
            "removed_old": t["removed_old"], "delta": t["delta"], "result": flag,
        })
        if i % 25 == 0 or i == len(targets) or flag == "ERR":
            print(f"  [{i:3d}/{len(targets)}] {flag} http={status} id={t['id']:3d} Δ{t['delta']:+d} v1_removed={t['removed_old']}")
        time.sleep(0.03)

    print(f"\n=== {ok}/{len(targets)} OK ===")

    out = os.path.join(os.path.dirname(__file__), "replace_unified_cta_v2_results.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"    log: {out}")


if __name__ == "__main__":
    main()
