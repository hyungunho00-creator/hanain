# Patient Meal Delivery SEO Cluster - 2026-05-26

Purpose:
- Publish 8 Supabase blog posts for cancer and diabetes patient meal delivery long-tail SEO.
- Add 2 static insight posts for inquiry data and caregiver order memo intent.
- Generate one unique 1200x630 WebP image per blog post.

Execution order:
1. `python generate_images.py`
2. Set `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SERVICE_KEY` in the shell.
3. `python upload_images.py`
4. `python publish_posts.py`
5. Regenerate sitemap/RSS from `hanain/generate_sitemap_rss.py`.
6. Build, deploy, verify live URLs.
7. `python indexnow_submit.py`

Security:
- New scripts do not hardcode Supabase service role keys.
- Upload and publish scripts read Supabase credentials only from environment variables.

