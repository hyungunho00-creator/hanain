# Full Content Trust Audit - 2026-05-27

Scope:
- Refresh all published Supabase `posts`.
- Add visible `## 참고자료` sections where missing.
- Replace scattered legacy CTA blocks with `MEULSSORI_PHLOROTANNIN_CTA_V2`.
- Keep indexed slugs/canonicals unchanged.
- Keep old Fortimel indexed posts as neutral archive pages, while removing Fortimel-oriented cross-link CTA blocks.
- Normalize overlong `meta_title` and `meta_desc` values without changing public slugs or visible post titles.
- Verify live Googlebot HTML still exposes Article JSON-LD `citation` and `isBasedOn`.

Security follow-up:
- After content refresh, public write access on `posts` is closed by the RLS migration in this batch.
- Broad public writes on `qa_categories` and `qa_questions` are closed; Q&A view/like counters use limited Supabase RPC functions.
- Public lead submission stays open, but its INSERT policy now requires `status='new'`, at least one contact/message field, and length bounds.
- Supabase security advisor now has no broad table-write warnings for `posts`, `qa_categories`, or `qa_questions`.
- Remaining advisor notes: the Q&A counter RPC functions are intentionally public `SECURITY DEFINER` functions with a narrow counter-only body, and leaked password protection is still disabled in Auth dashboard settings.

Verification snapshot:
- Published posts: 363
- Audit issues after refresh: 0
- Duplicate `meta_title` groups: 0
- Duplicate `meta_desc` groups: 0
- `meta_title` length issues: 0
- `meta_desc` length issues: 0
- IndexNow refreshed URLs: 363
- IndexNow endpoints accepted: api.indexnow.org 200, Bing 200, Yandex 202, Naver 200
