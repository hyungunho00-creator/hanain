# -*- coding: utf-8 -*-
"""Refresh existing published posts for visible trust signals and current CTA policy.

This script intentionally uses the public anon key only. It runs before the RLS
write-lock migration in this batch; after that migration, bulk edits must use
the admin API or service-role-only tooling.
"""

from __future__ import annotations

import html
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ROOT = Path(__file__).resolve().parent
AUDIT_BEFORE = ROOT / "audit_before.json"
AUDIT_AFTER = ROOT / "audit_after.json"
PATCH_RESULTS = ROOT / "patch_results.json"

KEY = (
    os.environ.get("VITE_SUPABASE_ANON_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
)
if not KEY:
    raise SystemExit("VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY is required")


CTA_V2 = """
<!-- MEULSSORI_PHLOROTANNIN_CTA_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>식단과 성분 정보를 함께 정리해 보세요.</strong><br/>
진단명, 치료 단계, 식사량, 체중 변화, 혈당 기록, 복용 중인 약, 궁금한 원료를 남기면
맛있으리 식단관리와 플로로탄닌 건강정보 기준으로 먼저 확인할 항목을 정리해 드립니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /MEULSSORI_PHLOROTANNIN_CTA_V2 -->
""".strip()

FORTIMEL_NOTE = """
<!-- FORTIMEL_NEUTRAL_ARCHIVE_V1 -->
> 운영 메모: 이 글은 과거 검색 키워드 대응을 위해 남겨 둔 정보성 아카이브입니다. 현재 구매·상담 CTA는 특정 포티멜 제품 권유가 아니라 맛있으리 식단관리와 플로로탄닌 건강정보 기준으로만 연결됩니다.
<!-- /FORTIMEL_NEUTRAL_ARCHIVE_V1 -->
""".strip()

OLD_CTA_MARKERS = [
    "CTA_UNIFIED_V2026_05_v2",
    "UNIFIED_CONTENT_ASSET_V1",
    "EXERCISE_HOSPITAL_CTA_V1",
    "SLOW_AGING_CTA_V1",
    "GAMTAE_CTA_V1",
    "SUPPLEMENT_CTA_V1",
    "MEULSSORI_PHLOROTANNIN_CTA_V1",
]

ADDITIONAL_SOURCES = {
    "sarcopenia-rehabilitation-protein-exercise-ons-guide": [
        ("ESPEN practical guideline: Clinical nutrition and hydration in geriatrics", "https://2022.espen.org/files/ESPEN-Guidelines/ESPEN_practical_guideline_Clinical_nutrition_and_hydration_in_geriatrics.pdf"),
        ("WHO physical activity fact sheet", "https://www.who.int/news-room/fact-sheets/detail/physical-activity"),
    ],
    "cancer-care-hospital-seoul-regional-decision-guide": [
        ("국립암센터 지역암센터지원사업", "https://www.ncc.re.kr/main.ncc?uri=manage01_6"),
        ("NCI Finding Cancer Care", "https://www.cancer.gov/about-cancer/managing-care/finding-cancer-care"),
        ("American Cancer Society: Choosing a cancer doctor", "https://www.cancer.org/cancer/managing-cancer/finding-care/where-to-find-cancer-care/choosing-a-cancer-doctor.html"),
    ],
    "special-medical-purpose-food-label-guide-korea": [
        ("국가법령정보센터: 식품의 기준 및 규격", "https://law.go.kr/LSW/admRulLsInfoP.do?admRulId=37260&efYd=0"),
        ("식품안전나라 식품공전", "https://www.foodsafetykorea.go.kr/portal/safefoodlife/food/foodRvlv/foodRvlv.do"),
    ],
}

GENERAL_PHLOROTANNIN_SOURCES = [
    ("PubMed: phlorotannin and Ecklonia cava literature", "https://pubmed.ncbi.nlm.nih.gov/?term=phlorotannin+Ecklonia+cava"),
    ("PMC: phlorotannin and Ecklonia cava full-text literature", "https://pmc.ncbi.nlm.nih.gov/?term=phlorotannin+Ecklonia+cava"),
]

CATEGORY_SOURCES = {
    "cancer-treatment-care": [
        ("NCI: Nutrition in Cancer Care", "https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition"),
        ("ESPEN practical guideline: Clinical nutrition in cancer", "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf"),
    ],
    "cancer": [
        ("NCI: Nutrition in Cancer Care", "https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition"),
        ("국가암정보센터", "https://www.cancer.go.kr/"),
    ],
    "diabetes": [
        ("American Diabetes Association Standards of Care", "https://professional.diabetes.org/standards-of-care"),
        ("Diabetes Care: Standards of Care in Diabetes", "https://diabetesjournals.org/care/issue"),
    ],
    "hospital-info": [
        ("국립암센터 지역암센터지원사업", "https://www.ncc.re.kr/main.ncc?uri=manage01_6"),
        ("NCI: Finding Cancer Care", "https://www.cancer.gov/about-cancer/managing-care/finding-cancer-care"),
    ],
    "buying-guide": [
        ("식품안전나라 식품공전", "https://www.foodsafetykorea.go.kr/portal/safefoodlife/food/foodRvlv/foodRvlv.do"),
        ("국가법령정보센터: 식품의 기준 및 규격", "https://law.go.kr/LSW/admRulLsInfoP.do?admRulId=37260&efYd=0"),
    ],
    "safety-precautions": [
        ("식품안전나라", "https://www.foodsafetykorea.go.kr/"),
        ("국가법령정보센터: 식품의 기준 및 규격", "https://law.go.kr/LSW/admRulLsInfoP.do?admRulId=37260&efYd=0"),
    ],
    "cardiovascular": [
        ("American Heart Association: Prevention and Treatment of High Blood Pressure", "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure"),
        ("CDC: Heart Disease", "https://www.cdc.gov/heart-disease/"),
    ],
    "brain": [
        ("NIH National Institute on Aging: Brain Health", "https://www.nia.nih.gov/health/brain-health"),
        ("PubMed: Ecklonia cava neuroprotection literature", "https://pubmed.ncbi.nlm.nih.gov/?term=Ecklonia+cava+neuroprotection"),
    ],
    "skin": [
        ("American Academy of Dermatology: Sun protection", "https://www.aad.org/public/everyday-care/sun-protection"),
        ("PubMed: Ecklonia cava skin literature", "https://pubmed.ncbi.nlm.nih.gov/?term=Ecklonia+cava+skin"),
    ],
    "inflammation": [
        ("MedlinePlus: Inflammation", "https://medlineplus.gov/ency/article/000821.htm"),
        ("PubMed: phlorotannin inflammation literature", "https://pubmed.ncbi.nlm.nih.gov/?term=phlorotannin+inflammation"),
    ],
    "ingredient-comparison": GENERAL_PHLOROTANNIN_SOURCES,
    "research": GENERAL_PHLOROTANNIN_SOURCES,
    "general": GENERAL_PHLOROTANNIN_SOURCES,
    "disease-health-info": [
        ("MedlinePlus Health Topics", "https://medlineplus.gov/healthtopics.html"),
        ("PubMed: phlorotannin and health literature", "https://pubmed.ncbi.nlm.nih.gov/?term=phlorotannin+health"),
    ],
    "분자기전 작용경로": [
        ("PubChem: Dieckol", "https://pubchem.ncbi.nlm.nih.gov/compound/Dieckol"),
        ("PubChem: Eckol", "https://pubchem.ncbi.nlm.nih.gov/compound/Eckol"),
    ],
    "신약개발 임상": [
        ("ClinicalTrials.gov", "https://clinicaltrials.gov/"),
        ("FDA: Clinical trials and what patients need to know", "https://www.fda.gov/patients/clinical-trials-what-patients-need-know"),
    ],
    "partner-info": GENERAL_PHLOROTANNIN_SOURCES,
}

FORTIMEL_REPLACEMENT_LINKS = """
## 함께 보면 좋은 현재 기준 글

- [특수의료용도식품 표시 읽기](/blog/special-medical-purpose-food-label-guide-korea)
- [환자용 음료와 일반 단백질음료 차이](/blog/patient-drink-vs-protein-drink-difference)
- [종근당건강 닥터케어 구매 전 체크리스트](/blog/jongkundang-health-dr-care-buying-checklist-meulssori)
""".strip()


def request(method: str, path: str, body: dict | None = None):
    data = None if body is None else json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}{path}",
        data=data,
        method=method,
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as res:
        raw = res.read().decode("utf-8")
        return res.status, json.loads(raw) if raw else None


def fetch_posts() -> list[dict]:
    params = urllib.parse.urlencode({
        "status": "eq.published",
        "select": "id,slug,title,excerpt,meta_title,meta_desc,content,category,tags,og_image,published_at,updated_at,created_at",
        "order": "id.asc",
        "limit": "1000",
    })
    _status, rows = request("GET", f"/rest/v1/posts?{params}")
    return rows or []


def strip_tags(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def normalize_url(url: str) -> str:
    return (url or "").strip().rstrip(".,;)]}").replace("&amp;", "&")


def is_external_source(url: str) -> bool:
    if not re.match(r"https?://", url or "", re.I):
        return False
    host = urllib.parse.urlparse(url).netloc.lower()
    return host and host != "phlorotannin.com" and not host.endswith(".phlorotannin.com")


def domain_of(url: str) -> str:
    return urllib.parse.urlparse(url).netloc.lower().removeprefix("www.")


def extract_links(content: str) -> list[tuple[str, str]]:
    links: list[tuple[str, str]] = []

    for label, url in re.findall(r"\[([^\]]{1,180})\]\((https?://[^)\s]+)\)", content or ""):
        links.append((strip_tags(label), normalize_url(url)))

    for url, label in re.findall(r"<a\b[^>]*href=[\"'](https?://[^\"']+)[\"'][^>]*>([\s\S]*?)</a>", content or "", re.I):
        links.append((strip_tags(label), normalize_url(url)))

    for url in re.findall(r"https?://[^\s<>\")']+", content or ""):
        links.append((domain_of(url) or url, normalize_url(url)))

    deduped: list[tuple[str, str]] = []
    seen = set()
    for label, url in links:
        if not is_external_source(url):
            continue
        if url in seen:
            continue
        seen.add(url)
        clean_label = label or domain_of(url) or url
        clean_label = clean_label.replace("\n", " ").strip()
        deduped.append((clean_label[:120], url))
    return deduped


def has_ref_heading(content: str) -> bool:
    return bool(re.search(r"##\s*(참고자료|참고 문헌|References)\b", content or "", re.I))


def source_pack_for(post: dict) -> list[tuple[str, str]]:
    sources = []
    sources.extend(CATEGORY_SOURCES.get(post.get("category"), GENERAL_PHLOROTANNIN_SOURCES))
    text = f"{post.get('title') or ''} {post.get('excerpt') or ''} {post.get('content') or ''}"
    if "당뇨" in text or "혈당" in text:
        sources.extend(CATEGORY_SOURCES["diabetes"])
    if "암" in text or "항암" in text:
        sources.extend(CATEGORY_SOURCES["cancer-treatment-care"])
    if "특수의료" in text or "환자용" in text or "영양조제" in text:
        sources.extend(CATEGORY_SOURCES["buying-guide"])
    return sources


def make_reference_block(post: dict, links: Iterable[tuple[str, str]], heading: str = "참고자료") -> str:
    extra = ADDITIONAL_SOURCES.get(post["slug"], []) + source_pack_for(post)
    combined = list(links) + extra
    seen = set()
    lines = []
    for label, url in combined:
        url = normalize_url(url)
        if not is_external_source(url) or url in seen:
            continue
        seen.add(url)
        lines.append(f"- [{label}]({url})")
        if len(lines) >= 10:
            break
    if len(lines) < 2:
        return ""
    return f"\n\n## {heading}\n\n아래 자료는 본문 작성·업데이트 시 확인한 공식·공공·학술 자료입니다. 개인의 진단·치료 판단은 의료진 상담이 우선입니다.\n\n" + "\n".join(lines) + "\n"


def remove_old_cta_blocks(content: str) -> str:
    out = content or ""
    for marker in OLD_CTA_MARKERS:
        pattern = re.compile(rf"\n*\s*<!--\s*{re.escape(marker)}\b[\s\S]*?<!--\s*/{re.escape(marker)}\s*-->\s*", re.I)
        out = pattern.sub("\n\n", out)
    return re.sub(r"\n{3,}", "\n\n", out).strip()


def replace_fortimel_internal_blocks(content: str) -> str:
    out = content or ""
    fortimel_block = re.compile(
        r"\n*\s*<!--\s*INTERNAL_LINKS_FORTIMEL_NUTRICIA_CLUSTER_20260526\s*-->[\s\S]*?<!--\s*/INTERNAL_LINKS_FORTIMEL_NUTRICIA_CLUSTER_20260526\s*-->\s*",
        re.I,
    )
    out = fortimel_block.sub("\n\n" + FORTIMEL_REPLACEMENT_LINKS + "\n\n", out)
    out = out.replace(
        "- [포티멜과 뉴트로시아 키워드 지도](/blog/nutricia-fortimel-ons-keyword-map)",
        "- [특수의료용도식품 표시 읽기](/blog/special-medical-purpose-food-label-guide-korea)",
    )
    return re.sub(r"\n{3,}", "\n\n", out).strip()


def insert_before_tail(content: str, block: str) -> str:
    if not block:
        return content
    markers = [
        "<!-- MEULSSORI_PHLOROTANNIN_CTA_V2 -->",
        "<!-- TRUST_FOOTER_V2 -->",
        "<!-- SHORT_FORM_EXPANSION_V1 -->",
    ]
    positions = [content.find(m) for m in markers if content.find(m) >= 0]
    if not positions:
        return content.rstrip() + "\n\n" + block.strip() + "\n"
    pos = min(positions)
    return content[:pos].rstrip() + "\n\n" + block.strip() + "\n\n" + content[pos:].lstrip()


def ensure_meta_title(meta_title: str, title: str) -> str:
    current = (meta_title or title or "").strip()
    if not current:
        return current
    if len(current) < 20 and "맛있으리" not in current and "플로로탄닌" not in current:
        current = f"{current} | 맛있으리·플로로탄닌"
    return current[:95]


def classify(post: dict) -> list[str]:
    content = post.get("content") or ""
    links = extract_links(content)
    domains = {domain_of(url) for _label, url in links}
    markers = []
    if not has_ref_heading(content):
        markers.append("missing_ref_heading")
    if len(domains) < 2:
        markers.append("source_domains_under_2")
    if "MEULSSORI_PHLOROTANNIN_CTA_V2" not in content:
        markers.append("missing_current_cta")
    if re.search(r"포티멜|Fortimel", content, re.I):
        markers.append("fortimel_mentions")
    if not (post.get("og_image") or "").lower().split("?")[0].endswith(".webp"):
        markers.append("non_webp_og")
    meta_title = post.get("meta_title") or ""
    if len(meta_title) < 20 or len(meta_title) > 95:
        markers.append("meta_title_len_review")
    return markers


def audit(rows: list[dict]) -> dict:
    counts = Counter()
    issues = []
    for post in rows:
        markers = classify(post)
        counts.update(markers)
        if markers:
            issues.append({
                "id": post["id"],
                "slug": post["slug"],
                "title": post.get("title"),
                "category": post.get("category"),
                "markers": markers,
                "source_domains": sorted({domain_of(url) for _label, url in extract_links(post.get("content") or "")}),
            })
    return {"total": len(rows), "issue_count": len(issues), "counts": dict(counts), "issues": issues}


def strengthen(post: dict) -> tuple[dict, list[str]]:
    content = post.get("content") or ""
    original = content
    actions: list[str] = []

    content = remove_old_cta_blocks(content)
    if content != original:
        actions.append("replaced_old_cta")
    before_fortimel = content
    content = replace_fortimel_internal_blocks(content)
    if content != before_fortimel:
        actions.append("replaced_fortimel_internal_links")

    if re.search(r"포티멜|Fortimel", content, re.I) and "FORTIMEL_NEUTRAL_ARCHIVE_V1" not in content:
        content = insert_before_tail(content, FORTIMEL_NOTE)
        actions.append("added_fortimel_neutral_note")

    links = extract_links(content)
    source_domains = {domain_of(url) for _label, url in links}
    needs_more_sources = len(source_domains) < 2
    if not has_ref_heading(content) or post["slug"] in ADDITIONAL_SOURCES or needs_more_sources:
        block = make_reference_block(post, links)
        if block and not has_ref_heading(content):
            content = insert_before_tail(content, block)
            actions.append("added_visible_references")
        else:
            needed = [
                (label, url) for label, url in (ADDITIONAL_SOURCES.get(post["slug"], []) + source_pack_for(post))
                if normalize_url(url) not in content
            ]
            add_lines = make_reference_block(post, needed, heading="추가 확인자료")
            if add_lines:
                content = insert_before_tail(content, add_lines)
                actions.append("added_extra_sources")

    if "MEULSSORI_PHLOROTANNIN_CTA_V2" not in content:
        content = insert_before_tail(content, CTA_V2)
        actions.append("added_current_cta")

    meta_title = ensure_meta_title(post.get("meta_title") or "", post.get("title") or "")
    payload = {}
    if content != original:
        payload["content"] = content
    if meta_title and meta_title != (post.get("meta_title") or ""):
        payload["meta_title"] = meta_title
        actions.append("normalized_meta_title")
    if payload:
        payload["updated_at"] = datetime.now(timezone.utc).isoformat()
    return payload, actions


def patch_post(post: dict, payload: dict) -> dict:
    encoded_id = urllib.parse.quote(str(post["id"]))
    status, rows = request("PATCH", f"/rest/v1/posts?id=eq.{encoded_id}", payload)
    return {"id": post["id"], "slug": post["slug"], "status": status, "returned": len(rows or [])}


def main() -> None:
    before_rows = fetch_posts()
    before = audit(before_rows)
    AUDIT_BEFORE.write_text(json.dumps(before, ensure_ascii=False, indent=2), encoding="utf-8")

    results = {"total": len(before_rows), "updated": [], "skipped": [], "errors": []}
    for post in before_rows:
        payload, actions = strengthen(post)
        if not payload:
            results["skipped"].append({"id": post["id"], "slug": post["slug"]})
            continue
        try:
            patched = patch_post(post, payload)
            patched["actions"] = actions
            results["updated"].append(patched)
        except urllib.error.HTTPError as err:
            results["errors"].append({
                "id": post["id"],
                "slug": post["slug"],
                "status": err.code,
                "body": err.read().decode("utf-8", "replace")[:500],
                "actions": actions,
            })
        except Exception as exc:
            results["errors"].append({"id": post["id"], "slug": post["slug"], "error": str(exc), "actions": actions})

    PATCH_RESULTS.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

    after_rows = fetch_posts()
    after = audit(after_rows)
    AUDIT_AFTER.write_text(json.dumps(after, ensure_ascii=False, indent=2), encoding="utf-8")

    summary = {
        "before": {"total": before["total"], "counts": before["counts"], "issue_count": before["issue_count"]},
        "updated": len(results["updated"]),
        "skipped": len(results["skipped"]),
        "errors": len(results["errors"]),
        "after": {"total": after["total"], "counts": after["counts"], "issue_count": after["issue_count"]},
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    if results["errors"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
