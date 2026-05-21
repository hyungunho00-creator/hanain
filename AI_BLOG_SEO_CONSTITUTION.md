# 🏛️ AI 블로그·SEO 작업 헌법 (Phlorotannin.com)

> **이 문서는 블로그 글쓰기·카테고리 추가·SEO 자산화 작업 전에 반드시 읽고 체크리스트를 통과해야 합니다.**
> 한 번 만든 실수를 반복하지 않기 위한 강제 절차입니다.
> 토큰 절약보다 두 번 수정 안 하는 것이 진짜 절약입니다.

작성일: 2026-05-20
작성 계기: 신규 블로그 카테고리 추가 시 Supabase `categories` 테이블 INSERT 누락 → BlogPage 탭에 표시 안 됨 + PostCard에 영문 slug 노출

---

## 🚨 제1조 (절대 원칙): 두 번 수정은 더 큰 낭비다

- 추측·생략·"이번엔 괜찮겠지" 금지
- **검증 안 한 코드를 배포하면 사용자가 본 다음에 또 고쳐야 한다 = 토큰 2배 + 신뢰 -1**
- 모든 작업은 **DB 실체 확인 → 코드 확인 → 빌드 확인 → 화면 확인**의 순서로
- "이전 세션에서 했던 가정"을 그대로 믿지 말 것 (DB 상태는 매일 바뀐다)

---

## 📋 제2조 (사전 체크리스트): 블로그 글 작성 전 7가지 확인

블로그 글을 1개라도 작성하기 전에 **반드시** 아래 7가지를 순서대로 확인한다.

### ✅ 체크 1. Supabase `categories` 테이블 실제 조회
```bash
curl -H "apikey: $ANON" -H "Authorization: Bearer $ANON" -H "Accept-Profile: public" \
  "https://rlfxuyeoluoeaxuujtly.supabase.co/rest/v1/categories?type=eq.blog&status=eq.active&order=sort_order.asc&select=id,name,sort_order"
```
- 작성할 글의 `category` 값이 **반드시 DB에 존재**해야 한다
- 없으면 **카테고리부터 INSERT** (글보다 카테고리가 먼저)
- BlogPage.jsx의 `FALLBACK_CATEGORIES`는 **DB 페치 실패 시 fallback**일 뿐, source of truth가 아니다

### ✅ 체크 2. RLS 정책으로 INSERT 가능 여부 확인
- `categories` 테이블 INSERT는 **anon key로 401** (RLS) → service_role 필요 또는 Admin UI 사용
- `posts` 테이블 INSERT는 **anon key로 OK** (현재 정책상)
- 401이 떴는데 우회하지 말 것. 사용자에게 방안을 제시하고 승인 받기

### ✅ 체크 3. 카테고리 정의 중복 위치 전수 검색
```bash
grep -rn "FALLBACK_CATEGORIES\|CAT_COLORS\|category.*name.*항암\|disease-health-info" \
  hanain/src --include="*.jsx" --include="*.js"
```
**현재 알려진 카테고리 매핑 중복 위치 (이 7곳 동기화 필수):**
| # | 파일 | 라인 | 변수/맵 | 용도 |
|---|---|---|---|---|
| 1 | `hanain/src/pages/BlogPage.jsx` | ~10 | `FALLBACK_CATEGORIES` | 탭/PostCard |
| 2 | `hanain/src/pages/BlogPage.jsx` | ~31 | `CAT_COLORS` | 배지 색 |
| 3 | `hanain/src/pages/BlogPage.jsx` | ~50 | `BLOG_TO_VIDEO_CAT` | 영상 매칭 |
| 4 | `hanain/src/pages/BlogPostPage.jsx` | ~125 | `CAT_COLORS` | 글 상세 배지 |
| 5 | `hanain/src/pages/BlogPostPage.jsx` | ~130 | 한글 name map | 글 상세 표기 |
| 6 | `hanain/src/pages/AdminPage.jsx` | ~999, 1323 | 어드민 카테고리 옵션 | 글쓰기 select |
| 7 | `hanain/src/pages/LandingPage.jsx` | ~176 | 카테고리 한글명 | 랜딩 표시 |
| (+1) | Supabase `categories` 테이블 | row | DB source of truth | 모든 페이지 |

→ **장기 목표**: 위 6곳을 모두 `lib/categories.js` 한 곳으로 모으고, DB와 fallback을 머지하는 단일 함수로 통일 (TODO).

### ✅ 체크 4. meta_title ≤ 40자 / meta_desc ≤ 80자 검증 (한글 기준)
- `posts_data.py` 작성 시 `__main__`에서 자동 출력
- 초과 시 발행 금지

### ✅ 체크 5. 콘텐츠 정책 위반 검사 (자동 grep) — 정밀 검증

**5-A. 절대 금칙어 (어떤 문맥에서도 X)**:
- 상품명: `만나스웰드롭`, `세조아`, `드림아일랜드`, `뉴트리원`, `종근당`, `SOS세럼`
- 과장 단어: `완치`, `특효`, `특허`

**5-A-EXC. 절대 금칙 예외 — 글로벌 성분 사례로 허용**:
- `씨놀(Seanol)` — 영국 LiveChem 표준화 감태 폴리페놀. **성분 표준화 브랜드명**으로 학술/리뷰에서 광범위 통용 → 글로벌 사례 비교 콘텐츠에서 허용
- `딜리버런스(De-Liver-Ance)` — 영국 Equilibrium Labs 액상 영양제. **씨놀 기반 글로벌 유통 사례**로 학술 비교 컨텍스트에서 허용
- 단, 이 두 단어는 **자사 제품으로 오인 가능한 직접 권유 문구 금지**:
  - ❌ "딜리버런스를 드시면 좋아요" (직접 권유)
  - ✅ "영국에서는 딜리버런스(De-Liver-Ance) 같은 액상 영양제 사례가 보고됩니다" (글로벌 사례 인용)
- `카프(KPP)`, `에콜(Ecol)` 같은 한국 표준화 폴리페놀 사례도 동일 기준

**5-B. 문맥 의존 금칙어 (단어 자체는 금지지만, 정당한 의약학 용어/부정문 면책은 허용)**:
- `효능` → 단독 사용 X. 단, **"특정 효능을 보장하지 않습니다"** 같은 **부정 면책 문구**는 허용
- `치료제` → 단독 사용 X. 단, **의약학 표준 합성어**(`표적치료제`, `항암치료제`, `면역항암치료제`, `호르몬치료제`)는 허용 — WHO/FDA/식약처 표준 용어
- `치료` → "암 치료", "항암 치료", "방사선 치료" 같은 **의료 행위 명사**는 허용. "이것이 암을 치료합니다" 같은 **건기식 효능 단정문**은 X

**자동 검증 로직** (`posts_data.py` __main__):
```python
ABSOLUTE_FORBIDDEN = ['만나스웰드롭','세조아','드림아일랜드','뉴트리원','종근당',
                      'SOS세럼','완치','특효','특허']
# 글로벌 사례 허용 — 자사 권유 컨텍스트만 차단
GLOBAL_INGREDIENT_BRANDS = ['씨놀','Seanol','딜리버런스','De-Liver-Ance','카프','KPP','에콜','Ecol']
PROHIBITED_PROMOTION = [
    '드시면 좋', '드세요', '추천드립니다', '구매 추천',  # 자사 권유 직접 표현
]
# 문맥 화이트리스트
CONTEXT_WHITELIST = {
    '효능': ['특정 효능을 보장하지 않', '효능을 보장하지 않', '효능·효과가 입증된'],
    '치료제': ['표적치료제', '항암치료제', '면역항암치료제', '호르몬치료제', '항호르몬치료제'],
}
for p in POSTS:
    # 5-A: 절대 금칙
    for w in ABSOLUTE_FORBIDDEN:
        if w in p['content'] or w in p['title']:
            print(f'❌ ABSOLUTE: {p["slug"]} → "{w}"')
    # 5-B: 단독 사용 검사 (화이트리스트 제거 후 남는지)
    for w, allowed_contexts in CONTEXT_WHITELIST.items():
        text = p['content'] + ' ' + p['title']
        for ctx in allowed_contexts: text = text.replace(ctx, '')
        if w in text:
            print(f'⚠️ CONTEXT: {p["slug"]} → "{w}" 단독 사용')
```

- ✅ 성분명만 사용 (플로로탄닌·감태추출물·씨놀·카프·디에콜·에콜)
- ✅ 약물 일반명 OK (타목시펜·키트루다·트라스투주맙 등 INN/USAN 표준명)
- ❌ 상품명 절대 X (과대광고법)
- ❌ 경쟁사명 X (소송 위험)
- ❌ "이것이 치료한다", "완치된다", "특허 효능" 같은 **단정 효능 광고**는 X (건기식법)

### ✅ 체크 6. slug 중복 검사
```bash
# 신규 slug가 이미 DB에 있는지
curl -H "apikey: $ANON" -H "Authorization: Bearer $ANON" -H "Accept-Profile: public" \
  "https://rlfxuyeoluoeaxuujtly.supabase.co/rest/v1/posts?slug=in.(slug1,slug2)&select=id,slug"
```
- 결과가 비어있어야 함. 있으면 slug 변경

### ✅ 체크 7. SEO 자산화 가능 검증
글 발행 후 SEO 자산이 되려면 **5가지 모두 충족**:
1. ✅ DB에 `status='published'` 로 저장됨
2. ✅ `https://phlorotannin.com/blog/{slug}` URL이 200 응답 (sitemap.xml 자동 포함)
3. ✅ 카테고리 탭에서 클릭 시 해당 글이 보임 (= categories 테이블에 카테고리 존재)
4. ✅ IndexNow 4개 엔드포인트 통지 (Bing/Google via api.indexnow / Yandex / Naver)
5. ✅ canonical URL이 정상이고 robots에서 차단 안 됨

위 5가지 중 **하나라도 미달이면 SEO 자산이 아니다.** 그냥 DB row일 뿐.

---

## 📊 제3조 (실행 순서): 신규 카테고리 + 글 발행 표준 워크플로우

이 순서를 어기면 또 재작업이다.

```
[1] DB 확인 (체크리스트 1)
        ↓
[2] 신규 카테고리 필요? ─── YES ──→ [2-1] categories 테이블 INSERT 먼저
        ↓ NO                              (RLS 401이면 사용자 승인 받고 방안 선택)
        ↓                                    ↓
[3] BlogPage.jsx FALLBACK_CATEGORIES + CAT_COLORS + BLOG_TO_VIDEO_CAT 갱신
        ↓
[4] BlogPostPage.jsx CAT_COLORS + 한글 name map 갱신 (중복 위치!)
        ↓
[5] AdminPage.jsx 카테고리 옵션 갱신 (중복 위치!)
        ↓
[6] LandingPage.jsx 한글명 map 갱신 (중복 위치!)
        ↓
[7] posts_data.py 작성 + __main__ 검증 (meta 길이 + 금지어)
        ↓
[8] slug 중복 검사 (체크리스트 6)
        ↓
[9] posts 테이블 INSERT (anon key OK)
        ↓
[10] npm run build (SUCCESS 확인)
        ↓
[11] git commit + push to main
        ↓
[12] Vercel 자동 배포 대기 (~1분)
        ↓
[13] https://phlorotannin.com/blog 카테고리 탭 + 글 카드 육안 확인
        ↓
[14] IndexNow 4 엔드포인트 통지
        ↓
[15] sitemap.xml에 신규 URL 포함됐는지 확인
```

**[3]~[6]은 반드시 같은 commit에 묶을 것.** 분리하면 일시적으로 카테고리 탭/상세/어드민/랜딩 중 어느 한 곳이 깨진 상태로 배포됨.

---

## 🛑 제4조 (금지 사항)

### ❌ 절대 하지 말 것
1. **DB 상태 가정**: "이전 세션에서 categories 없었으니 지금도 없겠지" → 매번 확인
2. **부분 동기화**: BlogPage만 고치고 BlogPostPage 안 고치기 → 글 상세에서 영문 slug 노출
3. **빌드 안 돌리고 push**: 빌드 깨지면 Vercel 전체 사이트 다운
4. **상품명·경쟁사명 거론**: 과대광고법·소송 리스크
5. **service_role 키를 코드/공개 폴더에 작성**: 보안 사고
6. **`tmp_seo_assets/` 외 임시 파일 위치 사용**: 추적 불가
7. **검증 없이 "성공" 보고**: 사용자가 화면 보고 알아챔. 신뢰 -10

### ⚠️ 사용자 승인 필요
1. **RLS 401 우회**: service_role 키 사용 시 → 사용자에게 키 요청 또는 방안 제시
2. **카테고리 신설**: SEO 영향이 크므로 사용자 승인 후 진행 (이미 합의된 경우 제외)
3. **기존 글 대량 수정/이동**: 100건 이상 PATCH 전 영향도 보고
4. **사이트 구조 변경**: URL 패턴 변경, robots.txt, sitemap.xml 구조 변경

---

## 💰 제5조 (토큰 절약의 진짜 의미)

**나쁜 절약** (절대 금지):
- 검증 건너뛰기 → 사용자 발견 → 재작업 (토큰 3배)
- DB 조회 건너뛰고 추측 → 틀림 → 재작업 (토큰 2배)
- "비슷한 패턴이니 같겠지" 가정 → 다름 → 재작업

**진짜 절약**:
- 한 commit에 관련 변경 모두 묶기 (위 [3]~[6])
- 같은 파일의 여러 edit은 MultiEdit 1회로
- 독립적 도구 호출은 1개 message에 병렬
- 사전 체크리스트 1회 = 재작업 0회

**계산**:
- 검증 1회 비용: ~500 토큰
- 재작업 1회 비용: ~3,000 토큰 + 사용자 신뢰 손실 (값 무한대)
- → 검증을 6번 해도 재작업 1번보다 싸다

---

## 🗂️ 제6조 (작업 산출물 보관 규칙)

신규 글/카테고리 배치마다 `/home/user/webapp/tmp_seo_assets/<batch_name>/` 폴더 생성:
```
tmp_seo_assets/<batch_name>/
├── posts_data.py            # 글 본문 (Python dict)
├── insert_categories.py     # 신규 카테고리 INSERT (필요 시)
├── insert_to_supabase.py    # posts INSERT
├── indexnow_<batch>.py      # IndexNow 통지
├── insert_results.json      # INSERT 결과 (id 매핑)
└── indexnow_results.json    # IndexNow 응답 (200/202 기록)
```
이 폴더는 git에 commit (감사 추적용).

---

## 🧪 제7조 (회귀 방지): 발행 후 검증

발행 직후 5분 이내에 다음 5가지 실행:

```bash
# 1. 신규 글이 DB에서 published 인지
curl -H "apikey: $ANON" "...rest/v1/posts?slug=eq.<slug>&select=id,status,category"

# 2. 카테고리 탭에 새 카테고리 보이는지 (실제 페이지 fetch)
curl -s https://phlorotannin.com/blog | grep -o '구매 가이드\|부작용·주의사항'

# 3. 글 상세 페이지 200 응답
curl -sI https://phlorotannin.com/blog/<slug> | head -1

# 4. sitemap에 포함됐는지
curl -s https://phlorotannin.com/sitemap.xml | grep <slug>

# 5. 영문 slug가 카드에 노출되지 않는지 (한글 카테고리명만 나와야 함)
curl -s https://phlorotannin.com/blog | grep -c 'safety-precautions\|buying-guide'
# → 0이어야 정상 (영문 slug 노출 = 카테고리 한글명 매핑 누락 신호)
```

위 5가지 중 하나라도 실패 → **즉시 hotfix**. 다음 작업으로 넘어가지 말 것.

---

## 🖼️ 제8조 (이미지·alt 의무) — 2026-05-20 신설

신규 블로그 글 발행 시 반드시 다음 3가지를 충족한다. 위반 시 발행 차단.

### ✅ 의무 1. 글마다 다른 og_image 생성

- **동일 og_image를 두 개 이상 글에 재사용 절대 금지** (SEO 동일 이미지 페널티 / 사용자 신뢰 손상)
- **채택 모델**: `fal-ai/bytedance/seedream/v5/lite` (2026-05-20 파일럿 검증 후 확정)
  - **선정 근거**: z-image/turbo는 가장 저렴(~$0.003)하지만 토픽 명확성 5/10, seedream lite는 9/10. 단가 차이 $0.007/장 × 288장 = +$2.02로 미미한 비용 증가 대비 품질·일관성 우위 결정적
  - **변경 시**: 비용·품질 비교 + 3개 이상 파일럿 검증 후 헌법 개정 필요
- **저장 위치**: Supabase Storage 버킷 `blog-images/`
  - 경로 규칙: `blog-images/{slug}.webp` (slug = 글의 slug 컬럼)
  - public 폴더 사용 금지 (git repo 비대화 방지)
  - CDN URL은 `https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/blog-images/{slug}.webp`
- **프롬프트 표준 (필수 준수)** — v2 (2026-05-20 텍스트 누출 차단 강화):
  - **단일 진실 소스**: `tmp_seo_assets/image_gen/prompt_builder.py`의 `build_prompt(title, category) -> str`
  - 베이스 구조 (필수 순서):
    1. 긍정문 우선: `wordless pictogram-only vector illustration, icon-style symbolic shapes only, completely text-free composition`
    2. 에디토리얼 톤: `minimal flat editorial illustration for a medical health blog header`
    3. 브랜드 팔레트: `deep navy blue #0D1B3E primary and warm muted gold #D4AF5A accent, soft pastel cream background`
    4. 텍스트 차단 (정상문+부정문 혼용): `absolutely no text anywhere, no typography, no letters, no numbers, no Korean Hangul, no Latin alphabet, no signage, no labels, no captions, no logos, no watermarks`
    5. 포맷: `16:9 horizontal banner` + `clean vector aesthetic similar to The New York Times health editorial illustrations`
    6. 토픽: `depicting {KEYWORD_EN 매핑 최대 3개}, in the context of {CATEGORY_EN}`
  - **부정 프롬프트만으로는 한글이 새어 들어옴 (v1에서 검증) → 반드시 긍정문 "wordless pictogram-only"가 앞에 와야 함**
- **비율**: 16:9 고정 (OG 카드·블로그 카드·소셜 공유 표준)

### ✅ 의무 2. alt 텍스트 글마다 다르게

- **형식 고정**: `{title의 '|' 앞부분} - {카테고리 한글명} 건강정보 일러스트`
  - 예: `"콜라겐 먹어도 피부 회복 안 되는 이유 - 피부·모발 건강정보 일러스트"`
- **동적 생성**: `hanain/src/pages/BlogPostPage.jsx`의 `buildImageAlt(post)` 헬퍼 사용
  - DB에 별도 `alt` 컬럼 불필요 (title+category 조합으로 unique 보장)
  - 동일 title 두 개가 들어오면 발행 차단 (제2조 체크 6 slug 중복과 동일 수준 강제)
- **카테고리 매핑**: `BlogPostPage.jsx`의 `CAT_NAMES`에 모든 카테고리 등록 — 누락 시 fallback이 영문 slug 노출됨 (시각적 결함)

### ✅ 의무 3. 발행 후 자동 검증 (제7조 확장)

발행 직후 5분 이내에 다음 2가지 추가 검증:

```bash
# 6. og_image URL이 200 응답하는지 (이미지 누락 방지)
curl -sI "$(curl -s "...rest/v1/posts?slug=eq.<slug>&select=og_image" | jq -r '.[0].og_image')" | head -1

# 7. og_image가 다른 글과 중복되지 않는지 (동일 이미지 페널티 방지)
curl -s "...rest/v1/posts?select=slug,og_image" | python3 -c "
import json, sys, collections
posts = json.load(sys.stdin)
ctr = collections.Counter(p['og_image'] for p in posts if p['og_image'])
dup = [(url, n) for url, n in ctr.items() if n > 1]
print(f'중복 이미지: {len(dup)}건' + (' ❌' if dup else ' ✅'))
"
```

위 7가지 중 하나라도 실패 → **즉시 hotfix**.

### ✅ 의무 4. 자동화 (인간 개입 최소화)

- `tmp_seo_assets/cancer_care_batch{1,2,3}/common_modules.py` 및 향후 모든 배치 발행 스크립트에 **이미지 생성 + Storage 업로드 + og_image PATCH** 로직을 표준 함수로 포함
- 신규 글 발행 함수 시그니처: `publish_post(title, category, content, ...) → 내부에서 자동으로 이미지 생성 → og_image 채워서 INSERT`
- 사람이 "이미지 잊었네" 할 수 없도록 **이미지 없이 발행 시 함수 자체가 에러 발생**

### 📊 비용 가이드

| 모델 | 1장 가격 | 288장 비용 | 파일럿 점수 | 권장도 |
|---|---|---|---|---|
| fal-ai/z-image/turbo | ~$0.003 | ~$0.86 | 32/40 (토픽 5/10) | 토픽 추상화 우려, 비채택 |
| **fal-ai/bytedance/seedream/v5/lite** | ~$0.01 | ~$2.88 | 34~37/40 (토픽 9/10) | ⭐ **채택** (2026-05-20) |
| nano-banana-2 | ~$0.04 | ~$11.52 | 37/40 | 텍스트 필요 시만 |
| nano-banana-pro | ~$0.04+ | ~$11.52+ | 미평가 | 사용 금지 (가성비 X) |

**비용 결정 근거**: 사용자 위임 "현명하게, 미래에 도움 되게" 기준. seedream lite는 z-image 대비 +$2.02로 288개 헤더의 토픽 명확성·브랜드 일관성을 한 단계 끌어올림. 향후 1년간 페이지 노출의 시각 품질이 $2의 가치를 압도적으로 상회한다고 판단.

---

## ❓ 제10조 (Q&A 자산화 의무) — 2026-05-21 신설

### 배경
- Q&A 데이터는 `public/qa.json`에 1,361건 (12 카테고리) 정적 보관 (Supabase 마이그레이션 대기)
- 한 글 더 추가 안 해도 **사이트맵·JSON-LD·태그 페이지·내부 링크**만 살리면 1,000+ 신규 SEO 자산
- LLM 토큰 0개로 가능 (제5조 준수)

### ✅ 의무 1. Q&A 진실원 (Source of Truth)
- **진실원**: `hanain/public/qa.json` (1,361건 보유, 2.2MB)
- **스키마**: `{ id, category, difficulty, tags[], question, answer, views, likes }`
- **수정 절차**: 직접 편집 금지 → `tmp_seo_assets/qa_*/` 하위 스크립트로 일괄 처리 후 검증된 결과만 머지
- **DB 마이그레이션**: Phase 5에서 Supabase `qa_questions` 로 옮길 예정. 그 전까지 qa.json이 진실원.

### ✅ 의무 2. 신규 Q&A 추가 전 체크리스트
1. `id`가 기존 1,361개와 충돌 안 함 (`grep -c '"id": "<new>"' public/qa.json`)
2. `category`가 12개 카테고리 중 하나 (QAPage.jsx `QA_CATEGORIES`)
3. `tags[]` 배열 필수, 최소 1개, 한글로
4. `question`은 자연 의문문 (구글 People Also Ask 노출용)
5. `answer`는 200~500자, **제4조 금지어 0회** (자동 스캔 통과)
6. 슬러그 충돌 검사 — 슬러그 규칙: `question.replace(/[^\w\s가-힣]/g,'').replace(/\s+/g,'-').slice(0,60)`
7. JSON parse 검증 (`python3 -c "import json; json.load(open('qa.json'))"`)

### ✅ 의무 3. FAQPage JSON-LD 자동 주입
- `QuestionDetailPage.jsx` 매 페이지에 schema.org `FAQPage` 스키마 의무
- `QAPage.jsx` (카테고리별 상위 10개) + 태그 페이지에도 적용
- 구글 리치 스니펫 노출 → CTR 2~3배
- **헌법 상수**: `FAQ_JSONLD_MAX_PER_PAGE = 10` (단일 페이지에 너무 많이 박으면 페널티 가능성)

### ✅ 의무 4. 태그 페이지 자동 확장
- **헌법 상수**: `MIN_TAG_COUNT = 5`
- 1,361개 Q&A 태그 중 **출현 빈도 ≥5건**인 태그는 **전부 자동 페이지화**
- 현재 122개 페이지 자동 생성 (`/qa/tag/:tag`)
- Q&A 추가될수록 자동으로 페이지 증가 (수동 작업 0)
- 5건 미만 태그는 페이지화 금지 (thin content SEO 페널티 방지)
- 임계값 변경은 헌법 개정 필요 (제9조)

### ✅ 의무 5. 파트너 ref 전파 (불변 강령 3과 연동)
- Q&A 상세 페이지 / 카테고리 / 태그 페이지 내부 링크 전부 `withRef()` 거쳐서 렌더
- "관련 블로그", "관련 Q&A", "다른 카테고리" 등 모든 internal link 대상
- 외부 링크 (PubMed, NCBI 등)는 `withRef` 적용 안 함 (외부 사이트 오염 방지)

### ✅ 의무 6. 블로그 ↔ Q&A 양방향 internal linking
- 블로그 글 하단: "관련 Q&A 3개" 자동 표시 (태그 교집합 룰베이스)
- Q&A 답변 하단: "관련 블로그 3개" 자동 표시 (동일 룰)
- 매칭 규칙: 태그 1개 이상 일치 → 일치 수 내림차순 → views 내림차순
- 매칭 0건 시: 같은 카테고리 인기글 1개 fallback

### ✅ 의무 7. 사이트맵 + canonical 정합성
- 1,361 Q&A 개별 URL + 122 태그 페이지 + 12 카테고리 페이지 + 298 블로그 + 정적 = **약 1,800 URL**
- `generate_sitemap_rss.py` 단일 진입점 (자동 tagIndex 빌드 포함)
- 신규 Q&A 추가 → 빌드 시 자동 사이트맵 반영 → IndexNow 자동 제출

**E-E-A-T 강화 규칙 (2026-05-21 — 1등 플랫폼 통합 검증 보강)**:
1. **MedicalWebPage JSON-LD** `index.html` 정적 그래프에 포함 필수 (의료 YMYL 신호)
   - `audience: MedicalAudience(Patient, geographicArea KR)`
   - `specialty: MedicalSpecialty[]` (내과·내분비·종양·신경·영양)
   - `Organization.knowsAbout: [핵심 키워드 30개]`
2. **사이트 전역 내부링크 — 122 태그 페이지는 orphan 금지**:
   - Footer 에 인기 태그 12개 nav 강제 (모든 페이지에서 진입점 확보)
   - 카테고리 링크는 `/category/:slug` 정식 라우트만 사용 (canonical 정합성)
3. **태그 페이지 description ≥ 120자** (Google CTR 최적화):
   - `previewTags` (상위 4개 공동출현) 자동 노출 → 롱테일 키워드 매칭
   - 1글자 태그(폐/암/장 등)는 `${decodedTag} 건강` 으로 확장 (브랜드+질환 차별화)

**canonical-사이트맵 정합성 규칙 (2026-05-21 보강)**:
1. **사이트맵 URL = canonical URL** 이어야 함 (Google Search Console 경고 차단)
2. **쿼리스트링 기반 필터 URL** (`/qa?category=…`, `/blog?category=…`, `?q=…`, `?page=…`) 은:
   - 사이트맵에 **포함 금지**
   - 페이지 컴포넌트에서 **`noindex` 적용** (필터 활성화 시)
   - canonical 은 기본 경로(`/qa`, `/blog`)로 통일
3. **정식 정적 라우트 사용**:
   - Q&A 카테고리는 `/category/:slug` (12개)
   - Q&A 태그는 `/qa/tag/:tag` (122개, MIN_TAG_COUNT=5)
   - Blog 카테고리는 향후 `/blog/category/:slug` 라우트 신설 시 사이트맵 추가
4. **봇이 빈 SPA 셸을 보지 않도록 edge SEO 함수(`api/seo.js`)에서 다음 패턴 모두 처리**:
   - `pathname.startsWith('/q/')` → 개별 Q&A 메타
   - `pathname.startsWith('/qa/tag/')` → 태그 페이지 메타
   - `pathname.startsWith('/category/')` → 카테고리 페이지 메타
   - 누락 시 fallback 메타 → SEO 가치 0 → 절대 금지

### ✅ 의무 8. 안전성 일괄 검증 (forbidden words)
- 신규 Q&A 추가 시 (또는 기존 일괄 점검 시) 제4조 금지어 전수 스캔
- 위반 발견 시 **자동 치환 사전** 적용 가능:
  ```
  "치료한다"     → "관리에 도움 될 수 있습니다"
  "완치"         → "개선 사례가 보고됩니다"
  "예방한다"     → "예방에 도움이 될 수 있습니다"
  "효과가 있다"  → "도움이 될 수 있다고 보고됩니다"
  "약을 대신"    → "병원 치료와 병행할 수 있는 보조"
  "만병통치"     → "다방면 관리에 도움"
  ```
- 자동 치환 후 결과는 `tmp_seo_assets/qa_*/safety_scan.json`에 기록
- 단어 단순 치환으로 의미가 깨지면 사람 검토 → 수동 수정

### ✅ 의무 9. Q&A 작업 산출물 보관 (제6조와 연동)
- 모든 일괄 작업은 `tmp_seo_assets/qa_YYYY_MM/` 하위에 보관
- 스크립트 (`build_*.py`), 데이터 (`*_data.py`), 결과 (`*_results.json`), 안전성 (`safety_scan.json`)
- 작업 완료 후에도 보관 (회귀 발생 시 추적용)

### ✅ 의무 10. 발행 후 자동 검증 (제7조 확장)
```bash
# 8. Q&A 개별 페이지 200 응답 (샘플 10개)
for id in $(head -10 tmp_seo_assets/qa_2026_05/new_ids.txt); do
  slug=$(...)
  curl -s -o /dev/null -w "%{http_code}\n" "https://phlorotannin.com/qa/$slug"
done

# 9. 사이트맵에 신규 URL 포함
curl -s https://phlorotannin.com/sitemap.xml | grep -c "<loc>" # 1,495 이상

# 10. FAQPage JSON-LD 응답 본문 포함
curl -s https://phlorotannin.com/qa/<sample-slug> | grep -c "FAQPage" # ≥1

# 11. 태그 페이지 200 응답 (상위 5개 샘플)
for tag in 암 당뇨 감태추출물 수면 면역; do
  curl -s -o /dev/null -w "$tag %{http_code}\n" "https://phlorotannin.com/qa/tag/$tag"
done

# 12. 파트너 ref 전파 (이옥희 01055418595)
curl -s "https://phlorotannin.com/p/01055418595/qa" | grep -c "ref=01055418595" # >0
```

### 📊 Q&A 자산화 비용 가이드
| 작업 | LLM 토큰 | 시간 | ROI |
|---|---|---|---|
| 사이트맵 1,495 URL 추가 | **0** | 10분 | 1,495 SEO 자산 즉시 |
| FAQPage JSON-LD 주입 | **0** | 15분 | CTR 2~3배 (리치 스니펫) |
| 태그 페이지 122개 자동 생성 | **0** | 25분 | 122 주제 클러스터 |
| 블로그↔Q&A 양방향 링크 | **0** | 15분 | 체류시간·PV 증대 |
| forbidden words 일괄 스캔·치환 | **0** | 10분 | 의료법 리스크 0 |
| **합계** | **0** | **~75분** | **1,495 신규 SEO 페이지** |

---

## 📜 제9조 (헌법 개정)

이 헌법은 살아있는 문서다.

- **새로운 실수 발견 시**: 즉시 해당 조항 추가
- **금지어/금지 카테고리/금지 패턴 발견 시**: 제4조에 등록
- **새로운 중복 위치 발견 시**: 제2조 체크 3 표에 추가
- **개정 시**: 사용자에게 보고 → 승인 후 commit

---

## 📌 부록 A: 자주 쓰는 Supabase 환경값

```
URL:       https://rlfxuyeoluoeaxuujtly.supabase.co
ANON_KEY:  hanain/.env.local 의 VITE_SUPABASE_ANON_KEY
SERVICE:   사용자가 직접 제공 (코드/공개 폴더 저장 금지)

REST 헤더 (POST 시):
  apikey: <key>
  Authorization: Bearer <key>
  Content-Type: application/json
  Accept-Profile: public
  Content-Profile: public
  Prefer: return=representation
```

## 📌 부록 B: IndexNow 키

```
KEY:     6c13a351f7784b49b91e4da2717e6889
KEY_URL: https://phlorotannin.com/6c13a351f7784b49b91e4da2717e6889.txt
HOST:    phlorotannin.com

엔드포인트 4개:
  https://api.indexnow.org/indexnow
  https://www.bing.com/indexnow
  https://yandex.com/indexnow
  https://searchadvisor.naver.com/indexnow
```

---

**이 헌법을 읽었다면, 다음 작업 시작 전에 제2조 체크리스트 7가지를 반드시 통과시키세요.**
**한 번 더: 두 번 수정은 더 큰 낭비입니다.**
