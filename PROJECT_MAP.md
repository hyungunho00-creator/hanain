# phlorotannin.com 프로젝트 구조 지도

이 문서는 프로젝트의 실제 구조를 보여준다. 작업 전 어디를 봐야 하는지 빠르게 찾기 위한 지도다.

**작업 후 구조가 바뀌면 이 문서도 함께 업데이트한다.**

---

## 1. 인프라

| 항목 | 위치 |
|---|---|
| Git 저장소 | https://github.com/hyungunho00-creator/hanain |
| 배포 | Vercel (자동 배포, GitHub main 브랜치 push 시 트리거) |
| 도메인 | https://phlorotannin.com |
| DB | Supabase (project: `rlfxuyeoluoeaxuujtly`) |
| Supabase URL | https://rlfxuyeoluoeaxuujtly.supabase.co |

---

## 2. 루트 구조

```
/home/user/webapp/
├── AI_WORK_RULES.md          ← 작업 헌법
├── PROJECT_MAP.md            ← 이 문서
├── DO_NOT_TOUCH.md           ← 금지 목록
├── README.md
├── vercel.json               ← Vercel 빌드/라우팅 설정
├── package.json
├── api/                      ← Vercel Serverless Functions
│   ├── seo.js                ← 경로별 SEO 메타 주입 (Googlebot 등)
│   └── sitemap.js            ← /sitemap.xml 동적 생성 (Phase 1)
├── public/                   ← Vercel 함수의 includeFiles 대상
│   ├── index.html            ← 빌드 시 dist/index.html 복사본
│   └── sitemap.xml           ← 정적 fallback 백업
└── hanain/                   ← React + Vite SPA
    ├── public/               ← 정적 자산 (소스)
    │   ├── sitemap.xml       ← 원본 백업 (빌드 시 dist로 복사 → 다시 삭제됨)
    │   ├── partners.json     ← 파트너 명단 (Phase 2에서 Supabase로 이전 예정)
    │   ├── qa.json
    │   ├── og-image.png
    │   └── ...
    ├── dist/                 ← 빌드 산출물 (outputDirectory)
    ├── src/
    │   ├── App.jsx           ← 라우팅
    │   ├── main.jsx
    │   ├── pages/            ← 페이지 컴포넌트 (아래 표 참조)
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Footer.jsx
    │   │   └── common/
    │   │       ├── SEOHead.jsx    ← 페이지별 동적 meta 주입
    │   │       ├── FloatingButton.jsx
    │   │       ├── RevealContact.jsx
    │   │       └── ScrollToTop.jsx
    │   ├── lib/
    │   │   └── supabase.js   ← Supabase 클라이언트 (anon key)
    │   └── context/
    │       ├── AuthContext.jsx
    │       └── PartnerContext.jsx
    └── package.json
```

---

## 3. 주요 페이지 컴포넌트

| URL 패턴 | 컴포넌트 | 비고 |
|---|---|---|
| `/` | `LandingPage.jsx` | 메인 랜딩 |
| `/home` | `HomePage.jsx` | |
| `/easy` | `EasyHealthPage.jsx` | |
| `/learn` | `LearnPage.jsx` | |
| `/phlorotannin` | `PhlorotanninPage.jsx` | |
| `/blog` | `BlogPage.jsx` | 카테고리 필터 포함 |
| `/blog/:slug` | `BlogPostPage.jsx` | parseMarkdown 함수 내장 |
| `/qa` | `QAPage.jsx` | |
| `/q/:slug` | `QuestionDetailPage.jsx` | |
| `/question/write` | `QuestionWritePage.jsx` | |
| `/category/:slug` | `CategoryPage.jsx` | |
| `/community` | `CommunityPage.jsx` | |
| `/community/write` | `CommunityWritePage.jsx` | |
| `/community/post/:postId` | `CommunityPostPage.jsx` | |
| `/consult` | `ConsultPage.jsx` | |
| `/partner` | `PartnerPage.jsx` | 파트너 모집 안내 |
| `/p/:phone` | `BusinessCardPage.jsx` | **파트너 개인 정보페이지** |
| `/inforoom`, `/p/:phone/inforoom` | `InfoRoomPage.jsx` | 자료실 |
| `/copyright` | `CopyrightPage.jsx` | 저작권 안내 |
| `/admin` | `AdminPage.jsx` | (Phase 4 확장 대상) |
| `/login`, `/signup`, `/auth/callback`, `/my` | Login/Signup/AuthCallback/MyPage | |
| `/tech` | `TechPage.jsx` | |

---

## 4. Serverless API

| 경로 | 파일 | 역할 |
|---|---|---|
| `/api/seo?p=...` | `api/seo.js` | 봇 요청에 대해 경로별 title/meta/og 주입한 index.html 응답 |
| `/api/sitemap` | `api/sitemap.js` | Supabase posts + partners를 페치해 sitemap.xml 동적 생성 |

---

## 5. Vercel rewrites (`vercel.json`)

핵심 rewrite (실제 vercel.json 기준):

```
/sitemap.xml          → /api/sitemap          (Phase 1)
/                     → /api/seo?p=/
/home, /easy, /learn, /phlorotannin → /api/seo?p=...
/qa, /blog, /community, /consult, /partner, /copyright → /api/seo?p=...
/blog/:slug           → /api/seo?p=/blog/:slug
/category/:slug       → /api/seo?p=/category/:slug
/p/:phone             → /api/seo?p=/p/:phone
/(.*)                 → /index.html           (SPA fallback)
```

---

## 6. Supabase 테이블 현황

| 테이블 | 용도 | 상태 |
|---|---|---|
| `posts` | 블로그 글 (118+건, status='published'만 sitemap 노출) | ✅ 운영 중 |
| `partners` | 파트너 명단 (slug PK = 전화번호, status='active'만 노출) | ✅ Phase 2 완료 (SQL: `supabase/phase2_partners.sql`, JSON fallback 유지) |
| `categories` | 카테고리 메타 (type='blog'/'qa', 26행) | ✅ Phase 3 완료 (SQL: `supabase/phase3_categories_pages.sql`, 코드 상수 fallback 유지) |
| `pages` | 고정 페이지 메타 (12행) | ✅ Phase 3 완료 (`/api/seo`가 페치, `staticMetaFor` fallback) |
| `site_settings` | 사이트 전역 설정 key-value | ✅ Phase 4 완료 (관리자 토큰 보호, RLS public 미노출) |
| `leads` | 비회원 문의/리드 | ✅ Phase 4 완료 (anon INSERT-only RLS, 어드민 조회/갱신) |
| `question_videos` | Q&A 카테고리별 YouTube 영상 | ✅ Phase 3 RLS 보강 — anon SELECT 허용 (쓰기는 `/api/admin` 경유) |

### `posts` 테이블 주요 컬럼

- `id`, `slug`, `title`
- `content` (마크다운)
- `category`
- `excerpt`, `tags`
- `meta_title`, `meta_desc`, `og_image`
- `status` ('published' / 'draft' 등)
- `view_count`, `created_at`, `updated_at`

---

## 6-Q. Q&A 정적 인프라 (2026-05-21 신설)

Q&A는 현재 **Supabase 마이그레이션 대기 상태** (Phase 5 예정). 그동안 진실원은 `qa.json`.

### 파일 구조

| 파일 | 용도 | 크기 |
|---|---|---|
| `hanain/public/qa.json` | 1,361개 Q&A 본문 (id, category, tags, question, answer, views, likes) | 2.2MB |
| `hanain/public/tagIndex.json` | 빌드 산출물 — 태그→Q&A id 매핑 + 빈도, ≥5건 태그 122개 | ~80KB |
| `hanain/src/pages/QAPage.jsx` | 목록 (카테고리 탭, 검색, 페이지네이션) | 32KB |
| `hanain/src/pages/QuestionDetailPage.jsx` | 개별 Q&A 페이지 (FAQPage JSON-LD 자동 주입) | 20KB+ |
| `hanain/src/pages/QATagPage.jsx` | 태그별 필터 페이지 (`/qa/tag/:tag`, 신규) | TBD |
| `scripts/build_qa_tag_index.py` | tagIndex.json 빌드 스크립트 | TBD |
| `scripts/generate_qa_sitemap.py` | Q&A URL을 sitemap에 추가 | TBD |

### Q&A 카테고리 (12개)

```
metabolism, cancer_immune, digestive, cardiovascular,
neuro_cognitive, mental_health, musculoskeletal,
skin_hair, skin, hair, respiratory, infection_inflammation,
womens_health, mens_health
```

### Q&A 로딩 흐름

```
브라우저 → QAPage.jsx
  → fetch('/qa.json')        (전체 1,361건 메모리 로드)
  → fetch('/tagIndex.json')  (태그→id 인덱스)
  → 카테고리/검색/태그 필터링 (메모리 내)
```

### Q&A 라우팅 (DO_NOT_TOUCH §3-Q)

| 경로 | 용도 | 컴포넌트 |
|---|---|---|
| `/qa` | 목록·검색·카테고리 탭 | `QAPage.jsx` |
| `/q/:slug` | 개별 Q&A (단수 `q`) | `QuestionDetailPage.jsx` |
| `/qa/tag/:tag` | 태그 필터 (신규 — Phase Q3) | `QATagPage.jsx` (신규) |
| `/qa?category=:catId` | 카테고리 필터 (목록 페이지 내) | `QAPage.jsx` |

### 슬러그 규칙 (절대 변경 금지 — DO_NOT_TOUCH §3-Q)

```js
slug = question
  .replace(/[^\w\s가-힣]/g, '')
  .replace(/\s+/g, '-')
  .slice(0, 60)
```

### 헌법 상수

| 상수 | 값 | 의미 | 위치 |
|---|---|---|---|
| `MIN_TAG_COUNT` | `5` | 태그 페이지 생성 최소 빈도 | `scripts/build_qa_tag_index.py` |
| `FAQ_JSONLD_MAX_PER_PAGE` | `10` | 단일 페이지 FAQPage 스키마 최대 항목 | `QAPage.jsx`, `QATagPage.jsx` |

---

## 7. 주요 데이터 위치 (어디서 수정해야 하나)

| 수정 대상 | 현재 위치 | 미래 위치 (마이그레이션 후) |
|---|---|---|
| 블로그 글 본문/SEO | Supabase `posts` | Supabase `posts` |
| Q&A 질문/답변 본문 | `hanain/public/qa.json` (1,361건, 2.2MB, 정적) | Supabase `qa_questions` (Phase 5 예정) |
| Q&A 카테고리 정의 | `QAPage.jsx` `QA_CATEGORIES` 상수 (12개) | Supabase `qa_categories` (Phase 5) |
| Q&A 태그 인덱스 | `hanain/public/tagIndex.json` (빌드 산출물, 122개 ≥5건 태그) | 동일 (동적 빌드) |
| 블로그 카테고리 라벨 | `BlogPage.jsx`, `Footer.jsx` (하드코딩) | Supabase `categories` (Phase 3) |
| 카테고리 SEO 메타 | `api/seo.js` 상수 | Supabase `categories` (Phase 3) |
| 고정 페이지 본문 (예: /copyright) | 해당 `.jsx` 컴포넌트 (하드코딩) | Supabase `pages` (Phase 3) |
| 사이트 path별 SEO 메타 | `api/seo.js` if-else | Supabase `pages` (Phase 3 일부) |
| 파트너 명단 | Supabase `partners` (1순위) → `hanain/public/partners.json` (fallback) | Supabase `partners` (Phase 2 완료) |
| sitemap | `api/sitemap.js` (동적, Supabase 페치) | 동일 (이미 자동화 완료) |

---

## 8. SEO 시스템 동작 흐름

1. 일반 브라우저 요청
   → SPA가 `SEOHead.jsx`로 `document.title` 및 meta 태그 갱신

2. 검색엔진/봇 요청
   → `vercel.json` rewrite → `api/seo.js`가 정적 `index.html` 읽어 경로별 메타 주입 후 반환
   → 봇은 완전한 메타 정보가 채워진 HTML을 본다

3. sitemap 요청
   → `api/sitemap.js`가 Supabase posts + partners 페치 → 동적 XML 생성

---

## 9. 빌드 / 배포 흐름

```
git push origin main
  ↓
Vercel 자동 빌드
  ↓
buildCommand:
  cd hanain && npm install && npm run build
  → outputDirectory: hanain/dist
  → public/index.html, public/sitemap.xml로 함수용 사본 생성
  → dist/sitemap.xml 삭제 (정적 응답 차단, 동적 함수가 응답하도록)
  ↓
배포 완료 (보통 60~90초)
  ↓
검증:
  - curl -s -A "Googlebot" https://phlorotannin.com/ | grep '<title'
  - curl -sI https://phlorotannin.com/sitemap.xml | grep -i x-sitemap
```

---

## 10. 검증 명령 모음

```bash
# 메인 페이지 SEO 메타 (Googlebot)
curl -s -A "Googlebot" https://phlorotannin.com/ | grep -E '<title|name="description"|rel="canonical"'

# 블로그 글 SEO 메타
curl -s -A "Googlebot" https://phlorotannin.com/blog/{slug} | grep -E '<title|name="description"'

# sitemap 동적 응답 확인 (X-Sitemap-Source: dynamic 가 떠야 정상)
curl -sI https://phlorotannin.com/sitemap.xml | grep -i "x-sitemap"

# sitemap URL 개수
curl -s https://phlorotannin.com/sitemap.xml | grep -c "<loc>"

# 특정 글이 sitemap에 포함됐는지
curl -s https://phlorotannin.com/sitemap.xml | grep "{slug}"

# Supabase posts 카운트 (published)
curl -sG "https://rlfxuyeoluoeaxuujtly.supabase.co/rest/v1/posts" \
  --data-urlencode "select=id" \
  --data-urlencode "status=eq.published" \
  --data-urlencode "limit=2000" \
  -H "Accept-Profile: public" \
  -H "apikey: <ANON_KEY>" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

---

## 11. 마이그레이션 단계별 영향 파일 (참고)

### Phase 1 (완료): sitemap 자동화
- `api/sitemap.js` (신규)
- `vercel.json` (rewrite + buildCommand)
- `public/sitemap.xml` (fallback 백업)

### Phase 2 (완료): partners → Supabase
- Supabase `partners` 테이블 신설 — `supabase/phase2_partners.sql` 참조
  - 스키마: slug PK, phone, name, phone_display, site_url, memo, status, created_at, updated_at
  - RLS: anon 읽기, `status='active'`만 노출
- `BusinessCardPage.jsx` `fetchPartnerByPhone()` — 테이블 1순위 + JSON fallback
- `api/sitemap.js` `fetchPartners()` — 테이블 1순위 + JSON fallback, `X-Sitemap-Partners-Source` 헤더 추가
- `PartnerContext.jsx` `fetchPartnerByPhone/BySlug` — 동일하게 테이블 1순위
- `hanain/public/partners.json` — fallback으로 유지 (Phase 2 안정화 확인 후 제거 검토)

### Phase 3 (대기): categories + pages → Supabase
- Supabase `categories`, `pages` 테이블 신설
- `BlogPage.jsx`, `Footer.jsx` CATEGORIES 배열 → DB 페치
- `api/seo.js`의 path별 메타 → DB 페치
- `CopyrightPage.jsx` 등 고정 페이지 본문 → DB 페치
- 신규 `DynamicPage.jsx` 라우트 추가

### Phase 4 (대기): Admin CMS
- `AdminPage.jsx` 확장
- Supabase `leads`, `site_settings` 테이블 신설
