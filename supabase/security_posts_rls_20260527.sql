-- Close accidental public write access on blog posts.
-- Public visitors keep SELECT access to published posts through the existing
-- "published posts readable by all" policy. Writes must go through the
-- server-side admin API, which uses a service role key outside the client.

drop policy if exists "service role full access" on public.posts;

create policy "service role full access"
on public.posts
for all
to service_role
using (true)
with check (true);
