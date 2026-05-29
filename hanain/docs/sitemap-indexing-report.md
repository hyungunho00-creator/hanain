# Sitemap / Indexing Report

- generatedAt: 2026-05-29
- command: `npm.cmd run build` (prebuild 포함)

## 결과

- `public/sitemap.xml` 생성 완료
  - total URLs: `2506`
  - Q&A detail: `1741`
  - Q&A tags: `190`
  - blog posts: `403`
  - insights: 자동 스캔 반영(`141`)
- `public/rss.xml` 생성 완료
  - total items: `120` (blog 50 + Q&A 40 + insights 포함)
- `public/tagIndex.json` 생성 완료
  - unique tags: `1903`
  - page eligible tags(>=5): `190`

## 수집 구조 점검

- robots: `public/robots.txt` 존재
- canonical: 페이지 컴포넌트의 `SEOHead` canonical 유지
- `/blog`, `/q`, `/qa/tag` 모두 sitemap 반영됨
- Product schema/가격 schema 신규 추가 없음

