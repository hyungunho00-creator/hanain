# Final Report: QA Answer Restore

## 1. 답변이 사라진 원인
- `scripts/apply_category_template_hard_reset.mjs`에서 대다수 Q&A를 `needs_review + validatedAnswer=null + answer=''`로 리셋.
- 프론트가 validated 전용 렌더에 묶여 legacy 필드(`answer/body/content`)를 읽지 못해 본문이 사라짐.

## 2. 렌더링에서 잘못 읽고 있던 필드
- 기존: `validatedAnswer`만 우선 사용, `qualityStatus=validated` 외 비노출.
- 복구: `src/lib/qaAnswer.js`의 `getRenderableQAAnswer()`로 `validated/restored/review_notice` 공통 처리.

## 3. 복구한 답변 원본 필드
- `validatedAnswer`, `restoredAnswer`, `answer`, `body`, `content`, `detailedAnswer`, `markdown`, `sections`
- 리셋 전 백업 소스:
  - `reports/qa_before_constitution_*.json`
  - git history (`573b036`)
  - Supabase `qa_questions.answer` (SELECT 확인)

## 4. 전체 Q&A 수
- `1741`

## 5. validatedAnswer로 승격한 수
- `1095`

## 6. restoredAnswer로 복구한 수
- `0` (최종 공개본은 `validatedAnswer`로 통일)

## 7. needs_review 처리한 수
- `646`

## 8. 완전 빈 답변 수
- 공개 본문 기준 `0`
- 데이터셋에서 `needs_review` 항목은 본문 대신 검수 안내로 처리

## 9. 암/면역 카테고리 복구 결과
- 복구 완료:
  - `ci_063` (암 유전자 검사 NGS)
  - `qa200-20260527-027` (암환자 식욕 저하 식사 분할)
  - `ci_066` (종양 용해 증후군)
- 모두 `qualityStatus=validated`, 섹션형 답변 + 하단 성분 정보 블록 반영.

## 10. 스모크 테스트 6개 결과
- 통과(본문 노출/직답/섹션 구조 확인):
  - `ms_076`, `ms_053`, `ms_071`, `ms_057`, `ms_022`, `qa200-20260527-136`

## 11. qa-no-blank-answer-audit 결과
- `docs/qa-no-blank-answer-audit-result.md`
- 결과: `PASS`
- 핵심: `blankPublicAnswers=0`

## 12. qa-answer-hard-validator 결과
- `docs/qa-answer-hard-validator-result.md`
- 결과: `PASS`
- 카테고리형 금지 문구 및 `?에 대한` 문법 패턴 차단 확인.

## 13. build 결과
- `npm.cmd run build` 성공
- prebuild 게이트(`reader-content-audit`, hard-validator, duplicate detector) 통과

## 14. partner attribution 유지 여부
- 유지/보강:
  - `src/pages/QAPage.jsx`
  - `src/pages/QuestionDetailPage.jsx`
  - `src/pages/CategoryPage.jsx`
  - `src/pages/HomePage.jsx`
  - `src/pages/QATagPage.jsx`
- 내부 링크/탐색 경로에서 `withRef()` 적용 확장.

## 15. 아직 수동 검수가 필요한 글 목록
- 총 `646`건 (`qualityStatus=needs_review`)
- 전체 원문 백업: `docs/qa-needs-review-legacy-backup.json`
- 대표 예시:
  - `cardio-003` 심근경색은 어떻게 예방할 수 있나요?
  - `cardio-005` 좋은 콜레스테롤(HDL)을 높이는 방법이 있나요?
  - `cardio-010` 관상동맥 스텐트 시술 후 재협착을 예방하는 방법은?
  - `meta-004` LDL 콜레스테롤이 200을 넘었는데 어떻게 해야 하나요?
  - `meta_028` 혈당 스파이크란 무엇이고 어떻게 예방하나요?

## 16. 다음 배치 복구 계획
1. `needs_review` 646건을 카테고리별(심혈관/대사/항암 등)로 배치 분할
2. 중복 템플릿/범용 문구를 제거한 개별 직답형 재작성
3. 하드 validator + no-blank audit 재실행 후 단계적 공개
4. 배치별 QA schema/noindex 상태 점검 후 sitemap 반영

---

Q&A 답변이 보이지 않던 원인은 검증 게이트가 기존 answer/body/content 필드를 읽지 못했기 때문입니다. 기존 답변 원본을 찾아 validatedAnswer/restoredAnswer로 복구했고, 공개 Q&A에서 빈 본문이 나오지 않도록 qa-no-blank-answer-audit를 추가했습니다. 카테고리형 범용 답변은 validator로 차단하고, 플로로탄닌은 각 답변 하단의 성분 정보 블록으로만 연결했습니다.
