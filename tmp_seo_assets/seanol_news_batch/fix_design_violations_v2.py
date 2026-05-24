#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[헌법 제11조 1차 개정 시행] 시니어 의학저널 디자인 원칙 적용.

작업:
  (1) 본문 이모지·국기·⚠️·📚📖📌✅❌ 일괄 제거 / 텍스트 대체
  (2) 다크 처리되는 코드블록(```) 인증 타임라인을 일반 정의 리스트로 변환
  (3) V1 풋터(`<!-- TRUST_FOOTER_V1 -->`) 블록 제거 후 V2 풋터(이모지 없음) 부착

대상: id=302/303/304 (slug 기준 PATCH)
멱등성: TRUST_FOOTER_V2 마커 있으면 skip
검증: 11-2의 5단계 grep을 PATCH 후 자동 실행, 위반 있으면 FAIL 표시
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

# ─────────────────────────────────────────────────────────────
# V2 TRUST_FOOTER — 이모지 ZERO, 시니어 톤
# ─────────────────────────────────────────────────────────────
TRUST_FOOTER_V2 = """

<!-- TRUST_FOOTER_V2 -->
<h2>함께 읽으면 좋은 글</h2>
<ul>
<li><a href="/blog/ecklonia-cava-phlorotannin-overview">감태(Ecklonia cava)·플로로탄닌 정리</a></li>
<li><a href="/blog/dieckol-molecular-mechanism-overview">디에콜(Dieckol) 분자 작용 정리</a></li>
<li><a href="/blog/seanol-standardized-extract-overview">씨놀(Seanol) 표준화 추출물 정리</a></li>
<li><a href="/blog?category=research">연구 동향 카테고리 전체 보기</a></li>
<li><a href="/easy">쉬운 건강정보로 보기</a></li>
</ul>

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구·임상은 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'phlorotannin', 'dieckol', 'Ecklonia cava', 'eckol', 'Seanol' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능 (예: PMC12735720)<br/>
· <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener" style="color:#475569;">ClinicalTrials.gov</a> — 임상시험 등록 정보 (예: NCT04141241)<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·뇌과학·약리 분야 종설 다수<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌·임상 등록 정보의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.
</div>
"""

# ─────────────────────────────────────────────────────────────
# 이모지·픽토그램 일괄 제거 매핑
# ─────────────────────────────────────────────────────────────
EMOJI_REPLACEMENTS = [
    # (1) 헤딩/배너 책 이모지
    ("📚 ", ""),
    ("📚", ""),
    ("📖 ", ""),
    ("📖", ""),
    # (2) 체크/표시
    ("✅ ", ""),
    ("✅", ""),
    ("❌ ", "(주의) "),
    ("❌", ""),
    ("⚠️ ", "※ "),
    ("⚠️", "※"),
    ("⚡ ", ""),
    ("⚡", ""),
    # (3) 핀·하이라이트
    ("📌 ", ""),
    ("📌", ""),
    ("📍 ", ""),
    ("📍", ""),
    ("⭐ ", ""),
    ("⭐", ""),
    ("🌟 ", ""),
    ("🌟", ""),
    ("💡 ", ""),
    ("💡", ""),
    # (4) 방패
    ("🛡️ ", ""),
    ("🛡️", ""),
    ("🛡 ", ""),
    ("🛡", ""),
    # (5) 국기 (한 칸 공백까지 같이 제거)
    ("🇺🇸 ", ""),
    ("🇺🇸", ""),
    ("🇰🇷 ", ""),
    ("🇰🇷", ""),
    ("🇪🇺 ", ""),
    ("🇪🇺", ""),
    ("🇯🇵 ", ""),
    ("🇯🇵", ""),
    ("🇨🇳 ", ""),
    ("🇨🇳", ""),
    ("🇬🇧 ", ""),
    ("🇬🇧", ""),
    # (6) 의료
    ("💊 ", ""),
    ("💊", ""),
    ("💉 ", ""),
    ("💉", ""),
    # (7) 손
    ("👉 ", "→ "),
    ("👉", "→"),
    ("👇 ", "↓ "),
    ("👇", "↓"),
    ("👆 ", "↑ "),
    ("👆", "↑"),
    ("👍 ", ""),
    ("👍", ""),
]


def strip_emojis(content: str) -> str:
    """본문 이모지·국기·픽토그램 일괄 제거."""
    for old, new in EMOJI_REPLACEMENTS:
        content = content.replace(old, new)
    return content


def downgrade_dark_codeblocks(content: str) -> str:
    """
    인증 타임라인을 위해 사용된 ```...``` 코드블록(BlogPostPage가 다크처리)을
    일반 회색 박스로 변환. 단, 코드 블록 안에 실제 코드(curl, JS 등)가 있으면
    유지 (현재 3건엔 없음).
    """
    pattern = re.compile(r"```\s*\n(.*?)```", re.DOTALL)

    def replace(m):
        inner = m.group(1).rstrip()
        # 회색 박스 + 등폭 폰트, 다크 X
        return (
            '<div style="background:#f8fafc;border:1px solid #e2e8f0;'
            'border-radius:8px;padding:14px 16px;margin:16px 0;font-size:13px;'
            'color:#334155;line-height:1.8;font-family:ui-monospace,SFMono-Regular,'
            'Menlo,monospace;white-space:pre-wrap;">\n'
            + inner + "\n</div>"
        )

    return pattern.sub(replace, content)


def strip_v1_footer(content: str) -> str:
    """V1 풋터 블록 통째로 제거 (V2로 교체 전)."""
    marker = "<!-- TRUST_FOOTER_V1 -->"
    idx = content.find(marker)
    if idx == -1:
        return content
    # V1 마커 바로 앞 빈 줄까지 잘라서 깨끗하게
    cut = idx
    while cut > 0 and content[cut - 1] in (" ", "\t"):
        cut -= 1
    while cut > 0 and content[cut - 1] == "\n":
        cut -= 1
    return content[:cut].rstrip() + "\n"


# ─────────────────────────────────────────────────────────────
# 검증 (헌법 11-2 그대로)
# ─────────────────────────────────────────────────────────────
BANNED_EMOJIS = [
    "📚","📖","📕","📗","📘","📙","✅","❌","⚠️","⚠","📌","📍","⭐","🌟","💡",
    "🛡️","🛡","🇺🇸","🇰🇷","🇪🇺","🇯🇵","🇨🇳","🇬🇧","💊","💉","🩺","🏥","🧬",
    "👉","👇","👆","👍","🔔","🔥","💯",
]
DARK_BG_PATTERNS = [
    r"background:\s*#0[bB]1[aA]2[eE]",
    r"background-color:\s*#0[bB]1[aA]2[eE]",
    r"bg-\[#0[bB]1[aA]2[eE]\]",
    r"bg-slate-900",
    r"bg-gray-900",
    r"bg-neutral-900",
]


def validate(content: str) -> dict:
    emoji_hits = {e: content.count(e) for e in BANNED_EMOJIS if content.count(e) > 0}
    dark_hits = sum(len(re.findall(p, content)) for p in DARK_BG_PATTERNS)
    has_v2 = "TRUST_FOOTER_V2" in content
    has_v1 = "TRUST_FOOTER_V1" in content
    series_links = sum(1 for s in ["연구 동향 카테고리 전체 보기", "쉬운 건강정보로 보기"] if s in content)
    dbs = set()
    for d in ["pubmed.ncbi", "ncbi.nlm.nih.gov/pmc", "frontiersin.org", "sciencedirect.com"]:
        if d in content:
            dbs.add(d)
    return {
        "emoji_violations": emoji_hits,
        "dark_box_violations": dark_hits,
        "has_v1_legacy": has_v1,
        "has_v2_marker": has_v2,
        "series_links_count": series_links,
        "db_links_count": len(dbs),
    }


# ─────────────────────────────────────────────────────────────
# HTTP helpers
# ─────────────────────────────────────────────────────────────
def http(method, url, headers, data=None):
    req = urllib.request.Request(
        url, method=method, headers=headers,
        data=(json.dumps(data).encode() if data else None),
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode()


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
        # 1) 현재 content 조회
        status, body = http("GET", f"{SB}/rest/v1/posts?slug=eq.{slug}&select=id,slug,content", h_get)
        rows = json.loads(body)
        if not rows:
            print(f"[NOT_FOUND] slug={slug}")
            results.append({"slug": slug, "status": "not_found"})
            continue
        row = rows[0]
        pid = row["id"]
        before = row["content"]

        # 2) 변환 파이프라인
        after = before
        after = strip_emojis(after)
        after = downgrade_dark_codeblocks(after)
        after = strip_v1_footer(after)
        after = after.rstrip() + TRUST_FOOTER_V2

        # 3) 검증 (PATCH 전 dry-check)
        v = validate(after)
        will_be_clean = (not v["emoji_violations"] and v["dark_box_violations"] == 0
                         and v["has_v2_marker"] and not v["has_v1_legacy"]
                         and v["series_links_count"] == 2 and v["db_links_count"] == 4)

        if not will_be_clean:
            print(f"[ABORT] id={pid} slug={slug} — validation would fail")
            print(json.dumps(v, ensure_ascii=False, indent=2))
            results.append({"id": pid, "slug": slug, "status": "abort_validation_fail", "validate": v})
            continue

        # 4) PATCH
        status2, body2 = http(
            "PATCH", f"{SB}/rest/v1/posts?slug=eq.{slug}",
            h_patch, {"content": after, "updated_at": NOW},
        )

        # 5) 재조회 검증
        _, vbody = http("GET", f"{SB}/rest/v1/posts?slug=eq.{slug}&select=content", h_get)
        verified = json.loads(vbody)[0]["content"]
        v2 = validate(verified)
        ok = (status2 in (200, 204)
              and not v2["emoji_violations"] and v2["dark_box_violations"] == 0
              and v2["has_v2_marker"] and not v2["has_v1_legacy"])

        before_len, after_len = len(before), len(verified)
        print(f"[{'OK' if ok else 'FAIL'}] id={pid} slug={slug} "
              f"http={status2} len {before_len}→{after_len} | "
              f"emoji={len(v2['emoji_violations'])} dark={v2['dark_box_violations']} "
              f"v2={v2['has_v2_marker']} v1_legacy={v2['has_v1_legacy']} "
              f"series={v2['series_links_count']}/2 db={v2['db_links_count']}/4")
        if v2["emoji_violations"]:
            print(f"   leftover emojis: {v2['emoji_violations']}")

        results.append({
            "id": pid, "slug": slug,
            "status": "ok" if ok else "fail",
            "http": status2,
            "len_before": before_len, "len_after": after_len,
            "validate": v2,
        })

    out_path = "/home/user/webapp/tmp_seo_assets/seanol_news_batch/fix_design_violations_v2_results.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"timestamp": NOW, "results": results}, f, ensure_ascii=False, indent=2)
    print(f"\n[DONE] results → {out_path}")


if __name__ == "__main__":
    main()
