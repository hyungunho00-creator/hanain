# -*- coding: utf-8 -*-
"""
SEO Post Builder — L1-L4 Layer 차등 사양을 코드로 보장하는 본문 생성기.

입력 dict 스키마 (각 토픽마다 하나):
{
  "slug": str,
  "layer": "L1" | "L2" | "L3" | "L4",
  "category": "disease-health-info" | "ingredient-comparison",
  "title_full": str,            # 사람이 읽는 본문 제목 (h1)
  "meta_title_core": str,       # 메타 타이틀 핵심 (자동 패딩됨)
  "primary_keywords": [str,...] # 본문 첫 300자에 들어갈 핵심 키워드 (L1: 4-6개, L4: 3-5개)
  "tags": [str, ...]            # 5-8개
  "intro": str,                 # 첫 단락 (≥150자 권장, primary_keywords 자연 노출)
  "sections": [
    {"h": "헤더 텍스트", "body": "마크다운 본문"}
  ]  # 5개 권장
  "faq": [{"q": "...", "a": "..."}, ...]  # 3개
  "refs": [str, ...]            # 참고 URL/라벨 마크다운, 3-4개
  "same_cat_links": [{"label": "...", "slug": "..."}, ...]  # 같은 카테고리 3+
  "prev_batch_link": {"label": "...", "slug": "..."}  # 이전 배치 1개
  "ingredient_links": [{"label": "...", "slug": "..."}, ...]  # ingredient-comparison 1-2개
  "easy_label": str (default "쉬운 건강정보로 보기")
}

출력: posts_data.py 와 호환되는 dict (slug, title, category, tags, meta_title,
       meta_desc, excerpt, content)
"""
from typing import List, Dict


# Layer 차등 사양 상수
META_TITLE_MIN, META_TITLE_MAX = 45, 60
META_DESC_MIN, META_DESC_MAX = 110, 130
EXCERPT_MIN, EXCERPT_MAX = 80, 200
FORBIDDEN = ["치료", "완치", "특효", "만병통치"]


def _cat_link_label(category: str) -> str:
    return {
        "disease-health-info": "질환·건강정보 카테고리 전체 보기",
        "ingredient-comparison": "성분 비교 카테고리 전체 보기",
    }.get(category, "카테고리 전체 보기")


def _layer_meta_suffix(layer: str) -> str:
    """meta_title 좌측에 붙일 Layer 표시 (45자 채우기 도움)"""
    return {
        "L1": "[건강검진 정보 가이드]",
        "L2": "[기전 정리 정보 가이드]",
        "L3": "[결정 정보 가이드 정리]",
        "L4": "[성분 정보 정리 가이드]",
    }.get(layer, "[정보 가이드]")


def _pad_meta_title(core: str, layer: str) -> str:
    """meta_title을 45-60 사이로 맞춤."""
    prefix = _layer_meta_suffix(layer)
    candidates = [
        f"{prefix} {core}",
        f"{prefix} {core} 정리",
        f"{prefix} {core} 정리 가이드",
        f"{prefix} {core} 정직 정리 가이드",
        f"{prefix} {core} — 정직 정리 가이드",
    ]
    for c in candidates:
        if META_TITLE_MIN <= len(c) <= META_TITLE_MAX:
            return c
    # 못 맞추면 길이 조정
    base = f"{prefix} {core}"
    if len(base) < META_TITLE_MIN:
        return (base + " 정직 정리 가이드 안내")[:META_TITLE_MAX]
    return base[:META_TITLE_MAX]


def _pad_meta_desc(core_desc: str, ref_tag: str) -> str:
    """meta_desc를 110-130 사이로 맞춤. core_desc 끝에 보조구를 점층 추가."""
    if len(core_desc) > META_DESC_MAX:
        return core_desc[:META_DESC_MAX - 1] + "."
    # ref_tag 예: "대한당뇨병학회 진료지침 기준" / "서울대병원 의학정보 기준" / "PubMed 리뷰 자료 기준" / "식약처 등록 정보 기준"
    if core_desc.endswith("."):
        base = core_desc[:-1]
        suffixes = [
            f", {ref_tag}으로 차분히 정리합니다.",
            f", {ref_tag}으로 정보 관점에서 차분히 정리합니다.",
            f", {ref_tag}으로 정보 관점에서 차분히 안내합니다.",
        ]
    else:
        base = core_desc
        suffixes = [
            f". {ref_tag}으로 차분히 정리합니다.",
            f" — {ref_tag}으로 정보 관점에서 차분히 정리합니다.",
        ]
    for sfx in suffixes:
        c = base + sfx
        if META_DESC_MIN <= len(c) <= META_DESC_MAX:
            return c
    # fallback
    c = base + suffixes[0]
    if len(c) < META_DESC_MIN:
        c = c[:-1] + " 정보 관점에서 차분히 안내합니다."
    return c[:META_DESC_MAX]


def _pad_excerpt(core: str) -> str:
    if EXCERPT_MIN <= len(core) <= EXCERPT_MAX:
        return core
    if len(core) < EXCERPT_MIN:
        # 보조구 점층 추가 (period/한글 종결 정리)
        if core.endswith("."):
            base = core[:-1]
        elif core.endswith("다"):
            base = core
        else:
            base = core
        # 여러 후보 시도
        suffixes = [
            " 정보 관점에서 차분히 안내합니다.",
            " 정보 관점에서 단계별로 차분히 안내드립니다.",
            " 정보 관점에서 점검 포인트와 함께 차분히 안내드립니다.",
            " 정보 관점에서 점검 포인트와 다음 단계까지 차분히 안내드립니다.",
            " 정보 관점에서 점검 포인트, 다음 단계, 진료 시점까지 차분히 안내드립니다.",
        ]
        for sfx in suffixes:
            c = base + sfx
            if EXCERPT_MIN <= len(c) <= EXCERPT_MAX:
                return c
        # fallback: 짧으면 가장 긴 suffix, 길면 잘라냄
        c = base + suffixes[-1]
        if len(c) > EXCERPT_MAX:
            c = c[:EXCERPT_MAX - 1] + "."
        return c
    return core[:EXCERPT_MAX - 1] + "."


def _ref_tag_for_layer(layer: str) -> str:
    return {
        "L1": "공식 학회·대학병원 자료",
        "L2": "PubMed 리뷰 자료",
        "L3": "식약처 등록 정보",
        "L4": "식약처·PubMed 자료",
    }.get(layer, "공식 자료")


def build_post(spec: Dict) -> Dict:
    """spec → posts_data 호환 dict"""
    slug = spec["slug"]
    layer = spec["layer"]
    category = spec["category"]
    title_full = spec["title_full"]
    meta_core = spec["meta_title_core"]
    primary_keywords = spec["primary_keywords"]
    tags = spec["tags"]
    intro = spec["intro"]
    sections = spec["sections"]
    faq = spec["faq"]
    refs = spec["refs"]
    same_cat_links = spec["same_cat_links"]
    prev_batch_link = spec["prev_batch_link"]
    ingredient_links = spec.get("ingredient_links", [])
    easy_label = spec.get("easy_label", "쉬운 건강정보로 보기")

    # 본문 조립
    parts = [intro.rstrip()]

    for i, sec in enumerate(sections, 1):
        parts.append(f"\n## {i}. {sec['h']}\n")
        parts.append(sec["body"].rstrip())

    # FAQ
    parts.append("\n## 자주 묻는 질문\n")
    for i, qa in enumerate(faq, 1):
        parts.append(f"**Q{i}. {qa['q']}**")
        parts.append(f"A. {qa['a']}\n")

    # 참고 자료
    parts.append("\n## 참고 자료\n")
    for r in refs:
        parts.append(f"- {r}")

    # 관련 글
    parts.append("\n## 함께 읽으면 좋은 글\n")
    for link in same_cat_links:
        parts.append(f"- [{link['label']}](/blog/{link['slug']})")
    parts.append(f"- [{prev_batch_link['label']}](/blog/{prev_batch_link['slug']})")
    for link in ingredient_links:
        parts.append(f"- [{link['label']}](/blog/{link['slug']})")
    parts.append(f"- [{easy_label}](/easy)")
    parts.append(f"- [{_cat_link_label(category)}](/blog?category={category})")

    content = "\n".join(parts) + "\n"

    # 메타 자동 패딩
    meta_title = _pad_meta_title(meta_core, layer)
    ref_tag = _ref_tag_for_layer(layer)

    meta_desc_core = spec.get("meta_desc_core", f"{title_full[:60]} 핵심을 차분히 정리.")
    meta_desc = _pad_meta_desc(meta_desc_core, ref_tag)

    excerpt_core = spec.get("excerpt_core", meta_desc_core)
    excerpt = _pad_excerpt(excerpt_core)

    post = {
        "slug": slug,
        "title": title_full,
        "category": category,
        "tags": tags,
        "meta_title": meta_title,
        "meta_desc": meta_desc,
        "excerpt": excerpt,
        "content": content,
    }
    return post


def validate_post(post: Dict, layer: str, primary_keywords: List[str], prev_batch_slugs: List[str]) -> List[str]:
    """Layer-aware 검증. 오류 메시지 리스트 반환 (빈 리스트면 PASS)."""
    import re
    errors = []
    slug = post["slug"]

    mt_len = len(post["meta_title"])
    if not (META_TITLE_MIN <= mt_len <= META_TITLE_MAX):
        errors.append(f"meta_title len={mt_len}")
    md_len = len(post["meta_desc"])
    if not (META_DESC_MIN <= md_len <= META_DESC_MAX):
        errors.append(f"meta_desc len={md_len}")
    ex_len = len(post["excerpt"])
    if not (EXCERPT_MIN <= ex_len <= EXCERPT_MAX):
        errors.append(f"excerpt len={ex_len}")

    body = post["content"]
    for w in FORBIDDEN:
        if w in body:
            errors.append(f"forbidden in body: {w!r}")
        if w in post["meta_title"] + post["meta_desc"] + post["excerpt"]:
            errors.append(f"forbidden in meta/excerpt: {w!r}")

    if "## 자주 묻는 질문" not in body:
        errors.append("no FAQ section")
    if "## 참고 자료" not in body:
        errors.append("no refs section")
    if "## 함께 읽으면 좋은 글" not in body:
        errors.append("no related section")
    if "/easy" not in body:
        errors.append("no /easy link")
    if "/blog?category=" not in body:
        errors.append("no /blog?category link")

    blog_links = [s for s in re.findall(r"/blog/([a-z0-9-]+)", body) if s != slug]
    if len(set(blog_links)) < 3:
        errors.append(f"unique /blog links={len(set(blog_links))}")
    if not any(s in prev_batch_slugs for s in blog_links):
        errors.append("no prev-batch link")

    first300 = body[:300]
    hits = [k for k in primary_keywords if k in first300]
    if layer == "L1" and len(hits) < 2:
        errors.append(f"L1 first-300 keyword hits={hits}")
    elif layer == "L4" and len(hits) < 2:
        errors.append(f"L4 first-300 keyword hits={hits}")
    return errors
