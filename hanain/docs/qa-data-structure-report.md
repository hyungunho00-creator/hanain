# Q&A Data Structure Report

- Generated at: 2026-05-29 (KST)
- Safepoint branch: `safe/qa-before-controlled-rewrite-20260529-2230`
- Safepoint commit: `db147f0`

## 1) 데이터 위치
- Primary data: `src/data/qa.json`
- Public runtime copy: `public/qa.json`
- Related scripts: `scripts/qa-*.mjs`, `scripts/qa_*.py`, `scripts/remove_qa_template_blocks.mjs`

## 2) 전체 개수
- Total Q&A: **1641**
- Categories: **13**

## 3) 답변 필드 보유 현황
- `validatedAnswer`: 1641
- `answer`: 1641
- `body`: 0
- `content`: 0
- `shortAnswer`: 0
- `detailedAnswer`: 0
- Any answer candidate present: 1641
- Blank answer rows: 0

## 4) 품질/게이트 필드 현황
- `qualityStatus = validated`: 1641
- `publicBodyMode = validated`: 1641
- `validatedAnswer missing while validated`: 0

## 5) 정렬/구간 분리 가능성
- `index` 필드: 없음
- `createdAt/updatedAt` 필드: 없음
- 현재는 **배열 순서(questions[i])**가 사실상 인덱스 역할
- 구간 분리:
  - 1~1199: 1199개
  - 1200~끝: 442개

## 6) 1200번 이후 식별 방법
- 규칙: `questions` 배열의 0-based index 기준으로 `i >= 1199`
- 샘플:
  - index 1199 (1200번째): `mental-020`
  - index 1200 (1201번째): `ci_096`

## 7) 현재 화면에서 실제 사용하는 답변 필드
- `src/pages/QAPage.jsx`
  - `getValidatedAnswerHtml()`에서 `validatedAnswer || validated_answer`만 사용
  - `isValidatedQa()`에서 `qualityStatus === 'validated' && validatedAnswer`만 통과
- `src/pages/QuestionDetailPage.jsx`
  - `getValidatedAnswerHtml()` 동일
  - fallback도 `validatedAnswer`만 사용
- `src/pages/CategoryPage.jsx`
  - `validatedAnswer`만 사용

즉, 현재 렌더러는 사실상 **validatedAnswer 전용**이며, legacy fallback (`answer/body/content`) 오버레이가 없음.

## 8) answerV2 overlay 추가 시 안전한 위치
- 데이터 저장 위치: `questions[i].answerV2`
- 렌더링 분기 추가 대상:
  - `src/pages/QAPage.jsx`
  - `src/pages/QuestionDetailPage.jsx`
  - `src/pages/CategoryPage.jsx`
  - (필요 시) related Q&A 컴포넌트

권장 렌더 순서:
1. `answerV2.status === 'approved'` 이면 `answerV2` 렌더
2. 아니면 `validatedAnswer || answer || body || content` 렌더
3. 그래도 없으면 검수중 안내

## 9) category별 개수
- cancer_immune: 194
- neuro_cognitive: 150
- metabolism: 139
- cardiovascular: 128
- digestive: 128
- skin: 128
- infection_inflammation: 128
- mental_health: 128
- musculoskeletal: 124
- respiratory: 118
- womens_health: 117
- mens_health: 113
- hair: 46

## 10) 현재 단계 결론
- 현재 데이터는 blank가 아니라, 전체가 validatedAnswer를 보유한 상태
- 다만 품질 오염 가능성은 별도 문제이며, 이는 **읽기 전용 감사 + rewrite queue**로 처리해야 안전
- 다음 단계는 `qa-controlled-audit` 및 `boundary-detector` 스크립트로 오염 구간 계량화
