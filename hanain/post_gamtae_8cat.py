"""
감태추출물 키워드 카테고리별 1개씩 — 총 8개 포스팅
컨셉 (gamma 문서 기반):
  - 이름이 아닌 구조를 봐야 한다
  - 회복의 축 (아침이 가볍다, 잠이 깊다, 하루를 버티는 힘)
  - 사먹고 싶게 → 체감 변화 스토리 중심
  - 연락처 남기고 싶게 → 마지막에 자연스러운 CTA
"""

import os, sys, re, json, time, requests
from datetime import datetime, timezone

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SERVICE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"
GEMINI_API_KEY = "AIzaSyA9K81_bi84wkXM52_vdwVTR6m6y-nrqV0"
GEMINI_MODEL   = "gemini-2.5-flash"
SITE_URL       = "https://phlorotannin.com"

SB_HEADERS = {
    "apikey":          SERVICE_KEY,
    "Authorization":   f"Bearer {SERVICE_KEY}",
    "Content-Type":    "application/json",
    "Accept-Profile":  "public",
    "Content-Profile": "public",
    "Prefer":          "return=representation",
}

# ═══════════════════════════════════════════════════════════════
# 카테고리별 8개 주제 — 감태추출물 키워드 + gamma 컨셉
# ═══════════════════════════════════════════════════════════════
POSTS = [
    {
        "category": "general",
        "topic": "감태추출물이 뭔지 모르고 비싼 건강식품만 드셨나요? — 이름 말고 구조를 보셔야 합니다",
        "keywords": ["감태추출물", "플로로탄닌", "해양 폴리페놀", "감태", "Ecklonia cava", "분자구조", "회복", "건강식품"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "diabetes",
        "topic": "혈당약 먹는데도 왜 혈당이 잡히지 않을까 — 감태추출물 플로로탄닌이 혈당 관리에 다르게 접근하는 이유",
        "keywords": ["감태추출물", "혈당 관리", "플로로탄닌", "인슐린 저항성", "공복혈당", "감태", "혈당약 보완", "당뇨 회복"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "brain",
        "topic": "자고 일어나도 피곤한 분들께 — 감태추출물이 수면의 질과 뇌 회복에 미치는 영향",
        "keywords": ["감태추출물", "수면 개선", "플로로탄닌", "뇌 건강", "GABA", "만성 피로", "감태", "인지 회복"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "cardiovascular",
        "topic": "혈압약 20년째인데 혈관은 나아지고 있을까 — 감태추출물 플로로탄닌의 혈관 회복 기전",
        "keywords": ["감태추출물", "혈압 관리", "플로로탄닌", "혈관 건강", "산화질소", "동맥경화", "감태", "혈관 회복"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "inflammation",
        "topic": "온몸이 찌뿌둥하고 관절이 아픈데 염증 수치는 정상이라고요? — 감태추출물과 만성 염증의 진짜 이야기",
        "keywords": ["감태추출물", "만성 염증", "플로로탄닌", "관절 통증", "항염", "감태", "염증 회복", "CRP"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "skin",
        "topic": "비싼 콜라겐 먹어도 피부가 그대로인 이유 — 감태추출물이 피부 회복에 접근하는 다른 방식",
        "keywords": ["감태추출물", "피부 회복", "플로로탄닌", "콜라겐 합성", "항산화", "감태", "피부 탄력", "노화 역행"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "cancer",
        "topic": "항암 치료 중 몸이 너무 힘들다면 — 감태추출물 플로로탄닌이 면역 회복에 쓰이는 이유",
        "keywords": ["감태추출물", "항암 보조", "플로로탄닌", "면역 회복", "NK세포", "감태", "항산화", "치료 중 관리"],
        "cta_tel": "010-5652-8206",
    },
    {
        "category": "research",
        "topic": "감태추출물 플로로탄닌 — 해조류가 바다에서 버티며 만든 방어 성분이 사람 몸에 필요한 과학적 이유",
        "keywords": ["감태추출물", "플로로탄닌", "해양 폴리페놀", "Ecklonia cava", "임상 연구", "감태", "Dieckol", "회복 기전"],
        "cta_tel": "010-5652-8206",
    },
]

# ═══════════════════════════════════════════════════════════════
# 프롬프트 빌더 — gamma 문서 컨셉 반영
# ═══════════════════════════════════════════════════════════════
def build_prompt(post: dict) -> str:
    kw_str = ", ".join(post["keywords"])
    tel    = post["cta_tel"]
    qa_link   = f"{SITE_URL}/qa"
    blog_link = f"{SITE_URL}/blog"

    return f"""당신은 10년 넘게 건강 관리가 필요한 분들의 식단을 연구해온 전문가입니다.
감태추출물(플로로탄닌) 건강 정보 사이트({SITE_URL})를 위한 블로그 글을 JSON으로 작성하세요.

[주제] {post["topic"]}
[카테고리] {post["category"]}
[반드시 포함할 키워드] {kw_str}

[핵심 컨셉 — 반드시 이 톤을 유지하세요]
1. **"이름이 아닌 구조를 봐야 한다"** — 알부민, 콜라겐, 태반 등 이름만 화려한 성분들과 달리,
   감태추출물(플로로탄닌)은 분자구조가 다양하고 몸에서 실제로 흡수·작용하는 기전이 있음을 설명
2. **회복의 언어로 말한다** — 치유(cure)가 아니라 회복(recovery):
   "아침이 조금 가볍다", "잠이 조금 깊다", "밥 먹고 난 뒤 덜 처진다", "하루를 버티는 힘이 달라진다"
   이런 구체적인 체감 변화로 서술
3. **사먹고 싶게 만든다** — 과장 없이, 실제 관리 사례처럼 1인칭 체험담 형식 중간 삽입
   예: "처음 2주는 솔직히 모르겠다가, 3주차에 아침이 달라졌다는 분들이 많습니다"
4. **연락처를 남기고 싶게 만든다** — 마지막 섹션에서:
   "한 달만 직접 드셔보시고 싶으시다면, 아래 번호로 문의주시면 됩니다"
   → 연락처: {tel} 를 자연스럽게 삽입
   → "저는 과장된 효능을 말하지 않습니다. 구조와 기전으로 설명드리겠습니다" 톤 유지

[SEO 작성 규칙]
1. 제목: 한국어, 60자 이내, 검색 의도 명확
2. content: 마크다운, **5,000자 이상** (매우 중요!)
3. 소제목(##): 최소 8개
4. 키워드: 본문 전체 자연스럽게 분산 (각 최소 3회)
5. 내부링크 자연 삽입:
   - [플로로탄닌 건강 Q&A]({qa_link})
   - [플로로탄닌 연구 블로그]({blog_link})
6. 근거: 연구·임상 수치 포함 (신뢰도)
7. 독자: 일반인 눈높이 (전문용어 쉽게 설명)
8. 마지막 섹션: ## 핵심 요약 — 불릿 6개 이상
9. CTA 섹션(## 한 달만 직접 확인해보세요) 반드시 포함:
   - 연락처 {tel} 자연스럽게 삽입
   - "무료 상담", "부담 없이" 등 심리적 장벽 낮추는 표현

[반환 형식 — 순수 JSON만, 코드블록 없이]
{{"title":"...","slug":"...","excerpt":"150자 이내 요약","meta_title":"60자 이내","meta_desc":"155자 내외","tags":["태그1","태그2","태그3","태그4","태그5","태그6","태그7"],"content":"## 소제목1\\n\\n내용...\\n\\n## 소제목2\\n\\n내용...\\n\\n## 한 달만 직접 확인해보세요\\n\\n...연락처 {tel}...\\n\\n## 핵심 요약\\n\\n- 요점1\\n- 요점2\\n- 요점3\\n- 요점4\\n- 요점5\\n- 요점6"}}"""


# ═══════════════════════════════════════════════════════════════
# Gemini API 호출
# ═══════════════════════════════════════════════════════════════
def call_gemini(prompt: str, retry: int = 3) -> dict:
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}")
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 16384,
            "responseMimeType": "application/json",
        },
    }
    for attempt in range(retry):
        r = requests.post(url, json=body, timeout=120)
        if r.status_code == 200:
            data = r.json()
            raw  = data["candidates"][0]["content"]["parts"][0]["text"]
            raw  = re.sub(r"^```(?:json)?\s*", "", raw.strip())
            raw  = re.sub(r"\s*```$",          "", raw.strip())
            usage = data.get("usageMetadata", {})
            in_t  = usage.get("promptTokenCount", 0)
            out_t = usage.get("candidatesTokenCount", 0)
            cost  = (in_t / 1_000_000 * 0.075) + (out_t / 1_000_000 * 0.30)
            print(f"  토큰: 입력 {in_t:,} / 출력 {out_t:,} | 비용 ${cost:.5f} (≈{cost*1380:.1f}원)")
            return json.loads(raw)
        elif r.status_code == 429:
            wait = 20 * (attempt + 1)
            print(f"  Rate limit → {wait}초 대기...", flush=True)
            time.sleep(wait)
        else:
            print(f"  ❌ Gemini 오류 {r.status_code}: {r.text[:300]}")
            sys.exit(1)
    raise RuntimeError("Gemini 최대 재시도 초과")


# ═══════════════════════════════════════════════════════════════
# Supabase 저장
# ═══════════════════════════════════════════════════════════════
def get_existing_slugs() -> set:
    r = requests.get(f"{SUPABASE_URL}/rest/v1/posts?select=slug&limit=500", headers=SB_HEADERS)
    return {p["slug"] for p in r.json()} if r.status_code == 200 else set()

def save_post(payload: dict) -> bool:
    r = requests.post(f"{SUPABASE_URL}/rest/v1/posts", headers=SB_HEADERS, json=payload)
    if r.status_code in (200, 201):
        print(f"  ✅ 저장 완료: {payload['slug']}")
        return True
    print(f"  ❌ 저장 실패 {r.status_code}: {r.text[:200]}")
    return False


# ═══════════════════════════════════════════════════════════════
# 메인
# ═══════════════════════════════════════════════════════════════
def main():
    print("🌊 감태추출물 카테고리별 8개 포스팅 시작\n")
    existing = get_existing_slugs()
    print(f"기존 포스팅 슬러그 {len(existing)}개 로드\n")

    success = 0
    for i, post in enumerate(POSTS, 1):
        cat  = post["category"]
        topic = post["topic"]
        print(f"[{i}/8] 카테고리: {cat}")
        print(f"  주제: {topic[:50]}...")

        prompt = build_prompt(post)
        try:
            result = call_gemini(prompt)
        except Exception as e:
            print(f"  ❌ Gemini 실패: {e}")
            continue

        slug = result.get("slug", "")
        # 슬러그 중복 처리
        if slug in existing:
            slug = slug + f"-gamtae-{i}"
            result["slug"] = slug

        content_len = len(result.get("content", ""))
        print(f"  📏 본문: {content_len:,}자 | 태그: {', '.join(result.get('tags', [])[:4])}")

        payload = {
            "title":       result.get("title", topic[:60]),
            "slug":        slug,
            "excerpt":     result.get("excerpt", ""),
            "meta_title":  result.get("meta_title", ""),
            "meta_desc":   result.get("meta_desc", ""),
            "tags":        result.get("tags", []),
            "content":     result.get("content", ""),
            "category":    cat,
            "published":   True,
            "created_at":  datetime.now(timezone.utc).isoformat(),
        }

        if save_post(payload):
            existing.add(slug)
            success += 1

        # API 과부하 방지
        if i < len(POSTS):
            print(f"  ⏳ 다음 포스팅까지 8초 대기...\n")
            time.sleep(8)

    print(f"\n🎉 완료! {success}/{len(POSTS)}개 포스팅 성공")

if __name__ == "__main__":
    main()
