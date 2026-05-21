# 절대 건드리지 말 것 (DO NOT TOUCH)

이 목록에 있는 항목은 **사용자의 명시적 지시가 없으면 절대 수정하지 않는다.**

수정이 필요해 보이면, **수정하기 전에 반드시 사용자에게 보고하고 승인을 받는다.**

---

## 1. URL / 라우팅

- ❌ 기존 글 slug 변경 금지
- ❌ 기존 URL 삭제 금지
- ❌ `/blog`, `/blog/:slug` 경로 패턴 변경 금지
- ❌ `/p/:phone` 경로 패턴 변경 금지
- ❌ `/copyright`, `/qa`, `/community`, `/consult`, `/partner` 등 기존 페이지 경로 변경 금지
- ❌ `/api/seo`, `/api/sitemap` 함수 경로 변경 금지
- ❌ `vercel.json`의 rewrite 순서 임의 변경 금지

---

## 2. SEO / 검색 노출

- ❌ `robots.txt` 차단 방향 수정 금지
- ❌ `noindex` 메타 추가 금지
- ❌ Search Console에 색인된 URL 변경 금지
- ❌ canonical URL 임의 변경 금지
- ❌ sitemap 기존 URL 삭제 금지
- ❌ `api/seo.js`의 기존 path 메타 임의 수정 금지
- ❌ `SEOHead.jsx`의 DEFAULT_TITLE/DEFAULT_DESC 임의 수정 금지

---

## 3. 데이터 (Supabase)

- ❌ 기존 posts 전체 일괄 수정 금지
- ❌ 기존 posts의 `title` 임의 수정 금지
- ❌ 기존 posts의 `content` 중간 부분 임의 수정 금지 (footer/prefix는 제외)
- ❌ 기존 posts의 `slug` 변경 금지
- ❌ 기존 posts 삭제 금지 (status='draft'로 숨김만 가능)
- ❌ posts 테이블 컬럼 삭제 금지
- ❌ Supabase RLS 정책 임의 변경 금지

---

## 3-Q. Q&A 데이터 (qa.json) — 2026-05-21 신설

- ❌ `public/qa.json` 기존 1,361개 질문의 `id` 변경 금지
- ❌ 기존 Q&A의 `question` / `answer` 임의 수정 금지 (forbidden words 자동 치환만 예외)
- ❌ 기존 Q&A 삭제 금지 (`difficulty: "hidden"` 등 메타로 숨기는 방식만 허용)
- ❌ Q&A 슬러그 규칙 변경 금지 — `question.replace(/[^\w\s가-힣]/g,'').replace(/\s+/g,'-').slice(0,60)`
- ❌ `views` / `likes` 카운터 임의 조작 금지 (정상 사용자 인터랙션만 반영)
- ❌ qa.json의 12개 카테고리 ID 변경 금지 (`metabolism`, `cancer_immune`, `digestive`, `cardiovascular`, `neuro_cognitive`, `mental_health`, `musculoskeletal`, `skin_hair`, `skin`, `hair`, `respiratory`, `infection_inflammation`, `womens_health`, `mens_health`)
- ❌ `MIN_TAG_COUNT` 헌법 상수 (=5) 임의 변경 금지 — 헌법 제10조 의무 4 참조
- ❌ `/q/:slug` 경로 패턴 변경 금지 (Q&A 개별 페이지 — 이미 색인된 URL 보호)
- ❌ `/qa` 경로 패턴 변경 금지 (Q&A 목록 페이지)
- ❌ `/qa/tag/:tag` 경로 패턴 변경 금지 (Phase Q3 이후 색인됨)
- ❌ `/qa/category/:slug` 경로 추가/변경 시 사용자 승인 필요

> **라우팅 약속**:
> - `/qa` = 목록 (필터/검색)
> - `/q/:slug` = 개별 Q&A 페이지 (단수 `q`, 이미 색인됨)
> - `/qa/tag/:tag` = 태그 필터 페이지 (신규)
> - `/category/:slug` = Q&A 카테고리 (12개, CategoryPage.jsx)

**SEO 정합성 동결 (2026-05-21 보강 — 사이트 전체 적용)**:
- ❌ `/qa?category=…` / `/qa?q=…` / `/qa?page=…` 쿼리스트링 URL을 **사이트맵에 등록 금지**
  - 이유: QAPage.jsx canonical 이 `/qa` 고정 → 사이트맵-canonical 불일치 = GSC 경고
  - 대체: `/category/:slug` (정식 카테고리) + `/qa/tag/:tag` (131개 태그) 사용
- ❌ QAPage.jsx · BlogPage.jsx 에서 `isFilteredView` / `isBlogFiltered` 시 **`noindex` 제거 금지**
  - 이유: 동일 canonical 가진 다수 URL = 중복 콘텐츠 패널티
- ❌ `api/seo.js` 의 `/q/`, `/qa/tag/`, `/category/` 핸들러 삭제 금지
  - 이유: 봇이 JS 미렌더링 시 빈 SPA 셸만 보게 됨 = SEO 가치 0
- ❌ `vercel.json` rewrites 의 `tagIndex.json` exclusion 패턴 제거 금지
  - 이유: 131 태그 페이지 전부 로드 실패

**콘텐츠 자산화 4종 동결 (2026-05-21 보강 — "부족한 컨텐츠 채우기" 완료)**:
- ❌ Q&A의 E-E-A-T 필드 5종 (`author`, `content_type`, `reviewed_at`, `disclaimer`, `source_type`) 삭제 금지
  - 이유: Schema.org `QAPage.dateModified` / `acceptedAnswer.author` 가 이 필드를 직접 참조 — 삭제 시 YMYL 신뢰도 신호 소멸
  - author는 13개 카테고리별 분과 편집데스크명으로 세분화됨 (`refine_qa_authors.py` 산출물) — 단일값으로 되돌리는 일괄 변경 금지
- ❌ `SEOHead.jsx` 의 `ogImageAlt` prop 제거 금지 — og:image:alt 카테고리별 차별화 신호 소실
- ❌ Q&A의 브랜드 태그 10종 (플로로탄닌·감태·항산화·디에콜·에콜·폴리페놀·항염증·해양폴리페놀·갈조류·후코이단) 일괄 제거 금지
  - 이유: 131개 태그 페이지 중 9개가 이 브랜드 키워드 기반 — 제거 시 1,216~202개 Q&A의 토픽 클러스터 붕괴
  - 재추가 방법: `python3 scripts/build_qa_brand_tags.py --apply` (멱등성 보장)
- ❌ `public/og/qa-<slug>.png` 13장 삭제 금지
  - 이유: CategoryPage / QuestionDetailPage / QATagPage 의 `<SEOHead ogImage>` 가 직접 참조
  - 재생성 방법: `python3 scripts/build_og_images.py` (Pillow + NanumSquareRoundB)
- ❌ `/learn`, `/phlorotannin`, `/easy` 허브 페이지의 `<RelatedQA />` 컴포넌트 제거 금지
  - 이유: 허브 → Q&A 페이지랭크 흐름 단절 시 1,361 Q&A 색인 가치 50% 이상 손실
- ❌ `CAT_OG_SLUG` (QuestionDetailPage) / `CAT_ID_TO_SLUG` (Footer) / `CAT_OG_SLUG` (api/seo.js) 매핑 이탈 금지
  - 이유: 세 매핑은 `build_og_images.py` 산출물 슬러그와 1:1 정합성 유지 필수 — 봇·클라이언트 양쪽 동기화

**사이드바 fallback 정합성 동결 (2026-05-21 — '근골격 관련 질문 빈 카드' 결함 fix)**:
- ❌ `QuestionDetailPage.getFallbackSameCategory()` 헬퍼 삭제 금지
  - 이유: 모든 사용자가 fallback 경로(`q._fallback=true`)를 타므로 (URL slug 와 Supabase id 형식 불일치 → getQuestionBySlug 실패), 사이드바도 qa.json 진실원에서 채워야 함
- ❌ `getSameCategory()` SELECT 컬럼에서 `slug` / `title` 제거 금지
  - 이유: 제거 시 RelatedCard 의 `to=/q/${q.slug}` 가 undefined → 사이드바 6개 카드 전부 빈 텍스트로 노출 (사용자 보고 결함)
- ❌ `RelatedCard` 의 안전 가드 (`if (!title) return null`, `if (!slug) return null`) 제거 금지
  - 이유: 데이터 불완전 시 빈 카드 렌더링 차단 — 헤더만 떠 있는 유령 섹션 방지
- ❌ 사이드바 섹션 가드 `items.length === 0 return null` 완화 금지
  - 이유: 의미있는 카드 1개 이상일 때만 "{카테고리} 관련 질문" 헤더 노출 — UX 회귀 방지
- ❌ `qa.json` 의 `category` 필드 값을 13개 카테고리 ID 외 값으로 변경 금지
  - 이유: getFallbackSameCategory 의 `q.category === categoryId` 매칭이 깨지면 모든 카테고리 사이드바가 빈 상태로 회귀

**봇 메타 라우팅 동결 (2026-05-21 D3 보강 — 결함 #1·#2 해결 직후)**:
- ❌ `api/seo.js` 의 `injectMeta()` 에서 `og:image` / `og:image:secure_url` / `og:image:alt` / `twitter:image` / `twitter:image:alt` 정규식 치환 5종 삭제 금지
  - 이유: 삭제 시 봇이 모든 경로에서 기본 `/og-image.png` 만 보게 됨 = 카테고리 OG 13종 신호 소멸 (D3 Bug #1)
- ❌ 루트 `vercel.json` 의 명시적 rewrites — `/q/:slug`, `/qa/tag/:tag`, `/glossary` 삭제 금지
  - 이유: 삭제 시 catch-all `/((?!api/|og/|assets/).*)` 에 걸려 `p=/` 로 들어가 홈 메타가 노출됨 (D3 Bug #2 — `x-seo-path: /` 회귀)
- ❌ 루트 `vercel.json` catch-all 의 `og/` 제외 패턴 제거 금지
  - 이유: 제외 안 하면 `/og/qa-*.png` 13장이 api/seo.js 로 들어가 HTML 응답 = 봇이 OG 이미지 로드 실패
- ❌ `api/seo.js` 의 `CAT_OG_SLUG` / `ogImageForCategory()` 헬퍼 삭제 금지
  - 이유: `staticMetaFor('/category/:slug')` 가 카테고리별 OG 이미지를 결정하는 단일 진실원

---

## 4. 파트너 시스템

- ❌ `/p/:phone` 페이지의 핵심 구조 변경 금지
- ❌ `BusinessCardPage.jsx`의 CTA(전화/문자 버튼) 구조 변경 금지
- ❌ `PartnerContext`의 동작 방식 변경 금지
- ❌ `partners.json` 임의 삭제 금지 (Phase 2 완료됐지만 fallback으로 유지 필요, 안정화 확인 전까지)
- ❌ Supabase `partners` 테이블에서 파트너 row DELETE 금지 — `status='inactive'`로 UPDATE만 허용
- ❌ `partners` 테이블 스키마(snake_case 컬럼명) 변경 금지 — 코드 어댑터가 camelCase로 매핑하는 구조
- ❌ 파트너 slug(전화번호) 형식 변경 금지

---

## 5. CTA / 영업 구조

- ❌ 기존 CTA 박스 삭제 금지 (전화 문의, 문자 문의, Q&A 바로가기 등)
- ❌ 푸터의 연락처 CTA 삭제 금지
- ❌ FloatingButton 동작 변경 금지
- ❌ RevealContact 동작 변경 금지
- ❌ DB 수집/상담 연결 흐름 변경 금지

---

## 6. 디자인 / 레이아웃

- ❌ 전체 디자인 개편 금지
- ❌ Navbar 구조 임의 변경 금지
- ❌ Footer 구조 임의 변경 금지 (저작권 박스 포함)
- ❌ 색상 토큰(`ocean-deep`, `cyan-hana`, GOLD 등) 임의 변경 금지
- ❌ Tailwind 설정 임의 변경 금지

---

## 7. 빌드 / 배포

- ❌ `vercel.json`의 `buildCommand` 임의 변경 금지 (sitemap 자동화 동작에 영향)
- ❌ `outputDirectory` 변경 금지
- ❌ `package.json`의 빌드 스크립트 임의 변경 금지
- ❌ Vercel 환경변수 임의 추가/삭제 금지

---

## 8. 마이그레이션 단계

- ❌ 사용자가 명시적으로 지시하지 않은 Phase는 진행 금지
- ❌ Phase를 건너뛰지 말 것 (Phase 1 → 2 → 3 → 4 순서)
- ❌ 한 번에 여러 Phase를 동시에 진행 금지
- ❌ 마이그레이션 중 fallback 코드 제거 금지 (안정화 확인 전까지)

---

## 9. 외부 도메인 / 별도 프로젝트

- ❌ `hanain-lee-soon-ho/` 같은 별도 파트너 사이트 디렉토리는 사용자 지시 없이 부활시키지 말 것
- ❌ 메인 사이트와 별도 Vercel 프로젝트는 사용자만 관리

---

## 10. 기존 파일 (특히 신중하게 다룰 것)

다음 파일은 **수정 전 반드시 그 파일 전체를 먼저 읽고, 변경 부분만 최소 범위로 수정한다.**

- `api/seo.js`
- `api/sitemap.js`
- `vercel.json`
- `hanain/src/App.jsx`
- `hanain/src/lib/supabase.js`
- `hanain/src/components/layout/Footer.jsx`
- `hanain/src/components/layout/Navbar.jsx`
- `hanain/src/components/common/SEOHead.jsx`
- `hanain/src/pages/BusinessCardPage.jsx`
- `hanain/src/pages/BlogPostPage.jsx`
- `hanain/src/pages/BlogPage.jsx`
- `hanain/src/pages/InfoRoomPage.jsx`
- `hanain/public/partners.json`
- `hanain/public/sitemap.xml`

---

## 11. 위반 시 조치

위 항목을 사용자 승인 없이 수정한 경우:

1. 즉시 작업 중단
2. 사용자에게 즉시 보고
3. `git revert`로 해당 커밋 되돌리기
4. 라이브 검증 후 정상 확인

---

## 12. 안전 원칙

- 의심스러우면 **건드리지 않고 묻는다.**
- 토큰 절약을 핑계로 검증을 건너뛰지 않는다.
- "어차피 동작할 것 같으니 그냥 한다"는 금지.
- 기존 구조를 모르면 먼저 읽고, 그다음 수정한다.
