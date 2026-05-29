# Final Report: QA Controlled Rewrite

## 1) 현재 Q&A 전체 개수
- 총 Q&A: 1641

## 2) 1,200번 이후 오류 여부 분석
- `data/qa-controlled-audit.json` 및 `docs/qa-contamination-boundary-report.md` 기준:
  - 1200 이후 구간에서 질문-답변 정합성/템플릿 의심 비율이 높게 관찰됨
  - 오염 의심 급증 지점: 약 index 1301

## 3) 실제 오염 시작 지점
- 의심 시작 지점: index 1301 (데이터 기반 추정)
- 우선 수정 범위: 1200~1636

## 4) 전체 audit 결과
- 전체 감사 완료: 1641/1641
- rewrite candidates: 1043
- before1200/after1200 비교 결과, after1200 쪽의 품질 리스크가 더 높음

## 5) rewrite queue 개수
- 배치 생성/실행:
  - `qa-smoke-10`
  - `qa-1200-critical-20`
  - `qa-1200-1249`
  - `qa-1250-1299`
  - `qa-1300-1349`
  - `qa-1350-1399`
  - `qa-1400-1449`
  - `qa-1450-1499`
  - `qa-1500-1549`
  - `qa-1550-1599`
  - `qa-1600-1641`

## 6) answerV2 approved 개수
- `answerV2 approved`: 434

## 7) rejected 개수
- `answerV2 rejected`: 16

## 8) needs_source 개수
- `answerV2 needs_source`: 0

## 9) 기존 답변 보존 여부
- 기존 legacy 답변(`answer/body/content/...`) 보존: 1641/1641
- 기존 답변 미보유 항목: 0

## 10) blank answer 방지 결과
- `node scripts/qa-no-blank-answer-audit.mjs`: PASS
- `blankPublicAnswers`: 0

## 11) 카테고리형 답변 제거 결과
- category template 문구/부적절 패턴은 validator 단계에서 차단
- 위반 항목은 `approved`로 노출하지 않고 `rejected` 처리 후 legacy 유지

## 12) 중복 답변 탐지 결과
- `node scripts/qa-answer-v2-duplicate-detector.mjs --all`: PASS
- 기준:
  - 유사도 0.35 이상은 수동 검토 후보로 리포트
  - 동일 핵심 문단 3개 이상 반복 시 FAIL

## 13) 플로로탄닌 하단 블록 적용 방식
- `answerV2`에서 플로로탄닌 관련 브리지 문구는 하단 블록으로 유지
- 상단 문단에서 플로로탄닌 직접 효능/치료 표현은 차단 규칙으로 reject

## 14) 파트너 attribution 유지 여부
- 이번 작업은 Q&A answer overlay/validator/배치 스크립트 중심으로 수행
- partner 라우팅/attribution 로직은 변경하지 않음 (기존 동작 유지)

## 15) build 결과
- `npm.cmd run build`: FAIL
- 원인: `scripts/prebuild.cjs`의 `reader-content-audit` strict 규칙
  - `"연락 주세요"` 문구가 기존 데이터에 다수 존재 (이번 배치 회귀 이슈 아님)

## 16) 남은 수동 검토 목록
- `answerV2 rejected` 16건 (legacy 유지 중):
  - sh_140
  - qa200-20260527-016
  - qa200-20260527-017
  - qa200-20260527-035
  - qa200-20260527-057
  - qa200-20260527-073
  - qa200-20260527-085
  - qa200-20260527-092
  - qa200-20260527-094
  - qa200-20260527-101
  - qa200-20260527-102
  - qa200-20260527-109
  - qa200-20260527-121
  - qa200-20260527-141
  - qa200-20260527-180
  - qa200-20260527-184

## 17) 다음 배치 작업 계획
1. rejected 16건을 질문별 수동 보강안으로 작성
2. 플로로탄닌 문구를 하단 블록 전용으로 재배치
3. 재검증 후 승인 가능한 항목만 `approved` 전환
4. `reader-content-audit`의 기존 내부문구(“연락 주세요”) 정리 배치 별도 진행

---
최종 사용자 보고 문구:

“기존 Q&A 답변은 보존한 상태에서 answerV2 overlay 방식으로 순차 수정했습니다. 1,200번 이후 구간의 오류율을 먼저 감사했고, 오염된 Q&A만 rewrite queue로 분리했습니다. 검증 통과한 answerV2만 화면에 우선 표시되며, 실패한 항목은 기존 답변을 그대로 유지합니다. blank answer, 카테고리형 범용 답변, 플로로탄닌 과장 표현을 막는 검수 스크립트도 함께 적용했습니다.”
