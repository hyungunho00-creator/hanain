# Q&A Controlled Rewrite Progress

- Updated: 2026-05-29 (KST)
- Current branch: `rewrite/qa-controlled-audit-init-20260529-2234`
- Safepoint: `safe/qa-before-controlled-rewrite-20260529-2230` (`db147f0`)

## Snapshot
- Total Q&A: 1641
- Audit completed: 1641/1641
- Rewrite candidates: 1043
- Suspected contamination start index: 1301
- Priority range (initial): 1201-1636

## Implemented
- Added answer resolver: `src/lib/qaAnswerResolver.js`
- Applied overlay rendering contract:
  - `answerV2.status=approved` 우선 노출
  - draft/rejected/needs_source는 legacy 유지
  - legacy 없음만 검수중 안내
- Updated pages:
  - `src/pages/QAPage.jsx`
  - `src/pages/QuestionDetailPage.jsx`
  - `src/pages/CategoryPage.jsx`
  - `src/pages/QATagPage.jsx`
- Added scripts:
  - `scripts/rewrite_qa_answer_v2_batch.mjs`
  - `scripts/qa-answer-v2-validator.mjs`
  - `scripts/qa-answer-v2-duplicate-detector.mjs`

## Batch 0 (qa-smoke-10)
- Queue: `data/qa-rewrite-queue-smoke-10.json`
- Apply result:
  - 대상 10
  - answerV2 생성 10
  - approved 9
  - rejected 1 (`ci_063` required-terms-missing-in-first300)
  - needs_source 0
- Report: `docs/batches/qa-smoke-10-report.md`

## Validation
- `node scripts/qa-answer-v2-validator.mjs --batch qa-smoke-10`: PASS (approvedScanned=9)
- `node scripts/qa-answer-v2-duplicate-detector.mjs --batch qa-smoke-10`: PASS
- `node scripts/qa-no-blank-answer-audit.mjs`: PASS (blankPublicAnswers=0)
- `npx vite build`: PASS

## Next Plan
1. `ci_063` 수동 보강 후 smoke 10/10 승인
2. 1200+ 구간 critical 20개 배치 생성
3. 20개 배치에서 같은 파이프라인 적용 후 50개 단위 확장
