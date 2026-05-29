# QA Answer Source Map

## 답변 원본 발견 위치
- `public/qa.json` (현재 운영 데이터)
- `src/data/qa.json` (앱 내부 데이터 소스)
- `reports/qa_before_constitution_*.json` (리셋 이전 백업 스냅샷)
- `docs/qa-needs-review-legacy-backup.json` (needs_review 원문 보존 백업)
- Git history:
  - `573b036:hanain/public/qa.json` (리셋 이전 답변 존재)
  - `8a9d264` (hard-reset 적용 커밋)
- Supabase (SELECT 확인):
  - 프로젝트 `rlfxuyeoluoeaxuujtly`
  - 테이블 `qa_questions` (`answer` 컬럼에 본문 존재, `validatedAnswer/qualityStatus` 컬럼 없음)

## 핵심 샘플 매핑
- `ci_063` → 수동 우선 복구(암 유전자 검사 NGS), `validatedAnswer` 생성
- `qa200-20260527-027` → 수동 우선 복구(암환자 식욕), `validatedAnswer` 생성
- `ci_066` → 수동 우선 복구(종양 용해 증후군), `validatedAnswer` 생성
- `ms_076`, `ms_053`, `ms_071`, `ms_057`, `ms_022`, `qa200-20260527-136` → 기존 검증 답변 유지

## 집계 (public/qa.json 기준)
- 전체 Q&A 수: `1741`
- 공개 복구 가능(검증 통과): `1095`
- 복구 불가(현 시점 공개 차단): `646`
- 수동 재작성/재검수 필요: `646`

## 비고
- `needs_review` 항목 원문은 공개 데이터에서 비노출 처리했으며 백업 파일로 보존.
- 카테고리형/중복 템플릿 문구는 validator에 의해 차단.
