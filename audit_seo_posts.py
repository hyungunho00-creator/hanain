#!/usr/bin/env python3
"""
새로 추가한 8개 글(id 105~112)의 7개 기준 점검.
1. 제목에 검색 키워드가 충분히 포함
2. 첫 300자 안에 핵심 주제·SEO 키워드 자연스럽게
3. 플로로탄닌/감태추출물/해양 폴리페놀 중 1~2개 자연스럽게 연결
4. 글 중간에 관련 카테고리로 내부링크
5. 글 하단에 관련 글 3개 추천 구조
6. 병원·질환 글은 정보 제공형 문장
7. 파트너 정보 글은 전자명함·개인 링크·정보페이지·상담 연결·플랫폼 확장성 키워드
"""
import json, urllib.request, re

SB_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

req = urllib.request.Request(
    f"{SB_URL}/rest/v1/posts?id=gte.105&id=lte.112&select=id,slug,title,category,content&order=id.asc",
    headers={"apikey": SB_KEY, "Authorization": f"Bearer {SB_KEY}", "Accept-Profile": "public"},
)
posts = json.loads(urllib.request.urlopen(req).read())

CORE = ["플로로탄닌", "감태추출물", "해양 폴리페놀"]

# 단정형/효능 단정 표현 (병원·질환 글)
FORBIDDEN = ["치료한다", "낫는다", "완치", "예방됩니다", "특효", "효능이 있습니다"]

# 파트너 글 필수 키워드
PARTNER_KW = ["전자명함", "개인 링크", "정보페이지", "상담", "플랫폼"]

for p in posts:
    pid, slug, title, cat, content = p["id"], p["slug"], p["title"], p["category"], p["content"]
    print(f"\n{'='*70}\n[{pid}] {cat} — {slug}")
    print(f"제목: {title}")

    # 1. 제목 키워드
    has_core_in_title = any(k in title for k in CORE)
    print(f"  1. 제목에 핵심 키워드: {'O' if has_core_in_title else 'X'}")

    # 2. 첫 300자
    first300 = content[:300]
    core_in_300 = [k for k in CORE if k in first300]
    # 카테고리 한국어
    cat_kw_map = {
        "ingredient-comparison": ["성분", "비교"],
        "disease-health-info":   ["건강정보", "검색"],
        "hospital-info":         ["병원", "정보"],
        "partner-info":          ["파트너", "정보페이지"],
    }
    cat_kw = cat_kw_map[cat]
    cat_in_300 = [k for k in cat_kw if k in first300]
    print(f"  2. 첫 300자 — 핵심키워드: {core_in_300} / 카테고리키워드: {cat_in_300}")

    # 3. 본문 전체 핵심 키워드 빈도
    counts = {k: content.count(k) for k in CORE}
    print(f"  3. 본문 핵심키워드 빈도: {counts}")

    # 4. 카테고리 내부링크 (다른 카테고리로 이동)
    internal_links = re.findall(r'/blog\?category=([a-z\-]+)', content)
    internal_links = [c for c in set(internal_links) if c != cat]
    print(f"  4. 다른 카테고리 내부링크: {internal_links if internal_links else 'X'}")

    # 5. 하단 관련 글 3개 — 단순히 '더 자세히 보기' 섹션 링크 수
    # 마지막 500자 안에 링크 개수
    tail = content[-800:]
    tail_links = re.findall(r'\[([^\]]+)\]\(([^\)]+)\)', tail)
    print(f"  5. 하단 800자 내 링크 개수: {len(tail_links)} -> {[l[1] for l in tail_links]}")

    # 6. 병원·질환 단정형 표현
    if cat in ("hospital-info", "disease-health-info"):
        found_forbidden = [w for w in FORBIDDEN if w in content]
        print(f"  6. 단정형 표현(있으면 NG): {found_forbidden if found_forbidden else '없음 OK'}")

    # 7. 파트너 글 키워드
    if cat == "partner-info":
        missing = [k for k in PARTNER_KW if k not in content]
        print(f"  7. 파트너 키워드 누락: {missing if missing else '모두 포함 OK'}")
