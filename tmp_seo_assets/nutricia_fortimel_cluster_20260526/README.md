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

## Rollback

- For new posts: set `status='draft'` for IDs 316-320.
- For existing post changes: remove the exact `INTERNAL_LINKS_FORTIMEL_NUTRICIA_CLUSTER_20260526` blocks.
- For sitemap: remove the five matching `<url>` blocks.
