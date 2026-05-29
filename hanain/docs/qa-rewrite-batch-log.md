# QA Rewrite Batch Log

## Batch 0 - Emergency Lock

- date: 2026-05-29
- action:
  1. category-template generator 실행 경로 차단
  2. fallback 답변 렌더링 제거
  3. 전체 Q&A를 `needs_review` 기준으로 잠금
  4. 스모크 6건만 수동 검증 답변(`validatedAnswer`) 적용

### 결과

- total scanned: 1741
- validated: 6
- needs_review (hidden): 1735
- source_gap: 0
- publishable: 6
- hidden: 1735

### validated slug 목록

- `건강한척추를위한수면자세는` (`ms_076`)
- `반달반월판연골손상은어떻게치료하나요` (`ms_053`)
- `어깨탈구후관리방법은` (`ms_071`)
- `체외충격파치료란무엇인가요` (`ms_057`)
- `디스크예방을위한올바른자세는` (`ms_022`)
- `낙상예방을위해집에서먼저바꿀것은무엇인가요` (`qa200-20260527-136`)

## Batch 1 - Render Gate Hardening

- date: 2026-05-29
- action:
  - `/q/[slug]`, `/qa`, `/qa/tag/[tag]` validated-only 렌더링
  - Home/Category 페이지에서도 validated-only 노출 보강
  - `needs_review` 본문 노출 경로 제거

### 결과

- hard validator: PASS
- duplicate detector: PASS
- build: PASS
- links audit: PASS
