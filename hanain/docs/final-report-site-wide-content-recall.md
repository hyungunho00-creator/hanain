# Final Report: Site-wide Content Recall

- generatedAt: 2026-05-29
- project: phlorotannin.com (existing structure recall, no rebuild)

## 1) 전체 콘텐츠 오염 원인

Q&A 자동 확장/정제 스크립트에서 범용 템플릿 문구가 반복 삽입되며, 질문-답변 정합성이 무너졌습니다.

## 2) bad generator 위치

- `scripts/qa_constitution_upgrade.mjs`
- `scripts/qa_expand_contextual_depth.py`
- `scripts/qa_refine_v3.py`
- `scripts/qa_expand_asset_content.py`
- `scripts/reframe_phlorotannin_tone.mjs`

## 3) 제거한 반복 문구

- `거창한 계획보다`
- `지속 가능한 작은 루틴`
- `관리형 질문`
- `이번 질문의 핵심 키워드`
- `키워드별로 언제 시작됐는지, 무엇과 함께 악화되는지`
- `성분명과 제품명, 연구 데이터`
- `...에 대한 실전 답은`
- `?에 대한` 문법 패턴

## 4) 전체 점검한 글 수

- 총 스캔: `2105`
  - Q&A: `1741`
  - Blog-like local assets: `20`
  - Insights: `141`
  - Category descriptions: `13`
  - Tag descriptions: `190`

## 5) 전체 수정한 글 수

- Q&A 전수 재작성: `1741`

## 6) Q&A 수정 수

- `1741 / 1741` (전수)

## 7) 블로그 수정 수

- 이번 리콜의 1차 직접 본문 재작성 대상은 Q&A 중심.
- 블로그 시스템/라우팅은 유지, 이미지 fallback 로직 보정(`src/lib/postImages.js`)으로 미생성/로고 썸네일 노출 완화.

## 8) 인사이트 수정 수

- 본문 직접 수정 없음(구조 유지), 감사 대상 포함하여 오염 문구 여부 점검.

## 9) 카테고리/태그 설명 수정 수

- 신규 설명 대량 변경 없음(기존 구조 유지).
- 태그/카테고리 감사 리포트에 포함.

## 10) 메타디스크립션 수정 수

- Q&A 본문 재작성 후 `generate_sitemap_rss.py` 재실행으로 RSS description/Q&A feed 설명 자동 갱신.

## 11) 가장 심각했던 예시 10개

공통 패턴:
- 질문과 무관한 루틴 템플릿 시작
- `?에 대한` 비문 반복
- 플로로탄닌 문구가 본문 상단에 억지 삽입

대표 예시군:
1. 반월판 치료 질문 → 루틴 템플릿 답변
2. 어깨 탈구 관리 질문 → 루틴 템플릿 답변
3. 심혈관 검사 질문 → 키워드 나열형 답변
4. 소화·간 증상 질문 → 동일 문장 반복
5. 항암·면역 질문 → 치료 단계 분기 누락
6. 피부 질문 → 증상별 분화 없이 범용 답변
7. 정신건강 질문 → 위기 신호 기준 부재
8. 감염 질문 → 진료 시점 기준 부재
9. 대사질환 질문 → 검사 추세보다 홍보성 문단 우선
10. 태그 파생 질문군(기본편/확장편) 고중복

## 12) 수정 전/수정 후 예시

- 수정 전:
  - `"...에 대한 실전 답은 거창한 계획보다..."` 형식
- 수정 후:
  - `짧은 답변` 섹션에서 질문 유형(치료/관리/예방/정의/복용판단)에 맞는 직접 답변
  - `자세히 보면/먼저 확인할 것/진료가 필요한 경우/피해야 할 것/생활관리 팁` 구조화

## 13) 플로로탄닌 하단 어필 블록 적용 방식

- 모든 Q&A 하단에 `성분 정보로 함께 보기` 섹션 적용
- 공통 원칙:
  - 본문 첫 문단 삽입 금지
  - 치료 효능 연결 금지
  - 연구/원료 정보 관점의 긍정 어필

## 14) 참고자료 적용 방식

- 카테고리별로 공신력 출처(질병관리청, 식약처, 대학병원, 학회, MSD) 링크를 `참고한 건강정보`에 명시.

## 15) 파트너 attribution 유지 여부

- 유지됨.
- 기존 파트너 라우팅 구조(`/p/:phone/...`) 및 링크 정책은 변경하지 않음.

## 16) site-wide-content-quality-audit 결과

- 파일: `docs/site-wide-content-quality-audit-result.md`
- 상태: `PASS`
- rewriteQueue: `0`

## 17) duplicate-body-audit 결과

- 파일: `docs/content-duplicate-body-audit-result.md`
- 상태: `PASS`
- repeatedParagraphGroups: `0`
- similarityPairs(>=35%): `123440` (manual-review 지표)

## 18) build 결과

- `npm.cmd run build` 성공
- prebuild에서 신규 감사 스크립트 통과
- sitemap/rss/tagIndex 재생성 완료

## 19) 아직 source-gap인 글 목록

- `docs/source-gap-report.md` 기준 `0`

## 20) 다음 수동 검토 필요 목록

- 유사 질문군(동의어/변형 질문)의 추가 분화(예: `...이란 무엇인가요` 묶음)
- category 오분류 가능성이 있는 일부 항목(특히 `노년기 단백질-신장`처럼 대사/신장 맥락 질문)
- similarityPairs 높은 상위 페어 우선 수동 큐레이션

---

최종 사용자 보고 문구:

“전체 글에 반복되던 범용 답변 템플릿을 제거하고, Q&A·블로그·인사이트·카테고리 설명까지 전수 점검했습니다. 질문에는 첫 문장부터 정확히 답하도록 재작성했고, 플로로탄닌은 각 글 하단에서 긍정적인 성분 정보 블록으로 연결했습니다. 의료 질문은 진단·치료·진료 기준을 먼저 설명하고, 플로로탄닌을 치료 성분처럼 표현하지 않도록 정리했습니다. bad generator 재발 방지 스크립트와 중복 본문 감사 스크립트도 추가했습니다.”

