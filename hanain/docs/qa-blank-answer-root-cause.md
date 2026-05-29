# Q&A Blank Answer Root Cause

## 1) 빈 답변 발생 파일/경로
- `scripts/apply_category_template_hard_reset.mjs`
- `src/pages/QAPage.jsx`
- `src/pages/QuestionDetailPage.jsx`
- `src/pages/QATagPage.jsx`
- `src/pages/CategoryPage.jsx`
- `src/pages/HomePage.jsx`

## 2) 실제 원인
- `apply_category_template_hard_reset.mjs`가 대다수 Q&A를 `qualityStatus=needs_review`, `validatedAnswer=null`, `answer=''`로 리셋.
- 프론트 렌더러가 `validatedAnswer + qualityStatus=validated` 중심으로만 표시.
- 결과적으로 질문/태그/버튼은 보이지만 본문은 비노출(검수 안내만 표시) 상태가 발생.

## 3) 현재 렌더링 조건(복구 후)
- `getRenderableQAAnswer(qa)` 공통 적용:
1. `validatedAnswer`가 유효하면 본문 표시
2. legacy 복구가 통과하면 복구 본문 표시
3. 카테고리형/중복/문법오류/주제불일치 등은 `review_notice` 처리
4. 빈 카드 금지(항상 본문 또는 검수 안내 노출)

## 4) 현재 Q&A 데이터 필드 구조
- 핵심 필드: `qualityStatus`, `validatedAnswer`, `restoredAnswer`, `answerRestoredFrom`, `reviewReason`, `publicBodyMode`, `noindex`
- legacy 후보: `answer`, `body`, `content`, `detailedAnswer`, `markdown`, `sections` 등

## 5) 수치 (public/qa.json 기준)
- 전체 Q&A 수: `1741`
- `validatedAnswer` 없는 Q&A 수: `646`
- legacy 원본 후보(`answer/body/content`) 보유 수: `1095` (`answer=1095`, `body=0`, `content=0`)
- 완전히 답변이 없는 Q&A 수(현행 공개 데이터 기준): `646`
- 즉시 공개 복구 가능한 Q&A 수(검증 통과): `1095`

## 6) 보존 정보
- 검수 차단된 legacy 원문은 삭제 대신 백업:
  - `docs/qa-needs-review-legacy-backup.json`
