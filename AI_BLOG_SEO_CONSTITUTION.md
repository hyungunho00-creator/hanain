# 🏛️ AI 블로그·SEO 작업 헌법 (Phlorotannin.com)

> **이 문서는 블로그 글쓰기·카테고리 추가·SEO 자산화 작업 전에 반드시 읽고 체크리스트를 통과해야 합니다.**
> 한 번 만든 실수를 반복하지 않기 위한 강제 절차입니다.
> **효율성이 최우선, 토큰은 부차적 고려사항이다.**

작성일: 2026-05-20
최종 개정: 2026-05-26 — 제17조 추가 (건강기능식품 소재 조합·비교 콘텐츠 안전 규칙)
작성 계기: 신규 블로그 카테고리 추가 시 Supabase `categories` 테이블 INSERT 누락 → BlogPage 탭에 표시 안 됨 + PostCard에 영문 slug 노출
2026-05-23 개정 계기: 토큰 절약 조항을 잘못 해석해 도구 호출을 잘게 쪼개고 불필요한 승인 확인을 반복 → 사용자 시간·토큰 모두 낭비 → 효율성 우선으로 재정의

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

## ⚡ 제5조 (효율성 최우선 — 2026-05-23 전면 개정)

**대원칙: 효율성 > 토큰 절약**

사용자 시간·신뢰가 토큰보다 비싸다. 토큰 걱정으로 작업을 잘게 쪼개거나 불필요한 확인을 받지 않는다.

### ✅ 효율성 강제 규칙 (반드시 지킬 것)

1. **사용자 의도가 명확하면 승인 없이 끝까지 실행**
   - 사용자가 "블로그 2개 만들자", "자산화하자" 같은 명확한 지시를 주면 → 작업 계획을 1회 보고하거나 곧장 실행하고, **중간 "이대로 진행할까요?" 같은 확인을 반복하지 않는다**
   - 작업 범위가 명확히 확장되는 경우(예: "PH-100도")만 1회 확인, 그 외는 무중단 실행

2. **도구 호출 병렬화 강제**
   - 독립적인 도구 호출(검색·크롤·파일 읽기·이미지 생성·업로드 등)은 **반드시 같은 메시지에서 병렬로** 호출
   - 의존성 없는 작업을 직렬로 호출하면 = 사용자 대기 시간 N배 = 헌법 위반

3. **작업을 큰 단위로 묶을 것**
   - 콘텐츠 작성 + INSERT + sitemap 재생성 + 검증을 한 스크립트 1회 실행으로 묶기
   - 폴더 생성, 단일 파일 ls 같은 자잘한 호출은 큰 작업과 병합

4. **사용자 "마무리해" 의도는 무중단 실행 신호**
   - 사용자가 "마무리 잘해", "끝까지 해", "완벽히 해" 같은 지시를 하면 → 추가 확인 없이 끝까지
   - 진행 보고는 최종 결과 1회로 충분 (중간 보고는 사용자가 명시적으로 요구할 때만)

5. **사용자 의도가 모호할 때만 1회 확인**
   - 모호한 지시(예: "좀 더 해줘")일 때만 1회 옵션 제시 + 즉시 실행

### ❌ 효율성 위반 — 절대 금지

- ❌ 잘게 쪼갠 도구 호출 (1메시지 1툴)
- ❌ "이대로 진행할까요?" 같은 불필요한 승인 반복
- ❌ 토큰 걱정으로 작업 중단·범위 축소
- ❌ 사용자가 명확히 지시했는데도 다시 확인

### ✅ 품질 유지는 그대로 (제1조와 동시 적용)

- 검증·출처 확인·DB 조회는 **여전히 필수** — 효율성이 "대충 빨리"를 의미하지 않음
- 다만 검증을 직렬로 늘어놓지 말고 **병렬로** 묶을 것

### 💡 효율성과 정확성 동시 달성 패턴

```
[1메시지] 병렬: DB 스키마 확인 + 출처 크롤 + 이미지 생성 (3개 동시)
[1메시지] 병렬: 콘텐츠 작성 + 검증 grep + INSERT 스크립트
[1메시지] INSERT 실행 + sitemap 재생성 + 검증 조회 (한 스크립트)
[1메시지] git add/commit/push + PR 생성
```
→ 4 메시지로 전체 워크플로우 완료. 절대 10+ 메시지로 늘리지 말 것.

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

## 🖼️ 제8조 (이미지·alt 의무) — 2026-05-20 신설 / 2026-05-26 강화

신규 블로그 글 발행 시 반드시 다음 의무를 충족한다. 위반 시 발행 차단.

### ✅ 의무 0. 이미지-본문 정합성 사전 판정

- `og_image`는 **그 글의 검색 의도·본문 주제·카테고리와 1:1로 대응**해야 한다.
- 기존 이미지의 임시 재사용, "나중에 바꾸기", 비슷해 보이는 범용 건강 이미지 사용은 발행 금지.
- 이미지 생성·업로드가 실패하면 글 발행을 멈춘다. 본문만 먼저 공개하지 않는다.
- 최종 반영 전 사람/AI가 반드시 육안 검수한다:
  - 이미지 안에 한글·영문·숫자·로고·워터마크가 없는가
  - 제목의 핵심 대상이 시각 요소로 보이는가
  - 같은 배치 안에서 구도·상징이 충분히 다른가
  - 의료·브랜드 오해를 부르는 실제 로고/상표/제품 패키지 모사가 없는가

### ✅ 의무 1. 글마다 다른 og_image 생성

- **동일 og_image를 두 개 이상 글에 재사용 절대 금지** (SEO 동일 이미지 페널티 / 사용자 신뢰 손상)
- **채택 모델**: `fal-ai/bytedance/seedream/v5/lite` (2026-05-20 파일럿 검증 후 확정)
  - **선정 근거**: z-image/turbo는 가장 저렴(~$0.003)하지만 토픽 명확성 5/10, seedream lite는 9/10. 단가 차이 $0.007/장 × 288장 = +$2.02로 미미한 비용 증가 대비 품질·일관성 우위 결정적
  - **변경 시**: 비용·품질 비교 + 3개 이상 파일럿 검증 후 헌법 개정 필요
- **결정론적 벡터/WebP fallback 허용 조건** (2026-05-26):
  - 이미지 생성 API 또는 모델 접근이 불안정할 때만 허용.
  - PIL/SVG/Canvas 등 코드 기반으로 직접 그리되, 출력은 반드시 `1200x630` WebP.
  - 위 의무 0의 육안 검수와 아래 자동 검증을 통과해야 한다.
  - fallback 사용 사실과 생성 스크립트를 `tmp_seo_assets/<batch>/README.md`에 남긴다.
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
- **서버 메타 의무** (2026-05-26):
  - `api/seo.js`의 `/blog/:slug` 메타 조회는 `og_image`, `category`를 함께 가져와야 한다.
  - `og:image`, `og:image:secure_url`, `og:image:alt`, `twitter:image`, `twitter:image:alt`, `og:image:type`이 실제 글 이미지와 일치해야 한다.
  - WebP 이미지면 `og:image:type`은 `image/webp`여야 한다.
  - 클라이언트 `SEOHead` 호출부도 `ogImageAlt={buildImageAlt(post)}`를 넘겨야 한다.

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

# 8. Googlebot 첫 HTML이 글별 og:image / og:image:alt / image type을 받는지
curl -sI -A "Googlebot/2.1" "https://phlorotannin.com/blog/<slug>" \
  | grep -i "x-og-image\|x-seo-path"
curl -s -A "Googlebot/2.1" "https://phlorotannin.com/blog/<slug>" \
  | grep -E "og:image|og:image:alt|og:image:type|twitter:image"
```

위 8가지 중 하나라도 실패 → **즉시 hotfix**.

### ✅ 의무 4. 자동화 (인간 개입 최소화)

- `tmp_seo_assets/cancer_care_batch{1,2,3}/common_modules.py` 및 향후 모든 배치 발행 스크립트에 **이미지 생성 + Storage 업로드 + og_image PATCH** 로직을 표준 함수로 포함
- 신규 글 발행 함수 시그니처: `publish_post(title, category, content, ...) → 내부에서 자동으로 이미지 생성 → og_image 채워서 INSERT`
- 사람이 "이미지 잊었네" 할 수 없도록 **이미지 없이 발행 시 함수 자체가 에러 발생**
- Storage 업로드 스크립트는 `SUPABASE_SERVICE_ROLE_KEY` 또는 `SUPABASE_SERVICE_KEY` 환경변수만 사용한다.
- service_role 키를 파이썬/자바스크립트/마크다운/JSON 파일에 직접 적으면 즉시 보안 hotfix 대상이다. 발견 즉시 보고하고 키 rotation을 권고한다.

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

### ✅ 의무 7-B. 콘텐츠 자산화 4종 (2026-05-21 — "부족한 컨텐츠 채우기" 단계)

YMYL 의료 콘텐츠의 신뢰도 및 페이지랭크 흐름을 강화하기 위해 다음 4종 자산화를 **불변 의무**로 한다:

**(1) 브랜드 태그 규칙 기반 부착 — `scripts/build_qa_brand_tags.py`**
- 12개 BRAND_RULES (플로로탄닌, 감태, 항산화, 디에콜, 에콜, 폴리페놀, 항염증, 해양폴리페놀, 갈조류, 후코이단, 감태추출물, 씨놀) 정규식 매칭
- 멱등성 보장 — 기존 태그 보존, 누락분만 추가
- 백업 자동 생성 (`tmp_seo_assets/qa_*/qa.brand_tags_backup.<ts>.json`)
- **재발 방지**: Q&A 일괄 추가 후 반드시 이 스크립트 실행 → tagIndex.json 재생성

**(2) E-E-A-T 메타데이터 필드 5종 — `scripts/add_qa_eeat_fields.py` + `scripts/refine_qa_authors.py`**
- 모든 Q&A에 `author` / `content_type` / `reviewed_at` / `disclaimer` / `source_type` 필드 부착
- **정직 원칙**: 의사명을 날조하지 않음 — "편집팀" + 명확한 disclaimer 사용
- **author 카테고리별 세분화 (2단계)**: 13개 분과 편집데스크명 (예: "플로로탄닌 정보센터 · 심혈관 편집데스크")로 차별화
  - 실존 의사명 날조 금지, 단 편집부서 명시는 조직 구조로서 허용
  - 모든 데스크는 동일한 disclaimer 유지
  - `refine_qa_authors.py` 멱등 — 이미 데스크명 적용된 Q&A는 건너뜀, 커스텀 author 는 보존
- Schema.org `QAPage.mainEntity.dateModified` 및 `acceptedAnswer.author`가 이 필드를 활용
- og:image:alt 카테고리별 차별화 — SEOHead `ogImageAlt` prop (CategoryPage/QuestionDetail/QATagPage)

**(3) 허브 페이지 → Q&A 동선 (RelatedQA 임베드)**
- `/learn`, `/phlorotannin`, `/easy` 3개 권위 허브에 `<RelatedQA blogTags={...} max={6} />` 임베드 **필수**
- 페이지랭크가 Q&A 1,361건 + 태그 페이지 131개로 흐르도록 함
- CTA·저작권 영역(DO_NOT_TOUCH §3-Q)은 절대 건드리지 않음 — 그 직전에 삽입

**(4) 카테고리별 OG 이미지 13장 — `scripts/build_og_images.py`**
- 13개 Q&A 카테고리별 정적 PNG (1200×630, ~35KB)
- 출력: `public/og/qa-<slug>.png` (slug는 Footer CAT_ID_TO_SLUG와 1:1 매칭)
- `CategoryPage`, `QuestionDetailPage`, `QATagPage`의 `<SEOHead ogImage>`에 자동 주입
- 폰트: NanumSquareRoundB (한글 가독성) — 시스템 폰트 변경 시 스크립트 폰트 경로 검토

**(5) 봇 메타 차별화 — `api/seo.js` 서버 사이드 주입 (2026-05-21 D3 보강)**

클라이언트 JS 렌더링 전(=구글봇 첫 fetch 시점)에도 카테고리별 OG 가 정확히 전달되도록 다음 5종을 **불변 의무**로 한다:

- **루트 `vercel.json` 명시적 rewrites 필수**: `/q/:slug`, `/qa/tag/:tag`, `/category/:slug`, `/glossary` 등 **모든 Q&A SEO 자산 경로는 catch-all 이전에 명시적 rewrite 등록 필수**
  - 누락 시 catch-all `/((?!api/|og/|assets/).*)` 에 걸려 `p=/` 로 들어가 홈 메타가 응답됨 = 1,361 Q&A + 131 태그 페이지 봇 메타 전부 홈으로 회귀
  - catch-all 의 제외 패턴은 `api/`, `og/`, `assets/` 3종 필수 (OG 이미지가 HTML 응답으로 변환되는 사고 방지)
- **`staticMetaFor()` 반환값에 `ogImage`/`ogImageAlt` 필드 포함**: `/category/:slug`, `/q/:slug`, `/qa/tag/:tag` 핸들러는 카테고리 OG 슬러그를 결정해서 메타 객체에 포함시켜야 한다.
- **`injectMeta()` 의 5종 정규식 치환 필수**: `og:image` / `og:image:secure_url` / `og:image:alt` / `twitter:image` / `twitter:image:alt` — 누락 시 봇은 라우트와 무관하게 기본 `/og-image.png` 만 본다.
- **`CAT_OG_SLUG` (api/seo.js) ↔ `CAT_OG_SLUG` (QuestionDetailPage.jsx) ↔ `CAT_ID_TO_SLUG` (Footer) 3축 동기화**: snake_case 카테고리 ID → dash-case OG 슬러그 매핑은 세 곳에서 동일해야 한다.
- **진단 헤더 `X-OG-Image` 출력 의무**: handler() 응답 헤더에 실제 적용된 OG URL을 노출 — 회귀 추적용.

**검증 명령** (배포 후 필수):
```bash
# 카테고리별 OG 차별화 확인 — x-og-image 헤더 값이 카테고리별로 달라야 PASS
for slug in cardiovascular metabolism cancer_immune skin_hair; do
  echo "=== /category/$slug ==="
  curl -sI -A "Googlebot/2.1" "https://phlorotannin.com/category/$slug" | grep -i "x-og-image\|x-seo-path"
done

# /qa/tag/, /q/ 도 x-seo-path 가 / 가 아닌 실제 경로여야 PASS
curl -sI -A "Googlebot/2.1" "https://phlorotannin.com/qa/tag/플로로탄닌" | grep -i "x-seo-path"
```

**(6) 컬렉션·허브 페이지 JSON-LD 자산화 (2026-05-21 D6 보강 — "자산화 부족분 보완" 단계)**

CategoryPage 및 LearnPage/EasyHealthPage/PhlorotanninPage/GlossaryPage 등 **컬렉션·허브 페이지는 BreadcrumbList 를 반드시 출력해야 한다**. 검색엔진/AI 가 사이트 위계(hierarchy) 와 토픽 클러스터를 정확히 인식할 수 있게 하기 위함이다.

- **모든 비-종단 페이지 BreadcrumbList 의무**: `홈 → {허브명} → {세부}` 3단 이상 명확화
  - 적용 페이지: `/category/:slug`, `/learn`, `/easy`, `/phlorotannin`, `/glossary`, `/qa/tag/:tag` (`/qa`, `/blog` 는 자체 ItemList/CollectionPage 가 이를 대체)
  - `@id` 명명 규칙: `${pageUrl}#breadcrumb` — JSON-LD 그래프 참조용
- **카테고리 페이지 (`/category/:slug`) 3종 JSON-LD 의무**: BreadcrumbList + CollectionPage + ItemList
  - `CollectionPage.breadcrumb` 가 `#breadcrumb` 를 `@id` 참조
  - `CollectionPage.mainEntity` 가 `#itemlist` 를 `@id` 참조
  - `ItemList.itemListElement` 는 인기순 상위 10개 Q&A — `position`/`url`/`name` 3종 필수
  - 데이터 미로드 시 ItemList 는 제외 (빈 ItemList 송신 금지)
- **학습/허브 페이지 시맨틱 타입 의무**:
  - `/learn` → `LearningResource` (audience: 일반 성인 학습자, learningResourceType: Guide)
  - `/easy` → `MedicalWebPage` (audience: MedicalAudience/Patient, specialty: Nutrition + Internal Medicine)
  - `/phlorotannin` → `MedicalWebPage` (기존 유지)
  - `/glossary` → `DefinedTermSet` (기존) + BreadcrumbList (신규)
- **qa.json fallback 의무 (컬렉션 페이지)**: CategoryPage 는 Supabase 응답 실패/빈배열 시 반드시 `/qa.json` 으로 fallback 해야 한다. Supabase 장애 시에도 컨텐츠 표시 + JSON-LD 송신이 끊기지 않도록 함.
  - 패턴: `ensureQaFallback()` + `getFallbackCategory()` + `getFallbackQuestions()` + `getFallbackPopular()` 4종 — `QuestionDetailPage.jsx` 사이드바 fix 패턴과 동일 구조
  - skin / hair / skin_hair 3축 분리 대응: Supabase 는 `skin_hair` (100건 통합), qa.json 은 `skin` (113건) + `hair` (37건) — `ID_TO_PRIMARY_SLUG` 매핑으로 canonical URL 일관성 확보
- **사이트맵 정합성**: `generate_sitemap_rss.py` 의 `CATEGORY_SLUGS` 는 라우팅 가능한 모든 슬러그를 포함해야 함 — 현재 14개 (`metabolism`, `cancer-immune`, `digestive`, `cardiovascular`, `neuro-cognitive`, `mental-health`, `musculoskeletal`, `skin-hair`, `skin`, `hair`, `respiratory`, `infection-inflammation`, `womens-health`, `mens-health`)
- **sitemap 단일 진실원**: `api/sitemap.js` 는 `readStaticFallback()` (= `public/sitemap.xml` = `generate_sitemap_rss.py` 산출물) 을 **무조건 우선 응답**한다.
  - 동적 빌드는 정적 파일 부재 시에만 비상 fallback 으로 사용
  - 동적 빌드는 `/qa?category=` 쿼리스트링 URL 생성 + Q&A 1,361 + 태그 131 누락 → 자산화 73% 손실 위험
  - 응답 헤더 `X-Sitemap-Source: static-primary` 필수 + `X-Sitemap-Loc-Count` 로 URL 개수 진단

**검증 명령** (배포 후 필수):
```bash
# 카테고리 페이지 JSON-LD 3종 존재 확인
for slug in metabolism skin hair skin-hair cancer-immune; do
  echo "=== /category/$slug ==="
  curl -s -A "Googlebot/2.1" "https://phlorotannin.com/category/$slug" \
    | grep -oE '"@type":"(BreadcrumbList|CollectionPage|ItemList|LearningResource|MedicalWebPage|DefinedTermSet)"' | sort -u
done

# 허브 페이지 BreadcrumbList 의무 확인
for path in /learn /easy /phlorotannin /glossary; do
  echo "=== $path ==="
  curl -s -A "Googlebot/2.1" "https://phlorotannin.com$path" | grep -c "BreadcrumbList"
done

# sitemap 단일 진실원 응답 확인 — static-primary + 1,800+ URLs PASS
curl -sI "https://phlorotannin.com/sitemap.xml" | grep -iE "x-sitemap-source|x-sitemap-loc-count"
# 기대: x-sitemap-source: static-primary, x-sitemap-loc-count: 1814 (또는 그 이상)
```

**(7) SSR JSON-LD 주입 의무 — `api/seo.js` 서버 사이드 (2026-05-21 D7 보강 — "검색엔진 관점 신뢰 회복" 단계)**

**근본 원인 발견**: D6 단계에서 React Helmet 으로 추가한 JSON-LD 는 모두 **CSR(클라이언트 사이드 렌더링)** 이므로 검색엔진 봇이 **첫 fetch 시점에 받는 HTML 에는 존재하지 않는다**. 1,361 Q&A·14 카테고리·4 허브 페이지의 모든 컬렉션·시맨틱 JSON-LD 가 봇 시각으로 *불가시* 상태였음. 이는 SEO 자산화의 본질을 무력화시킨다.

이를 방지하기 위해 다음을 **불변 의무**로 한다:

- **카테고리/허브/태그 페이지의 JSON-LD 는 반드시 `api/seo.js` 에서 서버 사이드 주입한다**.
  - 라우트별 빌더 함수 필수:
    - `buildCategoryJsonLd(pathname, name)` → `[BreadcrumbList, CollectionPage]`
    - `buildLearnJsonLd()` → `[BreadcrumbList, LearningResource]`
    - `buildEasyJsonLd()` → `[BreadcrumbList, MedicalWebPage(MedicalAudience/Patient)]`
    - `buildPhlorotanninJsonLd()` → `[BreadcrumbList, MedicalWebPage]`
    - `buildGlossaryJsonLd()` → `[BreadcrumbList]` (DefinedTermSet 은 글로벌 graph 중복 회피)
    - `buildTagJsonLd(pathname, tag)` → `[BreadcrumbList]`
  - `buildJsonLdForPath(pathname)` 디스패처가 URL 패턴별로 올바른 빌더를 호출한다.
- **핸들러 흐름 의무**: `injectMeta(indexHtml, meta)` 직후 `injectJsonLd(html, extraLdArray)` 를 호출하여 `</head>` 앞에 추가 JSON-LD 를 주입한다.
- **진단 헤더 필수**: 응답 헤더에 다음 2종을 출력하여 회귀 추적을 가능케 한다.
  - `X-Extra-JsonLd: yes:N` / `no` / `error:<message>`
  - `X-Extra-JsonLd-Count: N`
- **안전 스위치**: 환경변수 `JSONLD_DISABLED=1` 로 비상시 비활성화 가능 (수동 롤백 없이도 차단할 수 있어야 한다).
- **URL slug ↔ 카테고리 ID 매핑 단일화**: `URL_SLUG_TO_CAT_ID` (api/seo.js) 가 `metabolism`, `cancer-immune`, `digestive`, `cardiovascular`, `neuro-cognitive`, `mental-health`, `musculoskeletal`, `skin-hair`, `skin-hair-care`, `skin`, `hair`, `respiratory`, `infection-inflammation`, `womens-health`, `mens-health` 15개 키를 모두 포함해야 함.
- **`CATEGORY_NAMES` dash-case 키 의무**: URL 슬러그가 dash-case(예: `cancer-immune`, `mental-health`)인 경우 `CATEGORY_NAMES` 도 dash-case 키로 카테고리명을 제공해야 함. snake_case 만 등록되어 있으면 SSR 메타에 카테고리명이 빠진다.
- **JSON.parse 무결성**: 주입되는 모든 JSON-LD 는 빌드 시점에 직렬화되어 `JSON.parse()` 가 통과해야 한다 (제어문자 0x00–0x1F 제거, 따옴표 escape 보장).

**클라이언트 사이드(React Helmet) JSON-LD 는 보조 신호로만 허용**: 봇 시각에서는 SSR 주입분이 권위 신호이고, Helmet 주입분은 사용자 인터랙션 직후의 보충 신호다. **검색엔진 자산화의 1차 근거는 항상 `curl -A "Googlebot/2.1" {url}` 의 응답 HTML 이다**.

**검증 명령** (배포 후 필수):
```bash
# 14 카테고리 SSR JSON-LD 주입 확인 — X-Extra-JsonLd: yes:2 + types 에 CollectionPage 포함 PASS
for slug in cardiovascular metabolism cancer-immune skin-hair skin hair mental-health; do
  echo "=== /category/$slug ==="
  curl -sI -A "Googlebot/2.1" "https://phlorotannin.com/category/$slug" | grep -i "x-extra-jsonld"
  curl -s  -A "Googlebot/2.1" "https://phlorotannin.com/category/$slug" \
    | grep -oE '"@type":"(BreadcrumbList|CollectionPage|LearningResource|MedicalWebPage)"' | sort -u
done

# 허브 4 페이지 JSON-LD 주입 확인
for path in /learn /easy /phlorotannin /glossary; do
  echo "=== $path ==="
  curl -sI -A "Googlebot/2.1" "https://phlorotannin.com$path" | grep -i "x-extra-jsonld"
done

# Yeti(네이버) UA 도 동일하게 응답하는지 확인
curl -sI -A "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)" \
  "https://phlorotannin.com/category/cardiovascular" | grep -i "x-extra-jsonld"
```

**위반 시 영향**: 컬렉션·허브·태그 페이지의 모든 SEO 자산이 봇 가시성 0이 됨 → 페이지랭크가 글로벌 graph 1개에만 묶임 → 토픽 클러스터·계층 구조가 검색엔진에 전달되지 않음 → 자산화 효과 73%+ 손실.

**(8) Q&A 본체(/q/:slug) SSR 자산화 (2026-05-21 D8 — 사용자 발견 잔존 누락 영역)**

D7 검증 직후 사용자 지적: *"잉? 글로벌만? 이건모야? 다 자산화도 마무리한거 아니야?"* 자산화의 **본체인 1,361개 Q&A 페이지**가 봇 첫 fetch 시점에 **글로벌 메타·JSON-LD 만** 송신하고 있었음. og:image 는 전부 `qa-default.png`, JSON-LD 에 QAPage 부재, BreadcrumbList 부재 — D6의 OG 13장과 D7의 SSR 인프라가 본체 페이지에서는 무용지물이었던 상태.

다음을 **불변 의무**로 한다:

- **`api/seo.js` 가 `qa.json` 진실원을 콜드스타트 시 메모리 인덱스화한다**.
  - `readQaJson()` — 4 경로 후보 (`public/qa.json`, `qa.json`, `hanain/dist/qa.json`, `hanain/public/qa.json`) 탐색 + 캐시
  - `qaSlug(question)` — 헌법 §3-Q 동결된 슬러그 규칙(`/[^\w\s가-힣]/g` 제거 → `/\s+/g` → `'-'` → `slice(0,60)`) 정확히 재현
  - `getQaIndex()` — 1,361건 슬러그→Question 메모리 Map
  - `findQuestionBySlug(rawSlug)` — 원본+`decodeURIComponent` 양방향 매칭
- **`/q/:slug` 핸들러는 매칭된 Q&A 로부터 정확한 메타를 송신한다**.
  - title: `{질문} | {카테고리명} — 플로로탄닌·감태추출물 건강정보`
  - desc: 답변 첫 158자 (한글 가독성 우선)
  - ogImage: `ogImageForCategory(catId)` — 카테고리별 13종 OG 차별화
  - 미매칭 시 안전 fallback (default OG + 슬러그 기반 readable title)
- **`buildQuestionJsonLd(pathname, q)` SSR 빌더 필수**.
  - 반환: `[BreadcrumbList, QAPage]`
  - BreadcrumbList: 홈 → 건강 Q&A → 카테고리 → 질문 (4단)
  - QAPage.mainEntity: Question with acceptedAnswer (답변+author+reviewed_at)
  - 답변 텍스트 `0x00–0x1F` 제어문자 제거 (헤더 ASCII 사고 방지)
- **`buildJsonLdForPath()` 디스패처에 `/q/:slug` 분기 필수**.

**검증 명령** (배포 후 필수):
```bash
# 1,361개 중 무작위 5개 — QAPage + 카테고리 OG 차별화 동시 검증
for slug in '고혈압약을-평생-먹어야-하나요' \
            '당뇨약을-10년-넘게-복용-중인데-혈당이-계속-높은-이유가-무엇인가요' \
            '여드름이-계속-나는데-어떤-식이-관리가-효과적인가요' \
            '탈모의-원인이-정말-유전인가요-아니면-다른-요인도-있나요' \
            '알츠하이머병과-혈관성-치매의-차이는-무엇인가요'; do
  url="https://phlorotannin.com/q/$(python3 -c "from urllib.parse import quote; print(quote('$slug'))")"
  echo "=== $slug ==="
  curl -sI -A "Googlebot/2.1" "$url" | grep -i "x-extra-jsonld\|x-og-image"
  curl -s  -A "Googlebot/2.1" "$url" | grep -oE '"@type":"QAPage"|"@type":"BreadcrumbList"' | sort -u
done
```

기대 결과: 모든 URL 에서 `x-extra-jsonld: yes:2` + `QAPage`/`BreadcrumbList` 동시 검출 + og:image 가 카테고리별 PNG 로 차별화.

**위반 시 영향**: Google Q&A 리치 결과 자격 상실, 1,361 URL의 SNS 공유 OG 가 단일 이미지로 노출, 사이트 위계 신호 부재 → 자산화 본체의 색인 신뢰도 50%+ 손실.

**(9) 3차 검증(D9) — vercel.json 라우팅 + Article datePublished + 작성/관리 라우트 (2026-05-21 D9 — 사용자 발견 3중 잔존 누락)**

D8 직후 사용자 지적: *"다시한번더 검증해"*. 검색엔진 봇 시각으로 1,814 sitemap URL + sitemap 외 라우트까지 전수 검증한 결과 **3개의 숨은 결함**을 동시에 발견:

**D9-GAP-1 — /blog/:slug × 110개 Article datePublished 누락 (36.9%)**
- 원인: Supabase `posts.published_at` 컬럼 NULL인 글이 110/298건
- 영향: Google Rich Results Article 자격 박탈 → 풍부한 검색결과 노출 손실
- 다음을 **불변 의무**로 한다:
  - `fetchPostBody()` SELECT 쿼리에 `created_at` 포함
  - `publishedAt = p.published_at || p.updated_at || p.created_at` 안전 체인
  - `dateModified = p.updated_at || p.created_at` 안전 체인
  - 데이터 본체 변경 금지(읽기 전용 보강)

**D9-GAP-2/3 — sitemap 외 라우트 vercel.json catch-all 자기상충**
- 원인: `vercel.json` 마지막 catch-all `{ source:'/((?!api/|og/|assets/).*)', destination:'/api/seo?p=/' }` 가 명시되지 않은 모든 경로(`/inforoom`, `/community/post/:postId`, `/admin` 등)를 `?p=/`로 흡수 → 핸들러가 항상 홈을 받고, canonical은 자기 자신 가리키지 않음
- 영향: 사용자 진입 가능 URL에서 홈 title/desc 누출 + canonical 자기상충 → 중복 색인 위험
- 다음을 **불변 의무**로 한다:
  - `vercel.json rewrites`에 누락 라우트를 명시 추가: `/inforoom`, `/p/:phone/inforoom`, `/community/post/:postId`, `/community/write`, `/community/edit/:postId`, `/question/write`, `/admin`
  - **봇 UA 전용 catch-all**: 명시 라우트 외 모든 경로에서 User-Agent가 검색/AI 봇(googlebot, yeti, bingbot, chatgpt-user, gptbot, claudebot, perplexitybot, oai-searchbot, applebot, ccbot, anthropic-ai, gemini, bytespider, amazonbot, facebookexternalhit, twitterbot, slackbot 등 22종)인 경우 실제 path를 그대로 핸들러에 전달 (`destination:'/api/seo?p=/:path*'`) — 미래 라우트 자동 자산화
  - 사용자 트래픽 catch-all은 그대로 유지 (SPA shell 호환)
  - `api/seo.js` `staticMetaFor()` 에 각 라우트별 분기 + 작성/관리 페이지는 `robots: 'noindex,nofollow'`, 정보실 페이지는 `robots: 'noindex,follow'` 명시
  - `injectMeta()` 에 `meta.robots` 갱신 블록 — set된 경우에만 갱신, 그 외 index.html 기본값(`index, follow ...`) 유지

**검증 명령** (배포 후 필수):
```bash
# datePublished fallback 동작 확인
curl -sA "Googlebot/2.1" "https://phlorotannin.com/blog/tamoxifen-side-effects-management-2026" \
  | grep -oE '"datePublished":"[^"]+"' | head -1

# x-seo-path가 실제 경로를 받는지 (catch-all 자기상충 회귀 방지)
for p in /inforoom /community/post/test /admin /question/write; do
  curl -sIA "Googlebot/2.1" "https://phlorotannin.com$p" | grep -i "x-seo-path"
done

# noindex robots 노출 확인 (작성/관리 페이지)
curl -sA "Googlebot/2.1" "https://phlorotannin.com/admin" \
  | grep -oE '<meta name="robots" content="[^"]+"'
```

기대 결과:
- 110개 NULL 글 모두 `datePublished` 가 ISO 8601 datetime 값 (updated_at fallback)
- 각 라우트의 `x-seo-path` 헤더가 정확한 자기 경로 ( `/` 가 아닌 `/inforoom` 등)
- `/admin`, `/question/write`, `/community/write` → `noindex,nofollow`
- `/inforoom`, `/community/post/:postId` → `noindex,follow`

**위반 시 영향**: Google Rich Results Article 자격 110개 글 박탈, 사용자 진입 시 홈 title 노출 + canonical 자기상충 → 중복 색인 페널티 위험. 미래 라우트 추가 시 자동 자산화 불가 → 매번 vercel.json 수동 갱신 필요(헌법 7-B 확장성 정신 위배).

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

## 제11조 (블로그 본문 풋터 통일 표준) — 2026-05-23 신설 / 2026-05-23 1차 개정

### 신설 계기
신규 발행한 3건(id=302/303/304)이 기존 리서치 글의 신뢰 풋터(시리즈 링크 + 참고 문헌 데이터베이스 박스)를 빠뜨려 디자인 일관성·E-E-A-T 신호가 깨짐. 사용자가 스크린샷으로 직접 지적.

### 1차 개정 계기 (같은 날)
제11조 1차 작성 시 풋터 박스 헤딩에 `📖` 이모지, 검토 배지 설명에 `🛡️` 이모지를 명시 → **헌법 안에서 시니어 의학저널 디자인 원칙을 직접 위반**. 본문 3건에도 `📚 / 📌 / ✅ / ❌ / 🇺🇸 / 🇰🇷 / 🇪🇺 / ⚠️` 이모지가 산재되어 의약 정보 블로그가 아닌 마케팅 카드처럼 보임. 즉시 전면 개정.

### 11-0. 시니어 디자인 원칙 (모든 블로그 본문의 source of truth — 2026-05-21 의학저널 톤)

**원칙 1: 본문에 이모지·이모티콘·이모지형 픽토그램 사용 절대 금지**
- 금지 목록(grep 차단 대상):
  - 책/도서: `📚 📖 📕 📗 📘 📙 📓 📔 📑 📒`
  - 체크/표시: `✅ ❌ ⚠️ ⚡ ✔️ ✖️ ☑️ ⭕ 🔴 🟢 🟡 🔵`
  - 손 모양·신체: `👉 👇 👆 👍 👎 ✋ 🙌 🙏`
  - 화살표 이모지(`▶️ ⬅️ ➡️ ⬆️ ⬇️ 🔼 🔽`) — 단순 텍스트 `→ ← ↑ ↓ ▶ ◀` 는 허용
  - 핀/별/하이라이트: `📌 📍 ⭐ 🌟 ✨ 💡 🔔 🔥 💯`
  - 방패/보안: `🛡️ 🛡 🔒 🔓 🔑`
  - 국기 전체: `🇺🇸 🇰🇷 🇪🇺 🇯🇵 🇨🇳 🇬🇧 🇩🇪 🇫🇷 🇨🇦 🇦🇺` 등 모든 ISO 국기
  - 의료 이모지: `💊 💉 🩺 🏥 🧬 🦠`
- 표현 대체:
  - `📚 본 글은 …` → `본 글은 …` (제거)
  - `🇺🇸 미국 FDA` → `미국 FDA` (국가명 텍스트만)
  - `✅ NDI는 …` → 텍스트 강조 또는 단순 ▶ 사용
  - `❌ … 사실이 아님` → `(주의)` 또는 `※` 사용
  - `📌 관련글` → 일반 `<li>`
  - `📖 참고 문헌 데이터베이스` → `참고 문헌 데이터베이스` (이모지 없음)

**원칙 2: 본문(`<article>` 안)에 다크 배경 박스 직접 금지**
- 다크 네이비(`#0B1A2E`, `#0b1a2e`, `bg-[#0B1A2E]`, `bg-slate-900`, `bg-gray-900` 등)는 **페이지 컴포넌트(`BlogPostPage.jsx`)가 자동 렌더링하는 검토 배지 1곳에서만** 사용
- 본문 마크다운/HTML에서 직접 다크 박스를 만들면 안 됨
- 인증 타임라인 등은 마크다운 표(`|`) 또는 회색 톤 코드블록(`<pre>`)이 아닌, 일반 `<table>` 또는 정의 리스트(`<dl>`)로 작성
  - 코드 블록(`)으로 감싸면 BlogPostPage가 다크 처리하므로 텍스트 정보는 코드 블록 사용 금지
- 허용 박스 색상 팔레트:
  - 안전 안내(노란 톤): `background:#fef3c7; border-left:4px solid #f59e0b; color:#78350f` (수치 변경 금지)
  - 참고 문헌 박스(중성 회색): `background:#f8fafc; border:1px solid #e2e8f0; color:#64748b`
  - 인용/포인트 박스(연한 청록): `background:#ecfeff; border-left:3px solid #06b6d4; color:#155e75`

**원칙 3: 섹션 번호·헤딩 톤**
- `## 1. 제목` 식 인라인 숫자 번호 허용 (의학저널 표준), 단 이모지 결합 금지
- 강조는 `<strong>`, 인용은 `<blockquote>` — 글로벌 디자인 토큰 유지

**원칙 4: 헌법 자체도 이 원칙을 따른다**
- 헌법 문서 안에서 새 표준을 설명할 때 예시 코드에 이모지를 포함시키지 말 것 (실수 재발 방지)
- 헌법 헤딩에 한정해 식별용 이모지(`🚨 🛑 ⚡ 📋 🗂 🧪 🖼 ❓ 📜 📌`)는 허용 — 본문 블로그 글 표준과는 분리
- 단, 블로그 글의 풋터·배지·본문 어디에도 이모지가 들어가서는 안 됨

### 11-1. 풋터 3구성요소 (모든 research/health/efficacy 카테고리 블로그 글에 의무)

**(1) 본문 끝 시리즈 링크 — 텍스트만**
- 글 주제별 관련 시리즈 3~4개를 본문 최하단에 명시 (이모지 없음)
- 최소 포함 링크 2개 (앵커 텍스트는 한글 자연어):
  - `<a href="/blog?category=research">연구 동향 카테고리 전체 보기</a>`
  - `<a href="/easy">쉬운 건강정보로 보기</a>`
- 마크업: 일반 `<ul><li>` 또는 마크다운 `-` (핀·별·체크 픽토그램 금지)

**(2) 참고 문헌 데이터베이스 박스 (의무 HTML)**

```html
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'phlorotannin', 'dieckol', 'Ecklonia cava', 'eckol' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·뇌과학·약리 분야 종설 다수<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.
</div>
```

- 키워드 부분(`'phlorotannin', 'dieckol'…`)은 글 주제에 맞춰 조정 가능
- 헤딩에 이모지 절대 금지 (`📖` ❌ → `참고 문헌 데이터베이스` ✅)
- 박스 색상·테두리 수치 변경 금지 (시니어 회색 톤)
- 마커 주석 의무: `<!-- TRUST_FOOTER_V2 -->` (V1은 이모지 포함이라 폐기, V2부터 클린)

**(3) 검토 배지 ("리서치팀 검토 · 출처 검증 완료")**
- 본문에 직접 작성 금지 — `BlogPostPage.jsx`(413~445라인)가 모든 글 하단에 자동 렌더링
- 본문 마크다운에 `🛡️` 이모지나 "리서치팀 검토" 텍스트를 직접 쓰면 중복 표시되므로 금지
- 검토 배지의 다크 네이비 배경은 페이지 컴포넌트 한 곳만 사용 — 본문 박스를 다크로 만들지 말 것 (원칙 2 참조)

### 11-2. 발행 전 풋터·디자인 체크 5+2단계 (grep 자동화)

> **2026-05-23 추가 (사용자 스크린샷 'X' 보고로 신설)**: nested HTML comment(`<!-- <!-- X --> -->`)는
> markdown 파서가 첫 짝만 닫고 남은 `-->`를 본문 텍스트로 노출시킴. 발행 전 반드시 grep.

```bash
# (0) nested comment grep — 0건이어야 함 (markdown 파서 깨짐 방지)
python3 -c "
import re, sys
c = open(sys.argv[1]).read()
nested = re.findall(r'<!--\s*<!--', c)
lone = re.findall(r'^\s*-->\s*\$', c, re.M)
print('NESTED:', len(nested), 'LONE_ARROW:', len(lone))
" content.txt

# (1) 이모지 grep — 0건이어야 함
python3 -c "
import re, sys
с = open(sys.argv[1]).read()
banned = ['📚','📖','📕','📗','📘','📙','✅','❌','⚠️','📌','📍','⭐','🌟','💡','🛡️','🛡',
          '🇺🇸','🇰🇷','🇪🇺','🇯🇵','🇨🇳','🇬🇧','💊','💉','🩺','🏥','🧬',
          '👉','👇','👆','👍','🔔','🔥']
hits = [(e, с.count(e)) for e in banned if с.count(e) > 0]
print('VIOLATIONS:', hits if hits else 'NONE')
" content.txt

# (2) 다크 박스 grep — 본문엔 0건이어야 함
grep -E "background:?\s*#0[bB]1[aA]2[eE]|bg-\[#0[bB]1[aA]2[eE]\]|bg-slate-900|bg-gray-900" content.txt

# (3) 시리즈 링크 존재
grep -o "연구 동향 카테고리 전체 보기\|쉬운 건강정보로 보기" content.txt

# (4) TRUST_FOOTER_V2 마커
grep -o "TRUST_FOOTER_V2" content.txt

# (5) 참고 문헌 박스 4개 DB 링크
grep -oE "pubmed.ncbi|ncbi.nlm.nih.gov/pmc|frontiersin.org|sciencedirect.com" content.txt | sort -u | wc -l   # → 4
```

### 11-3. 기존 글 마이그레이션 규칙
- 위반 글 발견 시 즉시 PATCH (slug 기준 `?slug=eq.<slug>`)
- 처리 순서: (a) 이모지/국기/⚠️ 제거 → (b) 다크 박스 → 회색 박스 또는 일반 표로 다운그레이드 → (c) V1 풋터 → V2 풋터 교체
- V1 마커가 있는 경우 V1 블록 통째로 잘라내고 V2 풋터로 대체

### 11-4. 영구 자산화 — 인서트 스크립트 템플릿 하드닝
- 모든 신규 INSERT 스크립트(`insert_*.py`, `build_and_insert.py`)는 최상단에 `TRUST_FOOTER_V2` 상수 의무 + 발행 전 grep 체크 의무
- content 빌드 마지막 단계에서 11-2의 5단계 grep을 자동 실행하고 위반 1건이라도 있으면 raise → INSERT 중단
- 향후 디자인 변경 시 헌법 11-0 / 11-1을 먼저 갱신한 뒤 V3 마커로 업그레이드

---

## 📜 제11-0조 V2 (보강 — 2026-05-24)

**규칙 5 — UI 컴포넌트(React JSX)도 동일하게 적용**

- 시니어 디자인 원칙은 마크다운 블로그뿐 아니라 **React 페이지/컴포넌트(.jsx, .tsx)에도 그대로 적용**된다.
- JSX 안의 이모지는 시각적 신뢰를 떨어뜨린다. 모든 이모지는 **`lucide-react` 아이콘**으로 교체.
  - 예: `📈` → `<TrendingUp />`, `🌊` → `<Waves />`, `🩺` → `<Stethoscope />`, `🎗️` → `<Ribbon />`
- 데이터 배열의 `emoji` / `icon: '🔥'` 같은 문자열 필드는 **lucide 컴포넌트 참조**로 변경하고 렌더 시 `<Icon size={...} />`로 표시.
- 카드/배너의 large emoji는 **40~48px 라운드 박스 안 24px lucide 아이콘**으로 (브랜드 컬러 +14% 알파 배경).
- 단, 활자 부호(✆ ✦ ✕ ✓ → ⋮)는 시니어 디자인 OK (이모지 아님).
- 검증 grep:
  ```bash
  python3 -c "import re,sys; [print(f'{f}:{i}: {l.strip()}') \
    for f in sys.argv[1:] for i,l in enumerate(open(f,encoding='utf-8'),1) \
    if re.search(r'[\U0001F300-\U0001FAFF\U00002600-\U000027BF]', l)]" \
    hanain/src/pages/*.jsx hanain/src/components/**/*.jsx
  ```

---

## 📜 제12조 (SPA 라우팅 표준 — `/p/:phone`, `/p/:slug` 절대 진입 보장)

**배경**:
업그레이드 때마다 반복 발생한 회귀 — `/p/01056528206` URL을 브라우저에 직접 입력하거나 복사·공유했을 때,
사용자가 명함(개인화) 페이지가 아닌 **메인 .com 페이지로 추방**되는 치명적 버그.

**근본 원인** (2026-05-24 진단):
- `BusinessCardPage.jsx`, `PartnerLandingPage.jsx` 내부 `useEffect`가
  `?view=card` 쿼리 파라미터가 없을 때 `navigate('/', { replace: true })`로 메인으로 리다이렉트.
- 이는 카카오톡·문자·DM 등 외부에서 URL을 받은 사용자가 명함을 절대 볼 수 없는 구조.

**헌법 표준**:

1. **`/p/:phone`, `/p/:slug` 등 개인화 경로는 무조건 해당 컴포넌트로 진입**한다.
   - 파트너 데이터 로드 성공 → 즉시 명함/랜딩 페이지 렌더.
   - 로드 실패 → 에러 메시지 또는 NotFound 페이지. **메인(`/`)으로 추방 금지**.

2. **금지 패턴** (코드 리뷰 시 자동 차단):
   ```js
   // ❌ 금지
   navigate('/', { replace: true })
   navigate('/main')
   window.location.href = '/'
   // ↑ /p/:phone, /p/:slug 등 개인화 경로 컴포넌트 안에서는 절대 금지
   ```

3. **`?view=card` 같은 쿼리 게이트 사용 금지**: 진입 조건으로 쓰면 URL 복사·공유 시 게이트 누락으로 회귀.
   파라미터는 PWA 부가 동작 신호(예: 자동 저장)에만 사용.

4. **Vercel SPA rewrites는 유지**: `vercel.json`의 `{ "source": "/(.*)", "destination": "/" }`는 build asset 충돌을 피하도록 정확해야 함.

**검증 grep** (commit/PR 전 필수):
```bash
# 개인화 페이지에서 메인 추방 패턴 검색
grep -nE "navigate\\(['\"]/['\"]" hanain/src/pages/BusinessCardPage.jsx hanain/src/pages/PartnerLandingPage.jsx \
  | grep -v "// 사용 가능" \
  && echo "❌ 헌법 12조 위반: /p/:phone 컴포넌트에서 메인 리다이렉트 발견" \
  || echo "✅ 헌법 12조 통과"
```

**위반 시**: 즉시 fix 커밋 + PR. 이 조항은 **업그레이드마다 동일 회귀가 반복되어 사용자 신뢰가 직접 손상되는 영역**이므로 **최우선 우선순위**.

---

## 📜 제13조 (작업 범위 규율 · 토큰 경제 — "UI ≠ 문서 콘텐츠")

**제정 사유 (2026-05-24)**:
사용자가 "파트너 페이지 UI를 시니어 스타일로 바꿔줘"라고 요청했을 때, 에이전트가 **UI 크롬(껍데기)** 뿐 아니라 **PDF 내부 문서 콘텐츠 데이터**까지 자동으로 emoji 제거/리팩토링을 진행 → 토큰 대량 소비 + 사용자 자산(파트너 교육 자료) 무단 수정 사고 발생.

사용자 직접 지시:
> "파트너 자료까지는 손대지마!! 내부자료까지 수정하니깐 토큰이 많이 들지 기존자료는 두고 웹 ui만 개선하라는 거였어"
> "토큰이 많이 든다 적정선을 헌법에 개정해"

### 13-1. 두 영역의 엄격한 경계 정의

| 영역 | 정의 | 디자인 규율 적용 (제11조) | 자동 수정 권한 |
|---|---|---|---|
| **UI 크롬 (Chrome)** | 카드 컨테이너, 버튼, 헤더, 네비게이션, 배너, 섹션 타이틀, 그룹 라벨, 사용 안내 박스, 페이지 hero, 푸터 | ✅ 시니어 디자인 강제 (emoji → lucide-react) | ✅ 자동 수정 OK |
| **문서 콘텐츠 (Content)** | PDF 렌더링용 데이터, 파트너 교육 자료, 핸드북 본문, getContent 배열, MATERIALS_* 데이터 필드, 내부 학습 자료, Canvas/PDF 본문 텍스트 | ❌ 디자인 규율 적용 금지 (사용자 자산) | ❌ **사용자 명시 요청 시에만** |

**핵심 원칙**:
- UI 크롬은 "디자이너의 영역" → 시각적 일관성을 위해 자동 정리 가능
- 문서 콘텐츠는 "콘텐츠 작성자(사용자/파트너)의 영역" → **에이전트가 임의 수정 불가**

### 13-2. 문서 콘텐츠 자동 감지 grep 휴리스틱

다음 패턴이 변경 대상에 포함되면, **반드시 사용자에게 확인 후** 작업:

```bash
# 문서 콘텐츠 영역 식별 grep
grep -nE "getContent|points:\\s*\\[|MATERIALS_[A-Z]+|handbook|training|fillText\\(.*['\"](?!.*PHLOROTANNIN)" <files>
```

- `getContent` / `points: [` → PDF 본문 데이터 (절대 자동 수정 금지)
- `MATERIALS_SEXUAL/CANCER/RECOVERY/PRODUCT/COMBO/SINGLE` → 카탈로그 데이터 (icon **필드명**은 UI 매핑이라 OK, 내부 텍스트/설명/points는 금지)
- `handbook`, `training`, `internal-*` → 파트너 자산 (전체 금지)

**예외 — UI 매핑 필드는 허용**:
- `MATERIALS_X` 배열의 `icon: Waves` (lucide 컴포넌트 매핑) — 카드 헤더에 표시되는 **UI 아이콘**이므로 13조 적용 안 함
- 하지만 같은 배열 안의 `points: [...]`, `description: "..."` 같은 **본문 텍스트**는 13조 보호 대상

### 13-3. 토큰 경제 — 작업 범위 사전 합의 의무

**대량 수정(>3 파일 또는 >100 라인) 전 필수 절차**:

1. **범위 명시 보고**: "이 작업은 [UI 크롬만] 또는 [UI + 문서 콘텐츠] 영역을 건드립니다"
2. **사용자 명시 승인 대기**: 특히 [문서 콘텐츠] 포함 시 반드시 별도 승인
3. **Python 일괄 스크립트 사용 시 추가 경고**: `sed/python re.sub`로 다수 파일 동시 수정 직전, 영향 범위 한 줄 요약 제시
4. **승인 없는 확장 금지**: "UI 시각적으로 인접해 보인다"는 이유로 문서 콘텐츠까지 자동 확장 절대 금지

### 13-4. 회복 절차 (사고 시)

만약 사용자가 "내부자료까지 손대지마" 류의 항의를 하면:

1. **즉시 작업 중단** (추가 토큰 소비 차단)
2. **`git restore <file>`** 로 미커밋 변경분 원복
3. **`git status`** 로 깨끗한 상태 확인 후 사용자에게 보고
4. **헌법 13조 grep 휴리스틱 재실행** → 향후 재발 방지 확인

### 13-5. 사고 사례 (2026-05-24 — InfoRoomPage.jsx PDF 콘텐츠 무단 수정)

- 사용자 요청: "파트너 페이지 UI를 시니어 디자인으로"
- 정상 작업: 카드 헤더, 섹션 타이틀, 그룹 라벨, hero, 배너 → lucide 전환 ✅
- **범위 초과**: `getContent()` 내부 `points: [{ icon: '🔥', ... }]` 141개 항목의 icon 필드 일괄 삭제, Canvas 본문 텍스트의 emoji 제거 ❌
- 결과: 토큰 대량 소비 + 사용자 자산 침해 → `git restore`로 원복
- **재발 방지**: 본 13조 신설

---

## 📜 제14조 (배포 완결성 — PR 생성 ≠ 작업 완료)

**제정 사유 (2026-05-24)**:
\`/p/:phone\` 메인 추방 회귀를 dadd2ad 커밋에서 코드상 정상 수정했으나, **PR #27을 main에 머지하지 않은 채 "작업 완료"라고 사용자에게 보고**. Vercel은 main 브랜치만 배포하므로 production은 옛날 버그 코드를 계속 서빙. 사용자가 production에서 동일 버그를 재확인하고 항의("너가 또 실수했냐").

### 14-1. 절대 원칙 — "production 검증 전까지 작업 완료 아님"

다음 5단계를 **모두 통과**해야 "작업 완료"라고 보고할 수 있다:

1. ✅ **코드 수정** (소스 파일 변경)
2. ✅ **로컬 빌드 성공** (\`npm run build\` 에러 없음)
3. ✅ **커밋 + 푸시** (origin/genspark_ai_developer 반영)
4. ✅ **main 머지** (\`gh pr merge --squash --admin\` 실행 + \`mergedAt\` 확인)
5. ✅ **production 검증** (Vercel 배포 60~120초 대기 후 Playwright/curl로 실제 동작 확인)

**1~3단계만 끝났을 때는 "PR 올림" 상태이지 "작업 완료"가 아님**. 절대 "끝났다"고 보고하지 말 것.

### 14-2. 버그 수정 / 라우팅 / SEO / 콘텐츠 카테고리는 즉시 머지

다음 카테고리의 PR은 사용자 직접 검토 없이 **즉시 머지 권장** (사용자가 production 동작 못 보면 무의미):

| 카테고리 | 즉시 머지 가능? | 사유 |
|---|---|---|
| **라우팅 회귀 수정** (/p/:phone, /q/:slug 등) | ✅ 즉시 | production에서만 검증 가능 |
| **메인 추방 버그** | ✅ 즉시 | 사용자 신뢰 직결 |
| **헌법 개정 (docs)** | ✅ 즉시 | 코드 영향 없음, 다음 작업에 즉시 적용 |
| **UI 시니어 디자인** | ✅ 즉시 | 시각 확인은 production 필요 |
| **SEO 메타·sitemap·RSS** | ✅ 즉시 | 검색엔진 즉시 반영 |
| **콘텐츠 발행 (블로그/Q&A)** | ✅ 즉시 | 발행 가치 즉시 발생 |
| **DB 스키마 변경** | ⚠️ 사용자 사전 승인 후 머지 |  |
| **결제·인증 등 보안** | ⚠️ 사용자 사전 승인 후 머지 |  |

### 14-3. 머지 명령 표준

```bash
# 1. PR 머지 (squash + admin 우회로 즉시 머지)
gh pr merge <PR번호> -R <owner>/<repo> --squash --admin

# 2. 머지 확인
gh pr view <PR번호> -R <owner>/<repo> --json state,mergedAt
# state: MERGED, mergedAt: <timestamp> 확인

# 3. main 동기화 확인
git fetch origin main
git log origin/main --oneline -3
# 최상단 커밋에 수정 내용 포함 확인

# 4. production 검증 (Vercel 자동 배포 60~120초 대기 후)
sleep 90
curl -sI "https://<도메인>/<경로>" | head -5
# OR Playwright로 실제 동작 확인
```

### 14-4. production 검증 grep 규칙

라우팅·SEO·콘텐츠 카테고리 작업 후 **production HTML/title을 반드시 확인**:

```bash
# 예: /p/:phone 명함 페이지 정상 진입 확인
curl -s "https://phlorotannin.com/p/01056528206" | grep -E "<title|page-title"
# → "현건호 | Phlorotannin Partners" 또는 파트너명 포함되어야 함
# → "플로로탄닌 효능 효과 | 감태추출물·씨놀·해양폴리페놀 정보" (메인 title)이 나오면 라우팅 깨짐
```

### 14-5. 사고 사례 (2026-05-24)

| 단계 | 상태 |
|---|---|
| 1. 코드 수정 (BusinessCardPage.jsx `navigate('/', { replace: true })` 제거) | ✅ |
| 2. 로컬 빌드 | ✅ |
| 3. 커밋 + 푸시 (dadd2ad) | ✅ |
| 4. **main 머지** | ❌ **누락** — PR #27 OPEN 상태로 방치 |
| 5. production 검증 | ❌ **미실시** — 검증했더라면 즉시 알아차렸을 회귀 |

→ 사용자에게 "완료" 보고했으나 production은 옛날 코드. 사용자 재시도로 발각.

**재발 방지**: 본 제14조 신설. 이제부터 모든 작업 완료 보고 직전 5단계 체크리스트 통과 의무.

---

## 제16조 (환자식·식단배달 SEO 클러스터 운영 규칙) — 2026-05-26 보강

암환자식단배달, 당뇨환자식단배달, 환자식 정기배송처럼 구매 의도가 강한 키워드는 대표 글과 롱테일 글을 분리한다.

1. 대표 글이 이미 있으면 같은 제목 구조로 다시 발행하지 않는다.
   - 예: `암환자 식단 배달 가이드`, `당뇨환자 식단 배달 가이드` 반복 발행 금지.
   - 새 글은 주문 전 체크리스트, 보호자 메모, 증상별 메뉴 조정, 합병증 주의점처럼 검색 의도를 나눠 작성한다.
2. 1차 배치는 과발행하지 않는다.
   - 기존 대표 글이 있는 경우 8개 블로그 + 2개 인사이트 정도를 1차 기준으로 삼는다.
   - 이후 Search Console 노출·클릭·색인 상태를 보고 2차 배치를 확장한다.
3. 블로그와 인사이트의 역할을 구분한다.
   - 블로그: 검색 유입과 구매 직전 정보 탐색 대응.
   - 인사이트: 보호자 의사결정, 문의 전 정보 정리, 주문 메모 예시처럼 신뢰를 높이는 설명형 콘텐츠.
4. 환자식 콘텐츠의 CTA는 강매형 문구를 금지한다.
   - 좋은 CTA: 질환, 치료 단계, 못 먹는 음식, 식사량을 남기면 선택지를 정리할 수 있다는 안내.
   - 금지 CTA: 치료 결과를 암시하거나 특정 제품이 질환을 해결한다는 표현.
5. 식단배달 글도 글마다 고유 WebP 이미지를 생성한다.
   - 음식·도시락·체크리스트·혈당계·보호자 기록 등 본문 주제와 직접 연결된 이미지여야 한다.
   - 범용 바다, 추상 건강 이미지, 이전 글 이미지 재사용은 금지한다.
6. 암·당뇨·신장질환 등 YMYL 주제는 공식 기관 기준을 바닥에 둔다.
   - 국가암정보센터, 대한당뇨병학회, 식품안전나라 등 1차 공공·학회 기준을 우선한다.
   - 본문에는 개인 치료 지시가 아니라 일반 정보이며 의료진·임상영양사 상담이 필요하다는 문구를 포함한다.

---

## 제17조 (건강기능식품 소재 조합·비교 콘텐츠 규칙) — 2026-05-26 신설

플로로탄닌을 오메가3, 비타민D, 프로바이오틱스, CoQ10, 홍삼, 루테인·아스타잔틴 등 다른 건강기능식품 소재와 연결할 때는 "병용 시너지"를 단정하지 않고 역할 비교와 구매 전 점검표로 작성한다.

1. 조합 콘텐츠는 소재별 역할을 분리한다.
   - 예: 오메가3는 EPA·DHA 지방산 축, 비타민D는 혈중 수치 기반 영양소 축, 프로바이오틱스는 균주 축, 플로로탄닌은 해양 폴리페놀 축.
   - "같이 먹으면 더 좋다"가 아니라 "같이 검토할 때 무엇을 확인해야 하는가"로 쓴다.
2. 최신 임상·논문은 대상자, 기간, 용량, 평가 지표를 함께 언급한다.
   - 2024~2026년 PubMed/PMC 자료를 우선 확인한다.
   - 전임상, 동물, 세포 연구를 인체 결과처럼 쓰지 않는다.
   - 감태 복합추출물 임상을 순수 플로로탄닌 단독 결과로 확대하지 않는다.
3. CTA는 구매 압박보다 성분표 점검·상담 전 정보 정리에 둔다.
   - 좋은 CTA: 현재 복용 중인 제품명, 성분표, 복용 목적, 처방약, 기저질환을 남기면 중복 축과 주의점을 정리할 수 있다는 안내.
   - 금지 CTA: 질환 개선 보장, 특정 조합 강권, "많이 먹을수록 좋다"는 표현.
4. 소재 조합 글도 글마다 고유 WebP 이미지를 생성한다.
   - 이미지에는 텍스트, 숫자, 로고, 실제 제품 패키지를 넣지 않는다.
   - 오메가3 캡슐, 비타민D 햇빛, 장내미생물, 미토콘드리아, 홍삼 뿌리, 눈 건강 상징처럼 본문 주제와 직접 연결된 상징을 사용한다.
5. 약물·수술·임신·수유·만성질환 주의문을 포함한다.
   - 항응고제, 당뇨약, 혈압약, 면역억제제, 갑상선 질환, 해조류 알레르기는 반복 확인한다.
   - 안전 경고는 공포 조장이 아니라 "추가 전 확인" 수준으로 작성한다.

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
