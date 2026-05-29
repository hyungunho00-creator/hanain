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
  - approved 10
  - rejected 0
  - needs_source 0
- Report: `docs/batches/qa-smoke-10-report.md`

## Validation
- `node scripts/qa-answer-v2-validator.mjs --batch qa-smoke-10`: PASS (approvedScanned=10)
- `node scripts/qa-answer-v2-duplicate-detector.mjs --batch qa-smoke-10`: PASS
- `node scripts/qa-no-blank-answer-audit.mjs`: PASS (blankPublicAnswers=0)
- `npm.cmd run build`: FAIL (pre-existing `scripts/prebuild.cjs` reader-content strict audit, `src/data/qa.json`의 기존 문구 다수 감지)

## Next Plan
1. 1200+ 구간 critical 20개 배치 생성
2. 20개 배치 dry-run -> apply -> validator/duplicate/no-blank 순차 실행
3. prebuild strict audit(기존 문구) 처리 전략 분리 후 build green 확보

## Batch 1 Preflight (qa-1200-critical-20)
- Queue batch: `qa-1200-critical-20` (1200+ 고위험 20개)
- Selection artifact: `docs/batches/qa-1200-critical-20-selection.json`
- Dry-run result (`node scripts/rewrite_qa_answer_v2_batch.mjs --batch qa-1200-critical-20 --dry-run`):
  - 대상 20
  - approved 0
  - rejected 20
  - 주요 실패: `required-terms-missing-in-first300` (20/20)
- 해석:
  - 현재 자동 초안(legacy 기반)만으로는 질문 직답/핵심어 포함 기준을 충족하지 못함
  - 다음 단계는 20개를 우선 `answerV2` 수동 보강(질문 직접 답변형 첫 문장 + 핵심어 first300 강제) 후 apply
