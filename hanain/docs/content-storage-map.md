# Content Storage Map

- generatedAt: 2026-05-29
- projectRoot: `C:\Users\user\Documents\Codex\2026-05-26\new-chat\hanain\hanain`

## 1) 콘텐츠 저장 위치

- `public/qa.json`
  - type: Q&A 런타임 원본
  - fields: `id, category, difficulty, tags, question, answer, views, likes, author, content_type, reviewed_at, disclaimer, source_type, related_insights, references_pmid`
  - count: `1741`
- `src/data/qa.json`
  - type: Q&A 미러(빌드/개발 fallback)
  - count: `1741`
- `src/data/localCategoryBlogPosts.js`
  - type: 로컬 블로그 시드(카테고리형)
  - count: `20`
- `src/data/localFunctionalIngredientPosts.js`
  - type: 로컬 블로그 시드(기능성 원료형)
  - count: `10`
- `src/data/localSeoExpansionPosts.js`
  - type: 로컬 블로그 시드(SEO 확장형)
  - count: `105`
- `src/data/insights/posts/*.jsx`
  - type: 인사이트 본문/메타 모듈
  - count: `141`
- `public/tagIndex.json`
  - type: 태그 인덱스(/qa/tag)
  - fields: `tags[tag].count, tags[tag].qids, slug_index`
  - tags count: `190`
- `public/rss.xml`, `public/sitemap.xml`
  - type: 검색 수집용 산출물
  - source: `generate_sitemap_rss.py`

## 2) 라우팅 소비 지점

- `/q/:slug` → `src/pages/QuestionDetailPage.jsx` (`/qa.json` fallback 사용)
- `/qa` → `src/pages/QAPage.jsx` (`/qa.json` 직접 로드)
- `/qa/tag/:tag` → `src/pages/QATagPage.jsx` (`/qa.json`, `/tagIndex.json`)
- `/category/:slug` → `src/pages/CategoryPage.jsx` (Supabase 우선 + qa fallback)
- `/blog`, `/blog/:slug` → Supabase posts + 로컬 콘텐츠 보강
- `/insights/:slug` → `src/data/insights/posts/*.jsx`

## 3) 자동생성/오염 가능 스크립트 위치

- `scripts/qa_constitution_upgrade.mjs` (현재 실행 차단)
- `scripts/qa_expand_contextual_depth.py` (현재 실행 차단)
- `scripts/qa_refine_v3.py` (현재 실행 차단)
- `scripts/qa_expand_asset_content.py` (현재 실행 차단)
- `scripts/reframe_phlorotannin_tone.mjs` (현재 실행 차단)
- `scripts/expand_existing_seo_assets.mjs` (SEO 확장 생성기)

## 4) 수정 대상 파일

- Q&A 전수 재작성:
  - `public/qa.json`
  - `src/data/qa.json`
- 재발 방지/검수:
  - `scripts/content_recall_rewrite_qa.mjs`
  - `scripts/site-wide-content-quality-audit.mjs`
  - `scripts/content-duplicate-body-audit.mjs`
  - `scripts/prebuild.cjs`
  - `package.json`
- 렌더링:
  - `src/pages/QAPage.jsx`
  - `src/pages/QuestionDetailPage.jsx`
  - `src/index.css`

## 5) 건드리면 안 되는 파일(이번 리콜 범위 밖)

- 라우팅 구조 자체 (`src/App.jsx`) 대규모 변경 금지
- 파트너 ref 정책 핵심 로직 (`src/lib/partnerRef.js`, `src/context/PartnerContext.jsx`)
- Supabase 인증/권한 로직(`src/lib/supabase.js`) 구조 변경 금지

## 6) 빌드/검증 명령

- `npm run build`
- `npm run audit:links`
- `npm run lint`
- `node scripts/site-wide-content-quality-audit.mjs`
- `node scripts/content-duplicate-body-audit.mjs`

