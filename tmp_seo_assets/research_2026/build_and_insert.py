# -*- coding: utf-8 -*-
"""2026년 플로로탄닌 분자 계열 국제 학술 논문 10편 자산화.

원칙:
  - 안전: "치료한다·완치·예방한다·효과가 있다" 단언 금지.
  - 톤: "연구 단계 / 보조 영양 가능성 / 주치의 상담 우선".
  - 멱등: 동일 slug DB upsert (INSERT or PATCH).
  - 면책: 상단 RESEARCH_BANNER + 하단 REFS_FOOTER 자동 부착.
  - 0 AI 토큰: papers_data.py의 구조화 데이터를 룰베이스로 조립.

출력:
  - 본문(content) ≥ 1500자
  - meta_title 30~60자, meta_desc 80~160자, excerpt 80~200자
  - tags 5~8개
  - status='published', category='research'
"""
import os
import json
import re
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

# papers_data.py import
sys.path.insert(0, str(Path(__file__).parent))
from papers_data import PAPERS

# ─────────────────────────────────────────────────────────────────
# Supabase config
# ─────────────────────────────────────────────────────────────────
SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SK = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")

H_READ = {"Authorization": f"Bearer {SK}", "apikey": SK, "Accept-Profile": "public"}
H_WRITE = {
    "Authorization": f"Bearer {SK}",
    "apikey": SK,
    "Content-Type": "application/json",
    "Content-Profile": "public",
    "Prefer": "return=representation",
}

MARKER = "<!-- RESEARCH_2026_V1 -->"
SAFETY_MARKER = "<!-- SAFETY_BANNER_V1_2026_05 -->"

# ─────────────────────────────────────────────────────────────────
# 표준 안전 박스 (글 상단)
# ─────────────────────────────────────────────────────────────────
RESEARCH_BANNER = f"""{SAFETY_MARKER}
<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#78350f;line-height:1.75;">
<strong>📚 본 글은 학술 논문 동향 정리입니다 — 치료 정보가 아닙니다</strong><br/>
· 본 글은 <strong>PubMed·PMC·Frontiers·Springer·MDPI·Wiley 등 2026년 국제 학술지 게재 논문</strong>을 참고한 연구 동향 정리입니다.<br/>
· 특정 제품의 효능을 단정하거나, 의약품의 치료 효과를 약속하지 않습니다.<br/>
· 플로로탄닌·디에콜·에콜·감태추출물·씨놀(Seanol)은 <strong>건강기능식품 또는 연구 단계의 천연 화합물</strong>이며, 항암제·당뇨약·항우울제 등 의약품을 대체할 수 없습니다.<br/>
· <strong>처방약 복용 중이거나 치료 중이신 경우, 반드시 담당 의료진 또는 약사와 상의</strong> 후 보조 영양제 섭취를 결정하시기 바랍니다.<br/>
· 본 글은 2026년 5월 기준 문헌을 참고하였으며 정기적으로 업데이트됩니다.
</div>
"""

REFS_FOOTER = """
<!-- RESEARCH_2026_V1_REFS -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>📖 참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'phlorotannin', 'dieckol', 'Ecklonia cava', 'eckol' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·뇌과학·약리 분야 종설 다수<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.
</div>
"""

# ─────────────────────────────────────────────────────────────────
# 본문 빌더
# ─────────────────────────────────────────────────────────────────
RELATED_RESEARCH = [
    {"label": "감태(Ecklonia cava)·플로로탄닌 정리", "slug": "ecklonia-cava-phlorotannin-overview"},
    {"label": "디에콜(Dieckol) 분자 작용 정리", "slug": "dieckol-molecular-mechanism-overview"},
    {"label": "씨놀(Seanol) 표준화 추출물 정리", "slug": "seanol-standardized-extract-overview"},
]

def _safe_slugify(s):
    return re.sub(r'[^a-z0-9-]', '', s.lower())

def build_html(paper):
    """paper dict → HTML content (with banner + footer)."""
    pkw = paper["primary_keywords"]
    title = paper["title"]

    # 본문(인트로 + 표 + 섹션 4개 + FAQ + 참고)
    intro = (
        f"<p>{paper['summary_kor']} "
        f"본 글은 <strong>{paper['country']}</strong>에서 보고된 "
        f"<strong>{paper['journal']}</strong>({paper['pub_date']}) 게재 논문을 한국어 독자가 "
        f"이해하기 쉽도록 정리한 <strong>연구 동향</strong>이며, 치료를 권유하거나 "
        f"특정 제품의 효능을 약속하는 글이 아닙니다. "
        f"플로로탄닌·디에콜 등 감태 분자 계열에 관심 있는 분들의 정보 탐색에 도움이 되도록 작성했습니다.</p>"
    )

    summary_table = f"""
<h2>📌 논문 핵심 요약 (한눈에 보기)</h2>
<table>
<tbody>
<tr><th style="width:30%;background:#f1f5f9;">논문 주제</th><td>{paper['topic_kor']}</td></tr>
<tr><th style="background:#f1f5f9;">대상 화합물</th><td><strong>{paper['compound']}</strong></td></tr>
<tr><th style="background:#f1f5f9;">국가·출처</th><td>{paper['country']} · {paper['journal']}</td></tr>
<tr><th style="background:#f1f5f9;">게재 시점</th><td>{paper['pub_date']}</td></tr>
<tr><th style="background:#f1f5f9;">연구 모델</th><td>{paper['model']}</td></tr>
<tr><th style="background:#f1f5f9;">원문 링크</th><td><a href="{paper['source_url']}" target="_blank" rel="noopener nofollow">학술 원문 보기 ↗</a></td></tr>
</tbody>
</table>
"""

    # 섹션 1: 연구 요약
    sec1 = f"""
<h2>1. 어떤 연구인가요? — 연구의 핵심 메시지</h2>
<p>{paper['summary_kor']}</p>
<p>이 연구가 다루는 주제인 <strong>{paper['topic_kor']}</strong>는 최근 해양 천연물 연구에서 활발히 보고되는 분야 중 하나입니다.
다만 본 결과는 <strong>{paper['model']}</strong>에서 도출된 것이므로, 사람에서의 임상적 의미는 별도의 임상시험을 통해 확인되어야 합니다.</p>
"""

    # 섹션 2: 분자 기전
    sec2 = f"""
<h2>2. 보고된 분자·생리학적 기전 (정직한 정리)</h2>
<p>{paper['mechanism_kor']}</p>
<p>이러한 기전은 어디까지나 <strong>실험 환경에서 관찰된 후보 작용 경로</strong>이며, 사람에게 그대로 적용된다고 단정할 수 없습니다.
플로로탄닌 분자 계열은 화학 구조의 종류가 매우 많고, 같은 갈조류에서도 추출 방식·표준화 여부에 따라 활성이 다르게 측정될 수 있습니다.</p>
"""

    # 섹션 3: 한계와 정직한 평가
    sec3 = f"""
<h2>3. 이 연구의 한계 — 단정할 수 없는 부분</h2>
<p>{paper['limits_kor']}</p>
<ul>
<li>본 결과만으로 특정 제품(건강기능식품·일반식품)의 <strong>치료 효과를 단정할 수 없습니다</strong>.</li>
<li>임상 효능 평가는 사람을 대상으로 한 <strong>무작위 배정 비교 임상시험(RCT)</strong>이 표준입니다.</li>
<li>처방약을 복용하고 있다면 <strong>상호작용 가능성</strong>을 먼저 의료진과 확인해야 합니다.</li>
<li>건강기능식품·일반식품·연구용 화합물은 각각 규제·표시 기준이 다릅니다(국가별 차이 포함).</li>
</ul>
"""

    # 섹션 4: 한국 독자가 정보를 활용하는 방법
    sec4 = f"""
<h2>4. 한국 독자가 이 정보를 활용하는 방법</h2>
<p>플로로탄닌·{pkw[0]} 등 감태 분자 계열에 관심이 있다면 다음 3가지를 함께 고려하는 것이 안전합니다.</p>
<ul>
<li><strong>(1) 본인의 건강 상태 확인</strong> — 만성질환·복용 중인 약물이 있다면 보조 영양제 추가 전 의료진 상담이 우선입니다.</li>
<li><strong>(2) 표준화 여부 확인</strong> — 시중 제품의 경우 추출 방식·플로로탄닌 함량 표시 여부, 식약처 등록 정보 등을 확인하세요.</li>
<li><strong>(3) 단정적 광고 표현 주의</strong> — 질병을 낫게 한다거나 병이 사라진다는 식의 단정적 표현을 사용하는 제품은 식품·건강기능식품의 광고 표시 기준에 위반 소지가 있을 수 있습니다.</li>
</ul>
<p>본 사이트의 <strong>건강기능식품 광고 표시 가이드</strong>도 함께 참고해 주세요.</p>
"""

    # FAQ 3개 (논문 기반 일반 정보)
    faq_section = """
<h2>자주 묻는 질문 (FAQ)</h2>
<p><strong>Q1. 이 연구를 보고 바로 보조제를 사야 하나요?</strong><br/>
A. 아닙니다. 본 글은 학술 논문의 일반 동향을 정리한 것입니다. 보조 영양제 섭취는 본인의 건강 상태·복용 약물·표준화 여부를 모두 확인한 뒤, 가능하면 의료진과 상의 후 결정하시는 것이 안전합니다.</p>

<p><strong>Q2. 플로로탄닌과 디에콜은 같은 건가요?</strong><br/>
A. 디에콜(Dieckol)은 플로로탄닌이라는 큰 분류에 속하는 <strong>여러 분자 중 하나</strong>입니다. 플로로탄닌은 갈조류(주로 감태·다시마 등)에서 발견되는 폴리페놀의 한 계열을 뜻하며, 그 안에 에콜·디에콜·플로로푸코퓨로에콜-A·6,6'-비에콜 등 다양한 분자가 있습니다.</p>

<p><strong>Q3. 처방약을 복용 중인데 함께 먹어도 되나요?</strong><br/>
A. 일반화된 답을 드리기 어렵습니다. 항응고제·당뇨약·항암제·면역억제제 등을 복용 중이시라면 반드시 <strong>담당 의료진 또는 약사</strong>와 상호작용 가능성을 먼저 확인해 주세요. 본 사이트는 일반 정보를 제공하는 것이며 개인 진료를 대체하지 않습니다.</p>
"""

    refs_section = f"""
<h2>참고 자료</h2>
<ul>
<li>학술 원문: <a href="{paper['source_url']}" target="_blank" rel="noopener nofollow">{paper['journal']} ({paper['pub_date']})</a></li>
<li>PubMed 검색 키워드: <code>{' OR '.join(pkw[:3])}</code></li>
<li>한국 식약처 건강기능식품 광고 표시 기준(식약처 공식 안내)</li>
</ul>
"""

    # 관련 글
    related = "<h2>함께 읽으면 좋은 글</h2><ul>"
    for r in RELATED_RESEARCH:
        related += f'<li><a href="/blog/{r["slug"]}">{r["label"]}</a></li>'
    related += '<li><a href="/blog?category=research">연구 동향 카테고리 전체 보기</a></li>'
    related += '<li><a href="/easy">쉬운 건강정보로 보기</a></li>'
    related += "</ul>"

    body = "\n".join([
        f"<!-- {MARKER} -->",
        RESEARCH_BANNER,
        intro,
        summary_table,
        sec1, sec2, sec3, sec4,
        faq_section,
        refs_section,
        related,
        REFS_FOOTER,
    ])
    return body


# ─────────────────────────────────────────────────────────────────
# 메타 빌더
# ─────────────────────────────────────────────────────────────────
def build_meta_title(paper):
    """meta_title 35~60자."""
    base = f"[2026 연구] {paper['topic_kor']} — {paper['compound'].split('(')[0].strip()}"
    if 30 <= len(base) <= 60:
        return base
    if len(base) > 60:
        return base[:59] + "…"
    # 패딩
    candidates = [
        base + " 정리",
        base + " 학술 정리",
        base + " 연구 동향 정리",
        base + " 학술 논문 정리",
    ]
    for c in candidates:
        if 30 <= len(c) <= 60:
            return c
    return candidates[-1][:60]


def build_meta_desc(paper):
    """meta_desc 80~160자."""
    base = (
        f"{paper['country']} {paper['journal']}({paper['pub_date']}) 게재 {paper['topic_kor']} 연구 정리. "
        f"{paper['compound'].split('(')[0].strip()} 분자 작용과 한계를 정직하게 정리했습니다."
    )
    if 80 <= len(base) <= 160:
        return base
    if len(base) > 160:
        return base[:159] + "…"
    candidates = [
        base + " 치료 정보 아님.",
        base + " 본 글은 치료 정보가 아닙니다.",
        base + " 본 글은 학술 동향 정리이며 치료 정보가 아닙니다.",
    ]
    for c in candidates:
        if 80 <= len(c) <= 160:
            return c
    return candidates[-1][:160]


def build_excerpt(paper):
    """excerpt 80~200자."""
    base = (
        f"{paper['country']} · {paper['journal']}({paper['pub_date']})에 게재된 "
        f"{paper['topic_kor']} 연구를 한국어 독자가 쉽게 이해할 수 있도록 정리했습니다. "
        f"플로로탄닌·{paper['primary_keywords'][0]} 분자 작용·한계·정직한 평가를 함께 담았습니다."
    )
    if 80 <= len(base) <= 200:
        return base
    if len(base) > 200:
        return base[:199] + "…"
    return base + " 본 글은 학술 동향 정리이며 치료 정보가 아닙니다."[:200 - len(base)]


# ─────────────────────────────────────────────────────────────────
# DB 작업
# ─────────────────────────────────────────────────────────────────
def fetch_existing(slug):
    url = f"{SB}/rest/v1/posts?slug=eq.{slug}&select=id,slug,status"
    try:
        req = urllib.request.Request(url, headers=H_READ)
        data = json.loads(urllib.request.urlopen(req, timeout=20).read())
        return data[0] if data else None
    except Exception as e:
        print(f"  ! fetch error for {slug}: {e}")
        return None


def insert_post(post):
    url = f"{SB}/rest/v1/posts"
    body = json.dumps(post).encode()
    req = urllib.request.Request(url, data=body, headers=H_WRITE, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status, resp.read()


def patch_post(pid, patch):
    url = f"{SB}/rest/v1/posts?id=eq.{pid}"
    body = json.dumps(patch).encode()
    req = urllib.request.Request(url, data=body, headers=H_WRITE, method="PATCH")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status, resp.read()


def main():
    results = []
    now_iso = datetime.utcnow().isoformat() + "Z"

    for i, paper in enumerate(PAPERS, 1):
        slug = paper["slug"]
        content = build_html(paper)
        meta_title = build_meta_title(paper)
        meta_desc = build_meta_desc(paper)
        excerpt = build_excerpt(paper)
        tags = paper["tags"][:8]

        post = {
            "slug": slug,
            "title": paper["title"],
            "category": "research",
            "tags": tags,
            "excerpt": excerpt,
            "meta_title": meta_title,
            "meta_desc": meta_desc,
            "content": content,
            "status": "published",
            "published_at": now_iso,
            "updated_at": now_iso,
        }

        existing = fetch_existing(slug)
        try:
            if existing:
                # PATCH (멱등)
                patch = {k: v for k, v in post.items() if k != "slug"}
                status, _ = patch_post(existing["id"], patch)
                action = "PATCH"
            else:
                status, _ = insert_post(post)
                action = "INSERT"
            ok = status in (200, 201, 204)
            print(f"[{i:>2}/10] {action} {slug:<60} http={status} {'OK' if ok else 'FAIL'} "
                  f"mt={len(meta_title)} md={len(meta_desc)} ex={len(excerpt)} cont={len(content)}")
            results.append({"slug": slug, "action": action, "http": status, "ok": ok,
                            "mt_len": len(meta_title), "md_len": len(meta_desc),
                            "ex_len": len(excerpt), "content_len": len(content)})
        except Exception as e:
            print(f"[{i:>2}/10] ERROR {slug}: {e}")
            results.append({"slug": slug, "error": str(e)})

    out = Path(__file__).parent / "insert_results.json"
    out.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nsaved {out}")
    ok_count = sum(1 for r in results if r.get("ok"))
    print(f"Summary: {ok_count}/10 OK")


if __name__ == "__main__":
    main()
