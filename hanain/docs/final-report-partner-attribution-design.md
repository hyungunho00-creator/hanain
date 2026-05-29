# 파트너 귀속/아카이브 디자인 최종 보고서

작성일: 2026-05-29
브랜치: rescue/qa-answer-restore-20260529-1555
도메인: https://phlorotannin.com

## 1. 현재 파트너 정보가 사라지던 원인
- 기존 구조가 `?ref=` 중심이라 주소창 기본 경로(`/blog/...`, `/q/...`)로 이동 시 파트너 정보가 쉽게 소실되었습니다.
- `/p/[partnerSlug]/...` 미러 라우트가 부족했고, 일부 리다이렉트/내부 링크가 본사 기본 경로를 사용했습니다.
- 공유/복사 동작이 파트너 보존 URL을 일관되게 강제하지 못했습니다.

## 2. 수정한 라우팅 구조
- `src/App.jsx`에 파트너 보존 미러 라우트를 추가/정비했습니다.
- 핵심 추가 경로:
  - `/p/:partnerSlug`
  - `/p/:partnerSlug/home`
  - `/p/:partnerSlug/easy`
  - `/p/:partnerSlug/blog/:slug`
  - `/p/:partnerSlug/q/:slug`
  - `/p/:partnerSlug/qa/tag/:tag`
  - `/p/:partnerSlug/category/:slug`
  - `/p/:partnerSlug/insights/:slug`

## 3. 추가한 파트너 URL 구조
- 기본: `/p/[partnerSlug]/...`
- 쿼리 유입: `?pt=[partnerSlug]`, `?ref=[partnerSlug]`
- 쿼리 유입 시 파트너 컨텍스트를 복원하고 내부 이동은 파트너 경로 우선으로 유지합니다.

## 4. 추가한 partner context 로직
- 경로 우선순위: `path > query(pt/ref) > cookie/localStorage`
- 파일:
  - `src/lib/partner/partnerContext.ts`
  - `src/lib/partner/resolvePartner.ts`
  - `src/lib/partner/partnerStorage.ts`
  - `src/lib/partner/partnerRoutes.ts`
  - `src/context/PartnerContext.jsx`
- 저장 키:
  - cookie: `ph_partner` (30일)
  - localStorage: `ph_partner`
- 일반 URL 진입 시 파트너 컨텍스트가 있으면 `/p/[slug]/...`로 보정합니다.

## 5. 수정한 header/footer/link/share/contact 컴포넌트
- 링크 보존 유틸:
  - `src/lib/partner/partnerizeHref.ts`
  - `src/lib/partnerRef.js`
- 파트너 셸/공유/CTA:
  - `src/components/partner/PartnerArchiveShell.tsx`
  - `src/components/partner/PartnerSharePanel.tsx`
  - `src/components/partner/PartnerContactCTA.tsx`
  - `src/components/partner/PartnerShareBar.jsx` (신규 패널 래핑)
- 주요 링크 보존 반영:
  - navbar/footer/floating/category/insight/blog/q 페이지 다수

## 6. 전자 명함 페이지 구현 내용
- `src/pages/BusinessCardPage.jsx`를 파트너 전자 명함 게이트웨이로 정리했습니다.
- 포함 섹션:
  - 파트너 아이덴티티 카드
  - 연락 CTA(전화/문자/카카오/카페/밴드/명함 저장)
  - 아카이브 게이트웨이 카드
  - 파트너 공유 패널
  - 신뢰 안내문/성분 안내문

## 7. 파트너 배지/리본/모바일 CTA 디자인
- `PartnerArchiveShell`에서 파트너 컨텍스트 활성 시:
  - 상단 리본: “공유 파트너: [이름]”
  - 하단 모바일 스티키 CTA: 전화/문자/카카오/명함
  - 하단 파트너 카드: 공유 파트너 정보 + HQ 출처 라인

## 8. 블로그/Q&A/인사이트 상세페이지 파트너 표시 방식
- 공통 파트너 셸로 상세 페이지 전반에 파트너 리본/공유 패널/하단 CTA를 표시합니다.
- Q 상세/카테고리/태그/인사이트 레이아웃에 공유 패널을 추가했습니다.

## 9. 카테고리/태그 페이지 파트너 공유 방식
- `CategoryPage`, `QATagPage`에 공유 패널을 반영했습니다.
- 내부 링크는 `withRef` 기반 파트너 URL 보존 구조를 유지합니다.

## 10. 주소창 공유 시 파트너 정보 유지 테스트 결과
- `scripts/partner-route-audit.mjs` 실행 결과 PASS.
- `/p/demo` 시작 라우트들과 주요 파생 경로에서 파트너 경로 보존이 확인되었습니다.

## 11. 카카오/문자/클립보드 공유 테스트 결과
- `PartnerSharePanel` 기준:
  - 클립보드 복사: 파트너 보존 URL 생성
  - 문자 공유: 파트너 보존 URL 포함
  - 카카오 공유: 파트너 보존 URL 포함
  - Web Share API: 파트너 보존 URL 포함

## 12. vCard 명함 저장 구현 여부
- 구현 완료:
  - API: `api/vcard/[partnerSlug].js`
  - UI: `PartnerContactCTA`에서 API 우선 다운로드, 실패 시 로컬 vCard fallback

## 13. canonical/noindex/SEO 중복 방지 처리
- canonical은 기존 원본 콘텐츠 URL 유지(비파트너 URL 기준).
- 파트너 컨텍스트에서 `og:url`은 현재 파트너 URL로 갱신.
- `/p/...` 경로에서는 robots `noindex, follow` 적용(파트너 셸에서 보강).
- Product/price/review/rating schema는 추가하지 않았습니다.

## 14. build 결과
- `npm.cmd run build` 성공.
- 번들 크기 경고는 존재하나 빌드는 통과했습니다.

## 15. partner-route-audit 결과
- `node scripts/partner-route-audit.mjs` 결과: PASS
- 결과 문서: `docs/partner-route-audit-result.md`

## 16. 남은 이슈
- `npm.cmd run lint`는 에러 없이 통과하지만 기존 코드베이스 경고(주로 hook 패턴/unused vars)가 다수 남아 있습니다.
- 수동 브라우저 QA(실제 모바일 클릭 플로우)는 추가 점검 권장입니다.

## 17. 다음 디자인 개선 제안
- 파트너별 테마 컬러를 헤더 배지/CTA에 반영해 개인화 강화를 제안합니다.
- `/p/[slug]`에서 최근 공유 콘텐츠 미리보기(최근 3개)를 카드형으로 확장하면 공유 전환율에 유리합니다.
- 파트너 컨텍스트 복원 이벤트 대시보드를 운영 화면에 추가하면 운영 모니터링이 쉬워집니다.
