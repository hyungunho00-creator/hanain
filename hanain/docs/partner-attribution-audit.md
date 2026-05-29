# Partner Attribution Audit (Pre-Implementation)

작성일: 2026-05-29
대상 도메인: https://phlorotannin.com
코드베이스: `C:\Users\user\Documents\Codex\2026-05-26\new-chat\hanain\hanain`

## 1) 현재 프레임워크/라우팅/레이아웃 구조

- 프레임워크: React + Vite + React Router (SPA)
- 라우팅 정의: `src/App.jsx`
- 전역 레이아웃:
  - Header: `src/components/layout/Navbar.jsx`
  - Footer: `src/components/layout/Footer.jsx`
  - Floating CTA: `src/components/common/FloatingButton.jsx`
- SEO 메타 공통: `src/components/common/SEOHead.jsx`
- 파트너 컨텍스트: `src/context/PartnerContext.jsx` (query `ref` + sessionStorage 기반)
- 파트너 URL helper: `src/lib/partnerRef.js` (`withRef` 기반)

## 2) 현재 공개 라우트 (핵심)

`src/App.jsx` 기준:

- `/`
- `/home`
- `/easy`
- `/blog`
- `/blog/:slug`
- `/qa`
- `/q/:slug`
- `/qa/tag/:tag`
- `/category/:slug`
- `/insights`
- `/insights/:slug`
- 기타: `/partner`, `/consult`, `/learn`, `/phlorotannin`, `/community/*`, `/inforoom`, `/copyright`, `/glossary`, `/compare/:slug`, `/safety`, `/research-timeline`

기존 파트너 전용 라우트:

- `/p/:phone` (전자명함, `BusinessCardPage`)
- `/p/:phone/inforoom`

부재:

- `/p/[partnerSlug]/home`
- `/p/[partnerSlug]/easy`
- `/p/[partnerSlug]/blog/[slug]`
- `/p/[partnerSlug]/q/[slug]`
- `/p/[partnerSlug]/qa/tag/[tag]`
- `/p/[partnerSlug]/category/[category]`
- `/p/[partnerSlug]/insights/[slug]`

즉, "파트너 경로 프리픽스 기반 아카이브 미러"가 없음.

## 3) 파트너 정보가 사라지는 핵심 원인

### A. 컨텍스트 모델 자체 한계

- `src/context/PartnerContext.jsx`
  - `/p/(\d{9,11})` 숫자 phone 경로만 파싱
  - query는 `?ref=`만 인식 (`?pt=`, slug 기반 미지원)
  - 저장소가 `sessionStorage`만 사용 (cookie/localStorage 없음)
  - 세션 종료/브라우저 상황에서 복원 약함

- `src/lib/partnerRef.js`
  - 내부 링크에 `?ref=phone`를 붙이는 방식
  - `/p/:phone/...`를 “최종 주소 체계”로 확장하지 못함

### B. 하드코딩 내부 링크/리다이렉트

대표 사례:

- `src/components/layout/Navbar.jsx`
  - 로고 `to="/"`
  - nav 항목 `to={link.path}` (partnerize 미적용)
- `src/components/layout/Footer.jsx`
  - 일부 링크는 `withRef` 사용하나 `to="/"`, `to="/copyright"` 등 혼재
- `src/components/common/FloatingButton.jsx`
  - `to="/consult"`, `to="/partner"` 고정
- `src/pages/BlogPostPage.jsx`
  - 포스트 미존재 시 `navigate('/blog', { replace: true })`
- `src/pages/InsightPostPage.jsx`
  - 미존재 시 `<Navigate to="/insights" replace />`
- `src/pages/ComparePage.jsx`
  - 미존재 시 `<Navigate to="/" replace />`
- `src/pages/BusinessCardPage.jsx`, `src/pages/PartnerLandingPage.jsx`
  - notFound에서 `navigate('/')`
- `src/pages/LandingPage.jsx`
  - `navigate('/easy')`, `navigate('/qa?...')` 직접 호출 다수
- `src/pages/QuestionDetailPage.jsx`
  - 공유 복사 `navigator.clipboard.writeText(window.location.href)` (정규화 없음)

결론: 진입 시 파트너였더라도 여러 클릭 후 HQ 기본 URL로 회귀 가능.

### C. 공유/복사 URL 불일치

- `src/components/partner/PartnerShareBar.jsx`
  - `withRef` 기반 query 공유만 수행
  - `window.history.replaceState`로 `?ref`를 주입하나 `/p/[slug]/...` 주소 체계는 미지원
- `src/pages/BlogPostPage.jsx`
  - 공유 URL이 canonical + `withRef` 기반
- `src/pages/QuestionDetailPage.jsx`
  - 단순 `window.location.href` 복사

결론: 주소창 복사/공유 버튼/웹공유 동작이 일관된 partner path 보장을 못함.

### D. SEO canonical/og:url 정책상 파트너 URL 분리 없음

- `src/components/common/SEOHead.jsx`
  - `og:url` = `canonical`로 강제 세팅
- 각 페이지 canonical이 대부분 본문 canonical로 고정되어 있으나,
  partner-context와 share-url 분리 정책이 코드로 분명히 분리되어 있지 않음.

## 4) 어느 링크가 HQ 기본값으로 고정되는가

주요 고정 링크/이동:

- `src/components/layout/Navbar.jsx`: `to="/"`, `to={link.path}`
- `src/components/layout/Footer.jsx`: `to="/"`, `to="/copyright"` 등
- `src/components/common/FloatingButton.jsx`: `/consult`, `/partner`
- `src/components/insight/InsightLayout.jsx`: `/`, `/insights`, `/qa`, `/glossary`, `/phlorotannin`, `/safety`, `/research-timeline` 등
- `src/pages/InsightsHubPage.jsx`: `/`, `/insights/:slug`
- `src/pages/HomePage.jsx`: `/easy`, `/insights`, `/phlorotannin`, `/partner`, `/consult` 등 고정 링크 혼재
- `src/pages/LandingPage.jsx`: navigate 고정 경로 다수

## 5) 어떤 버튼/기능이 canonical URL 또는 기본 URL을 사용하나

- `src/components/common/SEOHead.jsx`: `og:url = canonical`
- `src/pages/BlogPostPage.jsx`: 공유 URL 생성 시 canonical 베이스 사용
- `src/pages/QuestionDetailPage.jsx`: 복사 시 현재 URL 직접 복사 (partnerized 변환 없음)

## 6) query 파라미터를 잃거나 파트너 문맥이 끊길 수 있는 리다이렉트

- `src/pages/BlogPostPage.jsx`: `navigate('/blog', { replace: true })`
- `src/pages/InsightPostPage.jsx`: `<Navigate to="/insights" replace />`
- `src/pages/ComparePage.jsx`: `<Navigate to="/" replace />`
- `src/pages/BusinessCardPage.jsx`: notFound `navigate('/')`
- `src/pages/PartnerLandingPage.jsx`: notFound `navigate('/')`

이동 시 `?ref` 또는 향후 `/p/[slug]` 문맥을 잃을 수 있음.

## 7) 기존 파트너 데이터 구조/전자명함 라우트 현황

- 파트너 데이터 파일:
  - `public/partners.json` (slug, name, phone, phoneDisplay, siteUrl...)
  - `src/config/partner.js` (기본 파트너 env)
- Supabase 파트너 조회 로직:
  - `src/context/PartnerContext.jsx`
  - `src/pages/BusinessCardPage.jsx`
- 전자명함 라우트:
  - 현재 `/p/:phone` 사용
  - slug 문자열 파트너 아이덴티티를 URL 전역 아카이브로 확장하는 구조는 미구현

## 8) 수정이 필요한 컴포넌트/파일 (정확 경로)

### 라우팅/컨텍스트/유틸

- `src/App.jsx`
- `src/context/PartnerContext.jsx`
- `src/lib/partnerRef.js` (신규 시스템으로 대체 또는 래핑)
- `src/main.jsx` (PartnerProvider 중복 여부 정리 필요)

신규 생성 예정:

- `src/lib/partner/partnerContext.ts`
- `src/lib/partner/partnerizeHref.ts`
- `src/lib/partner/resolvePartner.ts`
- `src/lib/partner/partnerStorage.ts`
- `src/lib/partner/partnerRoutes.ts`

### 파트너 모델/페이지/쉘/CTA

- `src/data/partners.ts` (신규)
- `src/pages/BusinessCardPage.jsx` (또는 `/p/[partnerSlug]` 신규 page)
- `src/components/partner/PartnerArchiveShell.tsx` (신규)
- `src/components/partner/PartnerSharePanel.tsx` (신규)
- `src/components/partner/PartnerContactCTA.tsx` (신규)
- `src/components/partner/PartnerArchiveDashboard.tsx` (신규)

### 링크 전파가 필요한 주요 UI

- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/common/FloatingButton.jsx`
- `src/components/insight/InsightLayout.jsx`
- `src/components/common/CategoryGrid.jsx`
- `src/components/common/CategoryHeroBanner.jsx`
- `src/components/qa/RelatedQA.jsx`
- `src/components/qa/RelatedBlogPosts.jsx`

### 페이지별 partner-aware 적용

- `src/pages/HomePage.jsx`
- `src/pages/LandingPage.jsx`
- `src/pages/EasyHealthPage.jsx`
- `src/pages/BlogPage.jsx`
- `src/pages/BlogPostPage.jsx`
- `src/pages/QAPage.jsx`
- `src/pages/QuestionDetailPage.jsx`
- `src/pages/QATagPage.jsx`
- `src/pages/CategoryPage.jsx`
- `src/pages/InsightsHubPage.jsx`
- `src/pages/InsightPostPage.jsx`
- `src/pages/ConsultPage.jsx` (partner card 우선 노출용)

### SEO/사이트맵/검증

- `src/components/common/SEOHead.jsx`
- `generate_sitemap_rss.py` (partner path를 sitemap에 넣지 않도록 정책 고정)
- `scripts/partner-route-audit.mjs` (신규)

## 9) 이번 작업에서 건드리지 말아야 할 파일 (요구사항 기준)

파트너 귀속 복구 목적과 무관하거나 기존 복구 작업 안전성을 위해 비대상:

- Q&A 복구 데이터/검수 스크립트
  - `scripts/restore_qa_answers_from_legacy.mjs`
  - `scripts/qa-no-blank-answer-audit.mjs`
  - `scripts/qa-answer-hard-validator.mjs`
  - `scripts/qa-duplicate-template-detector.mjs`
- Q&A 원본 대량 데이터
  - `src/data/qa.json`
  - `public/qa.json`
- 기존 SEO 결과 산출물(최종 단계 전 재생성 전까지 직접 수작업 수정 금지)
  - `public/sitemap.xml`
  - `public/rss.xml`
  - `public/tagIndex.json`

## 10) 결론 (현 상태)

현재 구현은 `?ref=phone` 보조 방식 중심이며, `/p/[partnerSlug]/...` 전역 아카이브 경로 보존 구조가 없다. 이 때문에 주소창 공유/내부 이동/리다이렉트 시 HQ 기본 URL로 회귀할 수 있고, 파트너 귀속이 일관되게 유지되지 않는다.

따라서 다음 단계는:

1. partner context를 path > query(`pt`,`ref`) > cookie/localStorage 3계층으로 재구축
2. `/p/[partnerSlug]/...` 아카이브 미러 라우트를 도입
3. 모든 내부 링크/공유/CTA를 partnerize 함수로 강제
4. canonical과 social URL을 분리해 SEO 중복을 막으면서 파트너 공유 가치를 유지
