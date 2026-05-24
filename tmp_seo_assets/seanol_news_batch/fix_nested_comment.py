#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[헌법 제11조 2차 핫픽스] nested HTML comment 버그 정리.

문제: `<!-- <!-- RESEARCH_2026_V1 --> -->`
  → markdown 파서가 첫 `<!--`와 첫 `-->`를 짝지어 닫음
  → 남은 ` -->` 가 본문 텍스트로 렌더링 (사용자 스크린샷 상단의 `-->`)

수정:
  - DB 본문에서 `<!-- <!-- ... --> -->` 패턴을 `<!-- ... -->` 단일 주석으로 정규화
  - 추가로 잔존 `-->` 단독 출현, 빈 줄 정리
  - 검증 grep 강화 (헌법 11-2에 추가)
"""
import json
import re
import urllib.request
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"
NOW = datetime.now(timezone.utc).isoformat()

SLUGS = [
    "seanol-global-certifications-fda-ndi-eu-nfi-mfds-2026-update",
    "hydrated-seanol-ultra-freshness-technology-explained",
    "seanol-drug-pipeline-ph100-ph733-ph300-2026",
]

# nested comment 정규화: <!-- <!-- X --> --> → <!-- X -->
NESTED_RE = re.compile(r"<!--\s*<!--\s*([^>]+?)\s*-->\s*-->")
# 줄 단독 떠도는 `-->` 제거 (안전: HTML 주석 닫는 정상 -->는 같은 라인에 텍스트 있어야 함)
LONE_ARROW_RE = re.compile(r"^\s*-->\s*$", re.MULTILINE)


def http(method, url, headers, data=None):
    req = urllib.request.Request(
        url, method=method, headers=headers,
        data=(json.dumps(data).encode() if data else None),
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode()


def fix_content(c: str) -> str:
    before_nested = len(NESTED_RE.findall(c))
    c = NESTED_RE.sub(r"<!-- \1 -->", c)
    # 정규화 후 잔존 `<!-- ` ... ` -->` 가 한 줄에 있는지 확인하고, 한 줄 단독 `-->` 가 떠다니면 제거
    c = LONE_ARROW_RE.sub("", c)
    # 연속 빈 줄 3개 이상 → 2개로
    c = re.sub(r"\n{3,}", "\n\n", c)
    return c, before_nested


def main():
    h_get = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
    h_patch = {
        "apikey": KEY, "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
        "Accept-Profile": "public", "Content-Profile": "public",
        "Prefer": "return=representation",
    }

    results = []
    for slug in SLUGS:
        status, body = http("GET", f"{SB}/rest/v1/posts?slug=eq.{slug}&select=id,slug,content", h_get)
        rows = json.loads(body)
        if not rows:
            results.append({"slug": slug, "status": "not_found"})
            continue
        row = rows[0]
        pid = row["id"]
        before = row["content"]

        after, nested_fixed = fix_content(before)

        if after == before:
            print(f"[SKIP] id={pid} slug={slug} — no nested comment")
            results.append({"id": pid, "slug": slug, "status": "no_change"})
            continue

        # PATCH
        status2, _ = http(
            "PATCH", f"{SB}/rest/v1/posts?slug=eq.{slug}",
            h_patch, {"content": after, "updated_at": NOW},
        )

        # Verify
        _, vbody = http("GET", f"{SB}/rest/v1/posts?slug=eq.{slug}&select=content", h_get)
        v = json.loads(vbody)[0]["content"]
        still_nested = len(NESTED_RE.findall(v))
        lone_arrow = len(LONE_ARROW_RE.findall(v))
        ok = status2 in (200, 204) and still_nested == 0 and lone_arrow == 0

        print(f"[{'OK' if ok else 'FAIL'}] id={pid} slug={slug} "
              f"http={status2} nested_fixed={nested_fixed} "
              f"still_nested={still_nested} lone_arrow={lone_arrow} "
              f"len {len(before)}→{len(v)}")

        results.append({
            "id": pid, "slug": slug,
            "status": "ok" if ok else "fail",
            "http": status2,
            "nested_fixed": nested_fixed,
            "still_nested": still_nested,
            "lone_arrow": lone_arrow,
        })

    out = "/home/user/webapp/tmp_seo_assets/seanol_news_batch/fix_nested_comment_results.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"timestamp": NOW, "results": results}, f, ensure_ascii=False, indent=2)
    print(f"\n[DONE] → {out}")


if __name__ == "__main__":
    main()
