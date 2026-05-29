# Bad Content Generator Report

- generatedAt: 2026-05-29
- scope: Q&A 리콜 오염 원인 분석

## 1) bad generator 식별

아래 스크립트들이 반복 템플릿 문구를 생성/삽입한 주요 원인으로 확인됨:

1. `scripts/qa_constitution_upgrade.mjs`
   - 문제 함수군: 템플릿 문장 조립 블록(`BASE_PARAGRAPHS`, 키워드 확장 문구, `...에 대한 실전 답은` 계열)
   - 오염 타입: Q&A 본문 직접 재작성
2. `scripts/qa_expand_contextual_depth.py`
   - 문제 함수: `build_context_block(...)`
   - 오염 타입: `<div class="qa-context-depth">` 공통 블록 대량 삽입
3. `scripts/qa_refine_v3.py`
   - 문제 함수군: 후행 문단 강제 삽입/교체 로직
   - 오염 타입: 유사 CTA/루틴형 문장 반복
4. `scripts/qa_expand_asset_content.py`
   - 문제 함수군: 카테고리 공통 문단 확장
   - 오염 타입: 질문 무관 범용 문장 반복
5. `scripts/reframe_phlorotannin_tone.mjs`
   - 문제 함수군: 톤 리프레이밍 일괄 치환
   - 오염 타입: 질문 맥락보다 문체 우선 치환

## 2) 오염 증거(스캔 기준)

- 스캔 파일: `reports/bad_phrase_scan.txt`
- 오염 흔적(리콜 전 기준):
  - `public/qa.json`: 1741 라인 매치
  - `src/data/qa.json`: 1741 라인 매치
- 대표 반복 문구:
  - `거창한 계획보다`
  - `지속 가능한 작은 루틴`
  - `관리형 질문`
  - `이번 질문의 핵심 키워드`
  - `성분명과 제품명, 연구 데이터`
  - `...에 대한 실전 답은`

## 3) 어떤 콘텐츠가 오염됐는가

- 1순위 오염: Q&A(`public/qa.json`, `src/data/qa.json`) 거의 전수
- 2순위 파생 오염: RSS description (`public/rss.xml`) 일부 문구 반영
- 카테고리 영향: 13개 카테고리 전반

## 4) 즉시 조치

다음 스크립트는 기본 실행 차단 상태로 변경:

- `qa_constitution_upgrade.mjs`
- `qa_expand_contextual_depth.py`
- `qa_refine_v3.py`
- `qa_expand_asset_content.py`
- `reframe_phlorotannin_tone.mjs`

차단 방식:

- 환경변수 `ALLOW_LEGACY_QA_GENERATOR=1` 없으면 `process.exit(1)` / `sys.exit(1)`
- 안내 메시지로 `scripts/content_recall_rewrite_qa.mjs` 사용 유도

## 5) 대체/복구 방식

- 대체 재작성기: `scripts/content_recall_rewrite_qa.mjs`
  - 질문 직접 답변 우선 구조로 전수 재작성
  - 금지 문구 제거
  - 플로로탄닌은 하단 블록으로만 배치
  - `rewrittenAt`, `reviewed`, `qualityStatus`, `sourceStatus` 필드 부여

