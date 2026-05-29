# Q&A Answer V2 Writing Standard

- Scope: `answerV2` 작성/검수 기준
- Principle: 기존 `answer/body/content`는 보존, `answerV2.status=approved`만 우선 노출

## 1) 첫 문장 규칙
- 첫 문장은 질문에 직접 답한다.
- 카테고리 설명으로 시작하지 않는다.
- 질문 핵심어를 첫 300자 안에 포함한다.

## 2) 금지 템플릿
- 근골격 맥락에서
- 정신건강/수면 문제 질문은
- 대사질환 맥락에서
- 항암·면역 맥락에서
- 소화·간 맥락에서
- 심혈관 맥락에서
- 뇌·인지 맥락에서
- 피부/모발 맥락에서
- 증상, 검사, 치료, 생활요인을 함께 봐야
- 현재 상태를 구조화
- 무엇을 먼저 확인할지
- 실전 답은
- ?에 대한 / 은?에 대한 / 는?에 대한 / 요?에 대한

## 3) 섹션 구조
- 짧은 답변
- 자세히 보면
- 먼저 확인할 것
- 진료가 필요한 경우
- 피해야 할 것
- 생활관리 팁
- 성분 정보로 함께 보기
- 안내문

## 4) 의료 안전성
- 의료성 질문은 반드시 진료 기준(레드플래그)을 포함한다.
- 자가관리 한계와 의료진 상담 우선 문구를 명시한다.
- 출처가 없으면 `sourceStatus: source_gap`로 표기한다.

## 5) 플로로탄닌 배치 규칙
- 본문 첫 문단 배치 금지
- 하단 `성분 정보로 함께 보기` 블록에서만 연결
- 치료/예방/개선 단정 표현 금지

## 6) answerV2 상태 규칙
- `draft`: 작성 중, legacy 답변 유지 노출
- `approved`: 렌더 우선 노출 가능
- `rejected`: legacy 답변 유지
- `needs_source`: 출처 보강 전까지 legacy 유지

## 7) 렌더링 계약
1. `answerV2.status === approved` -> `answerV2` 노출
2. 그 외 -> legacy(`validatedAnswer/answer/body/content`) 노출
3. legacy도 없으면 검수중 안내 노출
4. 어떤 경우에도 blank card 금지
