#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[헌법 제11조 시행] 블로그 본문 풋터 통일 표준 — 기존 발행 글 마이그레이션.

대상: id=302/303/304 (seanol 인증·하이드레이티드·신약 파이프라인 3건)
처리: 본문 끝에 TRUST_FOOTER(시리즈 링크 + 참고 문헌 데이터베이스 박스) PATCH
중복 방지: <!-- TRUST_FOOTER_V1 --> 마커로 grep, 이미 있으면 skip
"""
import json
import urllib.request
import urllib.error
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
# TRUST_FOOTER — 헌법 제11조 표준
# ─────────────────────────────────────────────────────────────
TRUST_FOOTER = """

<!-- TRUST_FOOTER_V1 -->
<h2>함께 읽으면 좋은 글</h2>
<ul>
<li><a href="/blog/ecklonia-cava-phlorotannin-overview">감태(Ecklonia cava)·플로로탄닌 정리</a></li>
<li><a href="/blog/dieckol-molecular-mechanism-overview">디에콜(Dieckol) 분자 작용 정리</a></li>
<li><a href="/blog/seanol-standardized-extract-overview">씨놀(Seanol) 표준화 추출물 정리</a></li>
<li><a href="/blog?category=research">연구 동향 카테고리 전체 보기</a></li>
<li><a href="/easy">쉬운 건강정보로 보기</a></li>
</ul>

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>📖 참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구·임상은 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'phlorotannin', 'dieckol', 'Ecklonia cava', 'eckol', 'Seanol' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능 (예: PMC12735720)<br/>
· <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener" style="color:#475569;">ClinicalTrials.gov</a> — 임상시험 등록 정보 (예: NCT04141241)<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·뇌과학·약리 분야 종설 다수<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌·임상 등록 정보의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.
</div>
"""

TRUST_MARKER = "TRUST_FOOTER_V1"


def http(method, url, headers, data=None):
    req = urllib.request.Request(url, method=method, headers=headers,
                                  data=(json.dumps(data).encode() if data else None))
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode()


def main():
    h_get = {
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Accept-Profile": "public",
    }
    h_patch = {
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
        "Accept-Profile": "public",
        "Content-Profile": "public",
        "Prefer": "return=representation",
    }

    results = []
    for slug in SLUGS:
        # 1) 현재 content 조회
        url = f"{SB}/rest/v1/posts?slug=eq.{slug}&select=id,slug,content"
        status, body = http("GET", url, h_get)
        rows = json.loads(body)
        if not rows:
            print(f"[SKIP] slug={slug} not found")
            results.append({"slug": slug, "status": "not_found"})
            continue
        row = rows[0]
        pid = row["id"]
        content = row["content"]

        # 2) 마커 grep — 이미 있으면 skip (멱등성)
        if TRUST_MARKER in content:
            print(f"[SKIP] id={pid} slug={slug} — TRUST_FOOTER already present")
            results.append({"id": pid, "slug": slug, "status": "already_present"})
            continue

        # 3) 풋터 이어붙이기
        new_content = content + TRUST_FOOTER

        # 4) PATCH
        url2 = f"{SB}/rest/v1/posts?slug=eq.{slug}"
        status2, body2 = http("PATCH", url2, h_patch, {
            "content": new_content,
            "updated_at": NOW,
        })
        ok = status2 in (200, 204)
        # 5) 검증 grep
        verify_url = f"{SB}/rest/v1/posts?slug=eq.{slug}&select=content"
        _, vbody = http("GET", verify_url, h_get)
        vrows = json.loads(vbody)
        has_marker = TRUST_MARKER in vrows[0]["content"] if vrows else False
        # 박스 4개 DB 링크 모두 있는지 체크 (헌법 11-2)
        dbs = ["pubmed.ncbi", "ncbi.nlm.nih.gov/pmc", "frontiersin.org", "sciencedirect.com"]
        dbs_count = sum(1 for d in dbs if d in vrows[0]["content"])

        print(f"[{'OK' if ok and has_marker else 'FAIL'}] id={pid} slug={slug} "
              f"http={status2} marker={has_marker} db_links={dbs_count}/4")
        results.append({
            "id": pid,
            "slug": slug,
            "status": "ok" if ok and has_marker else "fail",
            "http": status2,
            "marker_present": has_marker,
            "db_links_count": dbs_count,
        })

    # 결과 저장
    out_path = "/home/user/webapp/tmp_seo_assets/seanol_news_batch/update_trust_footer_results.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"timestamp": NOW, "results": results}, f, ensure_ascii=False, indent=2)
    print(f"\n[DONE] results → {out_path}")
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
