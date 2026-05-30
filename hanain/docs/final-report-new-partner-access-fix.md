# 최종 보고서 — 신규 파트너 접속 불가("정보가 없습니다") 긴급 수정

작성일: 2026-05-30
브랜치: `fix/new-partner-access-20260530-0844`

## 1. 신규 파트너 접속 실패 원인
- 파트너 데이터가 DB(Supabase)에는 존재하지만 정적 소스(`public/partners.json`, `src/data/partners.ts`)에 즉시 반영되지 않는 구간이 있었음.
- slug 입력 형식(숫자/하이픈/`/p/` prefix) 차이로 매칭 실패 가능성이 있었음.
- 동적 조회 실패 시 상태 분리 없이 단일 실패로 처리되어 원인 파악이 어려웠음.

## 2. partner data source 위치
- 정적: `src/data/partners.ts`, `public/partners.json`
- 동적: Supabase `public.partners`
- 서버 API: `api/partners/[partnerSlug].js`
- vCard: `api/vcard/[partnerSlug].js`

## 3. resolvePartner 수정 내용
- `src/lib/partner/resolvePartner.ts`를 정적→`partners.json`→동적 API fallback 구조로 보강.
- 반환 상태를 분리:
  - `found`
  - `partner_not_found`
  - `partner_inactive`
  - `partner_slug_mismatch`
  - `partner_source_error`
  - `partner_cache_stale`

## 4. slug 정규화 방식
- `src/lib/partner/normalizePartnerSlug.ts` 신규 추가.
- `01056528206`, `010-5652-8206`, `010 5652 8206`, `/p/01056528206` 등을 동일 후보군으로 정규화.
- `82`/`0082` 접두 국제전화 숫자 처리 포함.

## 5. 정적 생성 문제 여부
- Next.js 정적 params 구조가 아닌 SPA(Vite + React Router) 구조.
- 따라서 핵심 문제는 "정적 생성 누락"이 아니라 "데이터 조회 경로/slug 정규화" 이슈.

## 6. Supabase / RLS 문제 여부
- 조회(SELECT) 기준으로 신규 파트너 데이터 존재 확인.
- anon 키로 `partners` 조회 가능 상태 확인.
- production DB UPDATE/DELETE는 수행하지 않음.

## 7. cache/revalidate 문제 여부
- `partners.json` 메모리 캐시 TTL(30초) 존재.
- 동적 API 응답은 `Cache-Control: no-store`로 최신 조회 우선.

## 8. "정보 없음" 메시지 개선
- 상태 코드 분리 기반으로 원인 추적 가능하게 로직 정비.
- 방문자용 단일 문구로만 덮지 않고, resolve 상태를 구분 가능한 구조로 변경.

## 9. 테스트 파트너 결과
- `demo-new`, `01011112222`, `010-1111-2222` 경로 모두 정상 라우팅 확인.

## 10. 실제 신규 파트너 결과
- DB 최신 신규 파트너 샘플(정적 JSON 미포함):
  - `01074287589`
  - `01036252589`
  - `01043052880`
- `/p/[slug]`, `/p/[slug]/home`, `/p/[slug]/qa` 경로 정상 확인.

## 11. 기존 파트너 영향 여부
- 기존 파트너 `01098498408` 접속 정상.
- 기존 파트너 경로/링크 구조 유지.

## 12. partner-access-audit 결과
- 실행: `node scripts/partner-access-audit.mjs`
- 결과: PASS (17 routes)
- 보고서: `docs/partner-access-audit-result.md`

## 13. build 결과
- 실행: `npm run build`
- 결과: SUCCESS
- 비고: 프로젝트 기존 린트 누적 오류 다수로 `npm run lint`는 실패(이번 변경 범위 외 기존 누적 이슈).

## 14. 배포 후 확인 URL
- `/p/demo-new`
- `/p/demo-new/home`
- `/p/demo-new/qa`
- `/p/01011112222`
- `/p/010-1111-2222`
- `/p/01074287589` (신규 샘플)

## 15. 앞으로 신규 파트너 등록 절차
1. 관리자에서 파트너 등록(`phone/slug/status=active`).
2. 등록 직후 `/p/[partnerSlug]` 접속 확인.
3. 필요 시 하이픈/숫자형 두 주소 모두 확인.
4. `node scripts/partner-access-audit.mjs` 실행으로 회귀 점검.

## 16. 전자명함 페이지 정책 반영
- 사용자 요청에 따라 전자명함(`BusinessCardPage`)은 **약 1주 전 구조(ab99df4)** 로 원복.
- 디자인 변경 없이 신규 파트너 접근 로직만 수정.

---
최종 사용자 보고 문구:
“신규 파트너가 ‘정보가 없습니다’로 보이던 원인을 확인해 수정했습니다. partnerSlug 정규화, 동적 파트너 조회, active/visible 상태 확인, 정적 라우팅 누락 문제를 점검했고, 신규 파트너도 /p/[partnerSlug]에서 정상 접속되도록 처리했습니다. 기존 파트너 링크와 파트너 귀속 공유 구조도 함께 검증했습니다.”
