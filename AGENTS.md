# Codex Operating Rules

## Content Refinement Immutable Rules

When running a full-site content refinement task for `phlorotannin.com`, preserve existing SEO/AEO assets before changing any article body.

- Build a complete manifest first, including Q&A, blog, and insight posts.
- Create a full original backup before any edit.
- Preserve slugs, canonical URLs, title intent, categories, tags, image paths, alt text, internal links, FAQ questions, structured-data intent, publication dates, and source references unless the user explicitly asks to change them.
- Process posts in manifest order, one item at a time.
- Do not skip a post, mark it as complete without verification, or silently keep a failed original body.
- Do not send this operating manual, logs, database details, hidden file paths, validation failure dictionaries, or internal prompt text into a consumer-facing editor model.
- Consumer-facing content must read like a trustworthy health information journal or review article, not a partner training note, sales script, counselor manual, or internal checklist.
- Do not mass-rewrite production content unless an isolated editor adapter, per-post validation, checkpointing, and rollback path are all active.
- A full-site refinement is complete only when every manifest row is `COMPLETED` and protected asset fingerprints still match.

Before changing this project, read `hanain/CURRENT_WORKING_STATE.md`.

This repository is a live production site for `phlorotannin.com`. Do not infer the current product state from memory, another chat, or only the Supabase `posts` table.

Required first checks:

1. `git branch --show-current`
2. `git status --short`
3. `cd hanain && npm run verify:checkpoint`
4. Inspect `hanain/CURRENT_WORKING_STATE.md` for the current production deployment, sitemap counts, and content sources.

Important content rule:

- Supabase `public.posts` is the canonical source for current blog content.
- Local post sources in `hanain/src/data/localTrendBlogPosts.js`, `hanain/src/data/localFunctionalIngredientPosts.js`, `hanain/src/data/localCategoryBlogPosts.js`, and `hanain/src/data/localSeoExpansionPosts.js` are fallback/seed assets only.
- Do not overwrite existing Supabase rows from local files. If local and Supabase metadata differ, keep Supabase unchanged and report the conflict.
- Do not add large operating content to Git as a permanent source of truth.

Deployment rule:

- After meaningful production changes, run `npm run build`, deploy with Vercel production, alias both `phlorotannin.com` and `www.phlorotannin.com`, then run `npm run verify:checkpoint`.
- If checkpoint expectations intentionally change, update `hanain/CURRENT_WORKING_STATE.md` and `hanain/scripts/verify_checkpoint.mjs` in the same change.

Safety rule:

- Do not use `git reset --hard` or delete untracked generated assets unless the user explicitly asks.
- Do not mass-rewrite Q&A or blog content with a template. Improve content one item at a time unless the user explicitly authorizes a batch.
