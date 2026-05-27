-- Close broad public write access on Q&A lookup tables.
-- Public users keep read access through the existing anon_read policies.
-- View/like increments now go through limited RPC functions, which only update counters.

drop policy if exists anon_insert on public.qa_categories;
drop policy if exists anon_update on public.qa_categories;
drop policy if exists anon_insert on public.qa_questions;
drop policy if exists anon_update on public.qa_questions;

drop policy if exists "service role full access" on public.qa_categories;
create policy "service role full access"
on public.qa_categories
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full access" on public.qa_questions;
create policy "service role full access"
on public.qa_questions
for all
to service_role
using (true)
with check (true);
