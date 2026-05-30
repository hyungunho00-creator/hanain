# 최종 보고서 — 파트너 전자명함 프로세스 긴급 복구

작성일: 2026-05-30
브랜치: `fix/restore-partner-card-flow`

## 1) 신규 파트너 접속 불가 원인
- 신규 파트너 데이터가 Supabase에는 존재하지만 정적 소스(`partners.json`/`partners.ts`)와 시점 차이가 발생할 수 있었음.
- slug 입력이 `01056528206` / `010-5652-8206`처럼 달라질 때 정규화가 약하면 매칭 실패 가능성이 있었음.
- 조회 실패 상태가 단일 문구로 처리되어 원인 분리가 어려웠음.

## 2) 복구한 과거 커밋/파일
- 전자명함 페이지는 과거 정상 구조로 복원:
  - 커밋: `ab99df4`
  - 파일: `src/pages/BusinessCardPage.jsx`
- 복원 이유:
  - 명함 디자인
  - QR 표시
  - 명함 이미지 다운로드(앞/뒤 합성)
  - 전단지/명함 공유 흐름이 해당 파일에 이미 안정적으로 구현되어 있었음.

## 3) 복구한 명함 컴포넌트
- 파일: `src/pages/BusinessCardPage.jsx`
- 복구/유지 기능:
  - 파트너 이름/연락처/소개
  - 카드 앞면/뒷면 Canvas 렌더링
  - 모바일 명함 UI
  - 파트너 문의 버튼(전화/문자)

## 4) 복구한 QR 기능
- 파일: `src/pages/BusinessCardPage.jsx`
- 기능:
  - 화면 QR 렌더링 (`QRCode`)
  - 다운로드 이미지 내 QR 합성 (`drawFront`, `drawBack`)
  - QR 목적지: 해당 파트너 페이지 URL (`/p/[partnerSlug]`)

## 5) 복구한 명함 이미지 다운로드 기능
- 파일: `src/pages/BusinessCardPage.jsx`
- 기능:
  - `downloadCard`로 앞/뒤 면을 한 장 이미지로 결합
  - 다운로드 파일명에 파트너 식별 정보 포함
  - 이미지 안에 파트너 정보 + QR 동시 포함

## 6) 전단지 QR 연결 확인 결과
- 카드 URL 기준으로 QR 생성 구조 유지 확인.
- vCard API 확인 결과:
  - `api/vcard/[partnerSlug].js` 응답 정상(200)
  - 본문에 `URL:https://phlorotannin.com/p/[partnerSlug]` 포함 확인

## 7) 기존 파트너 테스트 결과
- 샘플: `01098498408`
- 결과:
  - 파트너 조회 API: `found` (200)
  - vCard 다운로드 API: 200
  - 파트너 경로 접속: PASS (`partner-access-audit`)

## 8) 신규 파트너 테스트 결과
- 샘플(실데이터): `01074287589`
- 결과:
  - 파트너 조회 API: `found` (200)
  - vCard 다운로드 API: 200
  - 파트너 경로 접속: PASS (`partner-access-audit`)

## 9) 전화번호 slug 변형 테스트 결과
- 샘플: `010-7428-7589`
- 결과:
  - 파트너 조회 API: `found` (정규화되어 `01074287589`로 매칭)
  - vCard 다운로드 API: 200
  - `/p/010-7428-7589` 경로 접속: PASS

## 10) 신규 파트너 접속 복구를 위한 핵심 수정
- `src/lib/partner/normalizePartnerSlug.ts` 추가
- `src/lib/partner/resolvePartner.ts` 보강 (정적→JSON→API fallback)
- `api/partners/[partnerSlug].js` 추가 (동적 조회 + 상태 분리)
- `api/vcard/[partnerSlug].js` 보강 (신규 파트너 동적 조회 대응)

## 11) 라우팅/접속 감사 결과
- 스크립트: `scripts/partner-access-audit.mjs`
- 결과 문서: `docs/partner-access-audit-result.md`
- 요약: 기존/신규/전화번호 변형 포함 17개 경로 PASS

## 12) build 결과
- 명령: `npm run build`
- 결과: SUCCESS
- 참고: 프로젝트 prebuild 단계에서 사이트맵/리포트 자동 생성이 실행되나, 이번 복구 범위와 무관한 생성 산출물은 작업 범위에서 제외함.

## 13) 비고 (요청사항 준수)
- Q&A/블로그/SEO 콘텐츠 수정 없음
- 디자인 전체 개편 없음
- PWA/푸시 신규 기능 추가 없음
- 신규 시스템 재구축이 아니라 과거 정상 명함 플로우 우선 복구
