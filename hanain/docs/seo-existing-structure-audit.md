# SEO Existing Structure Audit

- Generated: 2026-05-28
- Framework: React + Vite + React Router
- Blog route: `/blog`, `/blog/:slug`
- Q&A route: `/q/:slug`, `/qa`, `/qa/tag/:tag`
- Blog content storage: `src/data/localFunctionalIngredientPosts.js`, `src/data/localCategoryBlogPosts.js`, `src/data/localSeoExpansionPosts.js` + Supabase `posts`
- Q&A content storage: `public/qa.json` (runtime source), `src/data/qa.json` (mirror)
- Category definitions: `src/pages/BlogPage.jsx` fallback + Supabase categories, `public/qa.json` categories
- Tag generation: `scripts/build_qa_tag_index.py` -> `public/tagIndex.json`
- SEO metadata: `src/components/common/SEOHead.jsx` + page-level canonical/jsonLd
- Sitemap generation: `generate_sitemap_rss.py` + `scripts/update_static_routes.mjs`
- JSON-LD usage: Blog Article, QAPage, FAQPage, BreadcrumbList
- Existing CTA component: `src/components/common/RevealContact.jsx`, Footer CTA block

## 현재 블로그 콘텐츠 추가 위치
- `src/data/localSeoExpansionPosts.js` (이번 작업에서 추가)

## 현재 Q&A 콘텐츠 추가 위치
- `public/qa.json` (주 데이터), `src/data/qa.json` 동기화

## 기존 카테고리 목록
- Blog/QA 공용(코드 기준): metabolism, cancer_immune, digestive, cardiovascular, neuro_cognitive, mental_health, musculoskeletal, skin, respiratory, infection_inflammation, womens_health, mens_health, research, ingredient-comparison, disease-health-info, buying-guide, safety-precautions, general

## 태그 목록/생성 방식
- 질문별 `tags[]`를 모아 `tagIndex.json` 자동 생성
- 페이지화 기준: 빈도 5회 이상 태그

## 새 콘텐츠 필드 구조
- Blog: `id, slug, title, excerpt, content, category, tags, meta_title, meta_desc, og_image, status, view_count, published_at, created_at, updated_at, is_local`
- Q&A: `id, category, difficulty, tags, question, answer, views, likes, author, reviewed_at, disclaimer, source_type, related_insights, references_pmid`

## 건드리면 안 되는 파일
- `src/App.jsx` 라우팅 체계
- `src/pages/QuestionDetailPage.jsx` slug 정규화/SEO canonical 로직
- `generate_sitemap_rss.py`의 Q&A slug 규칙

## 수정 파일
- `src/lib/supabase.js` (로컬 SEO 포스트 병합)
- `scripts/update_static_routes.mjs` (로컬 SEO 포스트 sitemap/rss 반영)
- `src/data/localSeoExpansionPosts.js` (신규 콘텐츠)
- `public/qa.json`, `src/data/qa.json` (Q&A 100개 추가)

## 빌드 명령어
- `npm.cmd run build`
- `npm.cmd run audit:links`
- `npm.cmd run audit:qa`
- `npm.cmd run lint`

- 이번 생성 블로그 수: 105
- 이번 생성 Q&A 총 문항 수(누적): 1741