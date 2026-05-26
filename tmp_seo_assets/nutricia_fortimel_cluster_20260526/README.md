# Nutricia Fortimel Cluster 2026-05-26

Purpose: build a non-duplicative SEO cluster for separate `포티멜` and `뉴트리시아` search intent while preserving existing indexed URLs.

## Scope

- Inserted five new published blog posts in Supabase `public.posts`.
- Appended internal-link blocks to two existing posts.
- Updated static sitemap sources:
  - `public/sitemap.xml`
  - `hanain/public/sitemap.xml`

## New URL Targets

- `/blog/what-is-fortimel-medical-nutrition-guide`
- `/blog/fortimel-product-types-comparison-guide`
- `/blog/fortimel-buying-checklist-medical-food-guide`
- `/blog/what-is-nutricia-danone-medical-nutrition-guide`
- `/blog/nutricia-product-portfolio-fortimel-aptamil-neocate-guide`

## Verification Notes

- Slug duplicate check: passed before insert.
- Absolute forbidden word scan: passed after insert.
- Meta lengths: all `meta_title` <= 40 and `meta_desc` <= 80.
- Sitemap source files include all five new URLs locally.

## Image Hotfix 2026-05-26

User review found the initial images were reused from older posts and not sufficiently topic-specific.

- Generated five dedicated 1200x630 text-free WebP illustrations with `generate_fix_images.py`.
- Uploaded them to Supabase Storage `blog-images/{slug}.webp` with `upload_fix_images.py`.
- Patched `public.posts.og_image` for IDs 316-320.
- Updated both static sitemap sources so `<image:loc>` matches the new images.
- Patched blog OG metadata flow so `/blog/:slug` returns post-specific `og:image`, `og:image:alt`, and `og:image:type`.
- Service keys are not stored in the new scripts; upload scripts require `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SERVICE_KEY`.

Generated asset manifest:

- `image_fix_manifest.json`
- `image_fix_upload_results.json`

## Rollback

- For new posts: set `status='draft'` for IDs 316-320.
- For existing post changes: remove the exact `INTERNAL_LINKS_FORTIMEL_NUTRICIA_CLUSTER_20260526` blocks.
- For sitemap: remove the five matching `<url>` blocks.
- For the image hotfix only: restore the prior `og_image` values from the pre-hotfix DB query or revert the sitemap `<image:loc>` changes.
