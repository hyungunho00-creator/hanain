# Final Report - Category Template Answer Reset

- generatedAt: 2026-05-29
- project: phlorotannin.com

## 1) 원인

카테고리 중심 템플릿 생성 스크립트가 질문별 본문을 덮어쓰면서, 질문-답변 불일치가 대량 발생했습니다.

## 2) bad generator 위치

- `scripts/content_recall_rewrite_qa.mjs`
- `scripts/qa_emergency_precision_patch.mjs`
- `scripts/qa_constitution_upgrade.mjs` (legacy)
- `scripts/qa_expand_contextual_depth.py` (legacy)

## 3) 제거/차단한 fallback 로직

- `src/pages/QuestionDetailPage.jsx`
  - validated 답변만 본문 렌더링
  - 비검증 글은 검수 안내 + `noindex`
- `src/pages/QAPage.jsx`
  - validated Q&A만 목록/FAQ schema 구성
- `src/pages/QATagPage.jsx`
  - validated Q&A만 태그 목록/FAQ schema 구성
- `src/pages/HomePage.jsx`, `src/pages/CategoryPage.jsx`
  - featured/search/listing 경로 validated-only 보강

## 4) 공개 상태 집계

- total Q&A: 1741
- validated 공개: 6
- needs_review 비공개: 1735

## 5) 스모크 테스트 6건

- `ms_076` 건강한 척추를 위한 수면 자세는?
- `ms_053` 반달(반월판) 연골 손상은 어떻게 치료하나요?
- `ms_071` 어깨 탈구 후 관리 방법은?
- `ms_057` 체외충격파 치료란 무엇인가요?
- `ms_022` 디스크 예방을 위한 올바른 자세는?
- `qa200-20260527-136` 낙상 예방을 위해 집에서 먼저 바꿀 것은 무엇인가요?

## 6) “건강한 척추를 위한 수면 자세는?” 수정 포인트

- 첫 문장을 질문에 직접 답하는 방식으로 교체
- 척추/허리/목/베개/매트리스/무릎 정렬을 본문 초반에 명시
- 진료 필요 신호와 피해야 할 행동을 분리
- 플로로탄닌은 하단 “성분 정보로 함께 보기” 블록으로만 배치

## 7) 플로로탄닌 하단 블록 적용 방식

- 질문 답변 본문 이후에만 노출
- “연구에서 다뤄지는 해양 폴리페놀 원료” 관점 유지
- 치료/예방/완치 표현 금지

## 8) source gap

- sourceStatus 집계: `verified=1741`, `source_gap=0`
- 별도 격리 대상 없음

## 9) Validator 결과

- `node scripts/qa-answer-hard-validator.mjs` -> PASS
- `node scripts/qa-duplicate-template-detector.mjs` -> PASS

## 10) Build 결과

- `npm run build` -> PASS
- `npm run audit:links` -> PASS (HTTP errors 0, dead nav 0)

## 11) 아직 공개하면 안 되는 글

- `qualityStatus !== validated`인 1735건 전체

## 12) 다음 배치 계획

1. 카테고리별 20개 단위 수동 재작성
2. 배치마다 validator 통과 후 validated 승격
3. 승격된 글만 sitemap/RSS 포함

---

최종 사용자 보고 문구:

카테고리별 범용 답변 생성기와 fallback 렌더링을 제거했습니다. 검증된 답변만 공개되도록 qualityStatus와 validatedAnswer 기준을 적용했고, 검증되지 않은 Q&A는 noindex/검수중 처리했습니다. ‘건강한 척추를 위한 수면 자세는?’ 같은 스모크 테스트 글은 질문 첫 문장부터 정확히 답하도록 재작성했으며, 플로로탄닌은 하단 성분 정보 블록으로만 긍정 연결했습니다.
