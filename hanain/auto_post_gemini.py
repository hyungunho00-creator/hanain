"""
Gemini 자동 블로그 포스팅 스크립트 v2
- Supabase blog_topics 테이블에서 주제/키워드 읽어서 자동 발행
- SEO 고품질 (3000자+, 키워드 밀도, 내부링크, 구조화데이터)
- GitHub Actions에서 매일 자동 실행

사용법:
  python3 auto_post_gemini.py          # blog_topics에서 자동 (기본 3개)
  python3 auto_post_gemini.py --count 5
  python3 auto_post_gemini.py --topic "직접입력 주제" --keywords "키워드1,키워드2" --category diabetes
  python3 auto_post_gemini.py --dry-run
"""

import os, sys, re, json, time, argparse, requests
from datetime import datetime, timezone

# ── 환경변수 or 하드코딩 ────────────────────────────────────
SUPABASE_URL  = os.environ.get("SUPABASE_URL",  "https://rlfxuyeoluoeaxuujtly.supabase.co")
SERVICE_KEY   = os.environ.get("SUPABASE_SERVICE_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL   = "gemini-2.5-flash"
SITE_URL       = "https://phlorotannin.com"

SB_HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type":  "application/json",
    "Accept-Profile": "public",
    "Content-Profile": "public",
    "Prefer": "return=representation",
}

CATEGORY_NAMES = {
    "diabetes":      "당뇨·혈당",
    "cancer":        "항암·면역",
    "brain":         "뇌·인지",
    "cardiovascular":"심혈관",
    "inflammation":  "염증·면역",
    "skin":          "피부·모발",
    "research":      "연구·임상",
    "general":       "일반",
}

# ── SEO 고품질 프롬프트 ───────────────────────────────────────
def build_prompt(topic: str, keywords: list, category: str) -> str:
    kw_str   = ", ".join(keywords) if keywords else "플로로탄닌, phlorotannin, 감태추출물"
    cat_name = CATEGORY_NAMES.get(category, "일반")
    qa_link  = f"{SITE_URL}/qa"
    blog_link = f"{SITE_URL}/blog"

    return f"""당신은 플로로탄닌(phlorotannin) 건강 정보 전문 블로그 작성자입니다.
아래 조건에 맞는 SEO 최적화 블로그 글을 JSON으로 작성하세요.

[주제] {topic}
[카테고리] {cat_name}
[반드시 포함할 키워드] {kw_str}

[SEO 작성 규칙 - 반드시 지킬 것]
1. 제목: 한국어 핵심 + 영어 키워드 병기, 50자 이내
   예시) "플로로탄닌 당뇨 임상 2b 성공 | Phlorotannin Diabetes Phase 2b"
2. 본문 길이: content 필드 3,000자 이상 (마크다운 포함)
3. 소제목(##): 최소 5개, 각 섹션 400자 이상
4. 키워드 밀도: 제공된 키워드를 본문 전체에 자연스럽게 분산 (각 키워드 최소 3회)
5. 내부링크: 본문 중 자연스러운 위치에 아래 링크를 마크다운으로 삽입
   - [플로로탄닌 건강 Q&A 바로가기]({qa_link})
   - [플로로탄닌 연구 블로그]({blog_link})
6. 첫 문단: 핵심 키워드로 시작, 독자의 관심 유발
7. 마지막 섹션: ## 핵심 요약 — 불릿 5개로 정리
8. slug: 영문 소문자 + 하이픈, 5~80자, phlorotannin으로 시작 권장
9. meta_title: 60자 이내, 주요 키워드 앞쪽 배치
10. meta_desc: 150~160자, 클릭 유도 문구 포함

[반환 형식 — 순수 JSON만, 다른 텍스트 없이]
{{
  "title": "...",
  "slug": "phlorotannin-...",
  "excerpt": "150자 이내 요약",
  "meta_title": "60자 이내 SEO 제목",
  "meta_desc": "155자 내외 메타 설명",
  "tags": ["태그1","태그2","태그3","태그4","태그5","태그6"],
  "content": "## 도입\\n\\n내용...\\n\\n## 소제목2\\n\\n내용...\\n\\n[플로로탄닌 건강 Q&A 바로가기]({qa_link})\\n\\n## 소제목3\\n\\n내용...\\n\\n## 소제목4\\n\\n내용...\\n\\n## 소제목5\\n\\n내용...\\n\\n## 핵심 요약\\n\\n- 요점1\\n- 요점2\\n- 요점3\\n- 요점4\\n- 요점5"
}}"""

# ── Gemini API 호출 ───────────────────────────────────────────
def call_gemini(prompt: str, retry: int = 3) -> dict:
    if not GEMINI_API_KEY:
        print("❌ GEMINI_API_KEY 없음. export GEMINI_API_KEY=AIza...")
        sys.exit(1)

    url  = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.65,
            "maxOutputTokens": 8192,
            "responseMimeType": "application/json",
        },
    }

    for attempt in range(retry):
        r = requests.post(url, json=body, timeout=120)
        if r.status_code == 200:
            raw = r.json()["candidates"][0]["content"]["parts"][0]["text"]
            usage = r.json().get("usageMetadata", {})
            in_t  = usage.get("promptTokenCount", 0)
            out_t = usage.get("candidatesTokenCount", 0)
            cost  = (in_t / 1_000_000 * 0.075) + (out_t / 1_000_000 * 0.30)
            print(f"  토큰: 입력 {in_t:,} / 출력 {out_t:,} / 비용 ${cost:.5f} (≈{cost*1380:.1f}원)")
            return json.loads(raw)
        elif r.status_code == 429:
            wait = 15 * (attempt + 1)
            print(f"  Rate limit → {wait}초 대기...", end="", flush=True)
            time.sleep(wait)
            print(" 재시도")
        else:
            print(f"  ❌ Gemini 오류 {r.status_code}: {r.text[:150]}")
            sys.exit(1)
    raise RuntimeError("Gemini 최대 재시도 초과")

# ── Supabase: blog_topics에서 미발행 주제 가져오기 ─────────────
def fetch_topics(count: int) -> list:
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/blog_topics"
        f"?used=eq.false&order=priority.asc,id.asc&limit={count}",
        headers=SB_HEADERS,
    )
    if r.status_code == 200:
        return r.json()
    # 테이블 없으면 빈 리스트
    print(f"  ⚠️  blog_topics 조회 실패: {r.status_code} (테이블이 없을 수 있음)")
    return []

def mark_topic_used(topic_id: int):
    requests.patch(
        f"{SUPABASE_URL}/rest/v1/blog_topics?id=eq.{topic_id}",
        headers=SB_HEADERS,
        json={"used": True},
    )

# ── Supabase: posts 저장 ─────────────────────────────────────
def save_post(payload: dict) -> bool:
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/posts",
        headers=SB_HEADERS,
        json=payload,
    )
    if r.status_code in (200, 201):
        print(f"  ✅ 저장 완료 → {SITE_URL}/blog/{payload['slug']}")
        return True
    if r.status_code == 409:
        # slug 중복 → 제목에 타임스탬프 붙여서 재시도
        payload["slug"] += f"-{int(time.time())}"
        r2 = requests.post(f"{SUPABASE_URL}/rest/v1/posts", headers=SB_HEADERS, json=payload)
        if r2.status_code in (200, 201):
            print(f"  ✅ 저장 완료(slug 조정) → {SITE_URL}/blog/{payload['slug']}")
            return True
    print(f"  ❌ 저장 실패: {r.status_code} {r.text[:200]}")
    return False

# ── 기발행 slug 목록 ─────────────────────────────────────────
def get_existing_slugs() -> set:
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/posts?select=slug",
        headers=SB_HEADERS,
    )
    return {p["slug"] for p in r.json()} if r.status_code == 200 else set()

# ── 글 1개 생성 + 저장 ───────────────────────────────────────
def create_post(topic: str, keywords: list, category: str, dry_run: bool = False) -> bool:
    cat_name = CATEGORY_NAMES.get(category, category)
    print(f"\n📝 [{cat_name}] {topic}")
    if keywords:
        print(f"  🔑 키워드: {', '.join(keywords[:5])}")

    print("  🤖 Gemini 생성 중...", flush=True)
    try:
        post = call_gemini(build_prompt(topic, keywords, category))
    except Exception as e:
        print(f"  ❌ 생성 실패: {e}")
        return False

    # 슬러그 보정
    slug = post.get("slug", "")
    if not slug or len(slug) < 5:
        slug = f"phlorotannin-{int(time.time())}"
    slug = re.sub(r"[^a-z0-9-]", "", slug.lower().replace(" ", "-"))[:80]

    now = datetime.now(timezone.utc).isoformat()
    payload = {
        "slug":         slug,
        "title":        post.get("title", topic)[:200],
        "excerpt":      post.get("excerpt", "")[:500],
        "content":      post.get("content", ""),
        "category":     category,
        "tags":         post.get("tags", [])[:10],
        "meta_title":   (post.get("meta_title") or post.get("title", topic))[:60],
        "meta_desc":    (post.get("meta_desc")  or post.get("excerpt", ""))[:160],
        "og_image":     "/og-image.png",
        "status":       "published",
        "published_at": now,
    }

    content_len = len(payload["content"])
    print(f"  📄 제목: {payload['title'][:60]}")
    print(f"  📎 슬러그: {slug}")
    print(f"  📏 본문: {content_len:,}자 | 태그: {', '.join(payload['tags'][:4])}")

    if content_len < 1500:
        print(f"  ⚠️  본문이 짧습니다 ({content_len}자). 저장은 진행합니다.")

    if dry_run:
        print("  [DRY RUN] 저장 안 함")
        return True

    return save_post(payload)

# ── 메인 ─────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Gemini 자동 블로그 포스팅 v2")
    parser.add_argument("--count",    type=int, default=3,     help="발행 수 (기본 3)")
    parser.add_argument("--topic",    type=str, default="",    help="직접 주제 입력")
    parser.add_argument("--keywords", type=str, default="",    help="직접 키워드 (쉼표 구분)")
    parser.add_argument("--category", type=str, default="general", help="카테고리")
    parser.add_argument("--dry-run",  action="store_true",     help="미리보기만 (저장 안 함)")
    args = parser.parse_args()

    print(f"{'='*55}")
    print(f"  플로로탄닌 Gemini 자동 포스팅 v2")
    print(f"  모드: {'DRY RUN' if args.dry_run else '실제 발행'} | 목표: {args.count}개")
    print(f"{'='*55}")

    existing = get_existing_slugs()
    print(f"기존 발행 글: {len(existing)}개")

    # ── 직접 주제 입력 모드 ──
    if args.topic:
        kws = [k.strip() for k in args.keywords.split(",") if k.strip()] if args.keywords else []
        create_post(args.topic, kws, args.category, args.dry_run)
        return

    # ── blog_topics 자동 모드 ──
    topics = fetch_topics(args.count * 2)  # 여유분 확보
    if not topics:
        print("⚠️  blog_topics 테이블에 미발행 주제가 없습니다.")
        print("   Supabase에서 blog_topics 테이블에 주제를 추가하세요.")
        return

    posted = 0
    for row in topics:
        if posted >= args.count:
            break
        topic    = row["topic"]
        keywords = row.get("keywords") or []
        category = row.get("category", "general")
        topic_id = row["id"]

        success = create_post(topic, keywords, category, args.dry_run)
        if success:
            posted += 1
            if not args.dry_run:
                mark_topic_used(topic_id)
        time.sleep(8)  # Rate limit 방지

    print(f"\n{'='*55}")
    print(f"  완료: {posted}/{args.count}개 발행")
    print(f"  블로그: {SITE_URL}/blog")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
