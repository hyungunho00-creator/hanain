# Bad Category Answer Generator Report

- generatedAt: 2026-05-29
- scope: `public/qa.json`, `src/data/qa.json`, `scripts/*`, `src/pages/*`

## 1) 발견한 generator/fallback 경로

- `scripts/content_recall_rewrite_qa.mjs`
  - 템플릿 문구 포함(`지속 가능한 작은 루틴`, `에 대한 실전 답은`, `현재 상태를 구조화해`)
  - 상태: `ALLOW_QA_TEMPLATE_REWRITE=1` 없으면 즉시 종료하도록 차단됨
- `scripts/qa_emergency_precision_patch.mjs`
  - 카테고리 기반 문구 생성 템플릿 포함
  - 상태: `ALLOW_QA_TEMPLATE_REWRITE=1` 없으면 즉시 종료하도록 차단됨
- `scripts/qa_constitution_upgrade.mjs`
  - 레거시 자동 생성기
  - 상태: `ALLOW_LEGACY_QA_GENERATOR=1` 없으면 즉시 종료
- `scripts/qa_expand_contextual_depth.py`
  - 레거시 자동 생성기
  - 상태: `ALLOW_LEGACY_QA_GENERATOR=1` 없으면 즉시 종료

## 2) 오염 데이터 영향

- 전체 Q&A: 1741
- `validated`: 6
- `needs_review`: 1735
- 조치: `needs_review` 항목은 `validatedAnswer=null` 및 `answer=""`로 잠금

## 3) 반복 문구 검출 키워드

- `정신건강/수면 문제 질문은`
- `근골격 맥락에서`
- `대사질환 맥락에서`
- `증상, 검사, 치료, 생활요인을 함께 봐야`
- `현재 상태를 구조화해`
- `무엇을 먼저 확인할지`
- `에 대한 실전 답은`
- `작은 루틴`
- `관리형 질문`

## 4) 제거/격리 방식

- 렌더링 fallback 답변 생성 제거(상세/목록/태그 페이지)
- 공개 조건을 `qualityStatus=validated && validatedAnswer 존재`로 고정
- 비검증 글은 본문 미노출 + 검수중 안내 + noindex
- sitemap/RSS에서 validated Q&A만 반영

## 5) 재발 방지

- 하드 검증 스크립트: `scripts/qa-answer-hard-validator.mjs`
- 중복 템플릿 탐지: `scripts/qa-duplicate-template-detector.mjs`
- prebuild 게이트에 두 스크립트 연결 완료
