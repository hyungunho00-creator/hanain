# 신규 파트너 라우트 감사 보고서

작성일: 2026-05-30

## 1) 라우팅/프레임워크 구조
- 프레임워크: Vite + React 19 + React Router (`src/App.jsx`)
- 서버리스 API: Vercel Functions (`api/*`)
- 파트너 라우트(확인 완료):
  - `/p/:partnerSlug`
  - `/p/:partnerSlug/home`
  - `/p/:partnerSlug/qa`
  - `/p/:partnerSlug/blog/:slug`
  - `/p/:partnerSlug/q/:slug`
  - `/p/:partnerSlug/insights/:slug`
  - `/p/:partnerSlug/category/:slug`
  - `/p/:partnerSlug/qa/tag/:tag`

## 2) partnerSlug 수신 및 해석 위치
- 명함 페이지 slug 수신: `src/pages/BusinessCardPage.jsx` (`useParams`)
- 전역 파트너 컨텍스트 해석: `src/context/PartnerContext.jsx`
- 경로/쿼리/storage 후보 해석: `src/lib/partner/resolvePartner.ts`
- URL 파트너 prefix 처리: `src/lib/partner/partnerRoutes.ts`
- 내부 링크 파트너화: `src/lib/partner/partnerizeHref.ts`, `src/lib/partnerRef.js`

## 3) "정보가 없습니다" 관련 출력 위치
- 명함 페이지에서 파트너 조회 실패 시 출력: `src/pages/BusinessCardPage.jsx`
- API 조회 실패/미존재 상태 반환: `api/partners/[partnerSlug].js`

## 4) 신규 파트너만 실패하던 원인 후보와 실제 원인
- 원인 후보
  - 정적 소스(`src/data/partners.ts`, `public/partners.json`)에 신규 파트너 미반영
  - slug 형식 불일치(숫자/하이픈/공백/`/p/` prefix)
  - API 환경변수 누락 시 동적 조회 실패
- 실제 확인
  - `public/partners.json`: 31명
  - Supabase `partners`: 48명 (신규가 DB에만 존재)
  - 따라서 정적 소스 의존 시 신규 파트너 누락 가능성이 높음

## 5) 정적 생성/동적 생성 여부
- Next.js `generateStaticParams`/`getStaticPaths` 구조 아님
- SPA 라우팅 + API/클라이언트 fetch 구조
- 정적 빌드 누락 문제가 아니라 "데이터 소스/slug 매칭/동적 조회 경로" 문제

## 6) 캐시/리밸리데이트 성격
- `resolvePartner.ts`의 `partners.json` 메모리 캐시 TTL: 30초
- `partners.json` fetch는 `cache: 'no-store'`
- `/api/partners/[partnerSlug]` 응답 헤더: `Cache-Control: no-store`

## 7) 이번 수정 대상 파일
- `src/lib/partner/normalizePartnerSlug.ts` (신규)
- `src/lib/partner/resolvePartner.ts`
- `src/lib/partner/partnerRoutes.ts`
- `src/lib/partner/partnerStorage.ts`
- `src/lib/partner/partnerizeHref.ts`
- `src/lib/partnerRef.js`
- `src/context/PartnerContext.jsx`
- `api/partners/[partnerSlug].js` (신규)
- `api/vcard/[partnerSlug].js`
- `scripts/partner-access-audit.mjs` (신규)

## 8) 건드리지 않기로 한 파일
- Q&A 데이터/렌더링 로직 전체
- 블로그/인사이트 콘텐츠 데이터
- SEO 콘텐츠 본문 데이터
- 사이트 전체 라우팅 정책 자체(기존 파트너 경로 유지)

## 9) 전자명함 페이지 정책
- 사용자 요청에 따라 전자명함 페이지는 `ab99df4` 기준(약 1주 전) 구조로 원복함
- 신규 파트너 접속 문제는 명함 디자인 변경 없이 데이터 조회/slug 정규화/API 경로에서 해결
