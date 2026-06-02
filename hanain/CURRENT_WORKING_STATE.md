# Current Working State

Last verified: 2026-06-02 09:59 KST

Production domain:

- `https://phlorotannin.com`
- `https://www.phlorotannin.com` redirects to apex
- Current verified deployment: `https://hanain-1h442mtnc-01056528206s-projects.vercel.app`

Branch:

- `fix/restore-partner-card-flow`

What "current" means:

- Partner card/design restoration is part of the current product state.
- SEO server routing through `hanain/api/seo.js` is part of the current product state.
- Supabase `public.posts` is the canonical blog content source.
- Local static blog posts remain in code only as fallback/seed assets, not as the operating source of truth.
- First-screen blog card/OG images use the refreshed `scripts/build_blog_visual_refresh.py` system.
- The refreshed front blog `og_image` URLs are served through `/og-card/v20260602/<slug>.png` by `api/og.js`; do not switch them back to `/og/blog-refresh` or raw `/og/content-quality` paths without checking CDN cache behavior.

Content sources:

- Supabase `public.posts`: canonical published blog posts (`542` published current posts).
- Local trend posts: `src/data/localTrendBlogPosts.js` (`18` posts, fallback/seed only).
- Local functional ingredient posts: `src/data/localFunctionalIngredientPosts.js` (`10` posts, fallback/seed only).
- Local category posts: `src/data/localCategoryBlogPosts.js` (`20` posts, fallback/seed only).
- Local SEO expansion posts: `src/data/localSeoExpansionPosts.js` (`105` posts, fallback/seed only).

Do not treat these local files as the canonical data source. If a local post and Supabase row differ, do not overwrite Supabase automatically.

Migration note:

- On 2026-06-02 KST, `153` local blog assets were compared against Supabase.
- `139` local-only posts were inserted into `public.posts` with the same slug, preserving existing URLs.
- Existing Supabase rows were not overwritten; `6` local/DB metadata conflicts were intentionally left unchanged.
- `scripts/prepare_local_posts_for_supabase.mjs` can be rerun to confirm `localOnlyCount: 0`.

Key local posts that must remain available:

- `/blog/glp1-era-protein-fiber-phlorotannin-checklist-2026`
- `/blog/glp1-muscle-loss-protein-resistance-training-2026`
- `/blog/heatwave-sleep-fatigue-hydration-gamtae-2026`
- `/blog/wildfire-smoke-pm25-respiratory-antioxidant-2026`
- `/blog/microplastics-oxidative-stress-seaweed-polyphenol-2026`
- `/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026`
- `/blog/menopause-sleep-hot-flash-metabolic-health-gamtae-2026`
- `/blog/oral-microbiome-gum-inflammation-systemic-health-2026`

Expected production SEO signals:

- `https://phlorotannin.com/sitemap.xml`
  - total URLs: `2723`
  - duplicate URLs: `0`
  - noindex-like URLs inside sitemap: `0`
  - Q&A detail URLs: `1793`
  - Q&A tag URLs: `215`
  - blog detail URLs: `542`
  - insight detail URLs: `142`
- `/qa?category=cancer_immune`
  - `X-Robots-Tag: noindex,nofollow`
  - canonical: `https://phlorotannin.com/qa`
- `/p/test/home`
  - `X-Robots-Tag: noindex,follow`
  - canonical: `https://phlorotannin.com/home`
- `/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026`
  - source: `posts-table`
  - robots: `index, follow`
- `/blog/ecklonia-cava-respiratory-health-clinical-trial-2026`
  - source: `blog-not-found`
  - robots: `noindex,nofollow`
  - must not appear in sitemap

Supabase note:

- Project ref: `rlfxuyeoluoeaxuujtly`
- Post id `414`, slug `ecklonia-cava-respiratory-health-clinical-trial-2026`, was created by another workflow after the previous stable state.
- It is intentionally `draft` and must not be republished unless the user explicitly asks.

Required verification command:

```bash
npm run verify:checkpoint
```

Required build command:

```bash
npm run build
```

Required deploy pattern:

```bash
npx --yes vercel@54.6.1 deploy --prod --yes
npx --yes vercel@54.6.1 alias set https://<deployment-url> phlorotannin.com
npx --yes vercel@54.6.1 alias set https://<deployment-url> www.phlorotannin.com
npm run verify:checkpoint
```

If future work changes sitemap counts, current deployment URL, or source-of-truth rules, update this file and `scripts/verify_checkpoint.mjs` together.
