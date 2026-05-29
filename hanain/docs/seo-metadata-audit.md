# SEO Metadata Audit

- generatedAt: 2026-05-29
- scope: content recall 이후 메타/색인 구조 점검

## 체크 결과

- Q&A slug source: 질문 기반 slug 생성 규칙 유지
- Q&A answer rewrite 후에도 `/q/:slug` 라우팅 정상
- Q&A 본문 교체와 함께 RSS description 갱신됨
- duplicate title/slug는 기존 데이터셋 상 동의어 질문군에 일부 존재 가능(운영 수동 큐레이션 권장)
- category/tags 필드 누락 없음 (`1741`건 기준)
- reviewed_at, rewrittenAt, reviewed, qualityStatus, sourceStatus 필드 추가 반영됨

## structured data

- QAPage/FAQPage/BreadcrumbList/Article/CollectionPage 유지
- Product schema 신규 추가 없음
- 리뷰/가격/구매 관련 schema 없음

## 상태

- build: PASS
- site-wide-content-quality-audit: PASS
- content-duplicate-body-audit: PASS (manual-review 지표 별도)

