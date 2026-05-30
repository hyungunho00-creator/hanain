# 파트너 데이터 소스 보고서

작성일: 2026-05-30

## 1) 파트너 데이터 원본 위치
- 정적 TS: `src/data/partners.ts`
- 정적 JSON: `public/partners.json`
- 동적 DB: Supabase `public.partners`
- 동적 API: `api/partners/[partnerSlug].js`
- vCard API: `api/vcard/[partnerSlug].js`
- 관리자 등록 경로: `src/pages/AdminPage.jsx` + `api/admin.js` (`partner_upsert`)

## 2) 기존/신규 파트너 저장소 일치 여부
- 기존 파트너: 정적 JSON + DB에 중복 존재
- 신규 파트너: DB에는 존재하나 정적 JSON에 즉시 반영되지 않는 케이스 확인
- 수치 확인:
  - `public/partners.json`: 31
  - Supabase `partners`: 48

## 3) 신규 파트너 실패의 핵심 구조
- 기존 구조에서 정적 소스 의존 시 DB에만 있는 신규 파트너를 찾지 못함
- slug 형식이 `01056528206` / `010-5652-8206` / `p/01056528206` 등으로 들어오면 매칭 실패 가능성 존재

## 4) 등록 후 빌드 필요 구조 여부
- 사이트는 SPA로 경로 자체는 빌드 없이 매칭 가능
- 문제는 "정적 데이터만 조회"일 때 신규 파트너 누락
- 해결 방향: 동적 조회(API/Supabase)를 우선 또는 fallback으로 사용

## 5) 필터 조건(active/visible/approved)
- DB 기본 필드: `status`
- 해석 규칙:
  - `status === active` 또는 `active=true`를 공개 가능 기준으로 사용
  - `visible`, `approved` 컬럼이 없으면 기본 true로 간주
- 반환 상태 분리:
  - `partner_not_found`
  - `partner_inactive`
  - `partner_slug_mismatch`
  - `partner_source_error`

## 6) slug / phone 정규화 방식
- 신규 유틸: `src/lib/partner/normalizePartnerSlug.ts`
- 처리 규칙:
  - trim
  - decodeURIComponent
  - 소문자
  - `/p/` prefix 및 URL prefix 제거
  - 전화번호는 숫자만 추출
  - `82`/`0082` 국제전화 접두 정규화
  - 하이픈 포함/미포함 alias 후보 모두 생성

## 7) 신규 파트너 제외 원인(실제)
- 정적 JSON 미반영
- slug 형식 차이
- 서버 환경변수 누락 시 동적 조회 실패 가능성

## 8) 이번 수정 요약
- 동적 파트너 조회 API 신설/보강: `api/partners/[partnerSlug].js`
- `resolvePartner`를 정적→JSON→API 순서로 안전 fallback
- slug/alias/phone 정규화 통합
- vCard API도 신규 파트너 동적 조회 지원

## 9) 데이터 변경 안전성
- Supabase production에 대해 DELETE/UPDATE 수행 안 함
- 확인은 SELECT/조회만 수행함
