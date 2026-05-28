-- Apply in Supabase SQL Editor when post writes are blocked by RLS.
-- This keeps public read open for published posts and reserves writes for service_role.

alter table public.posts enable row level security;

drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read"
on public.posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "posts_service_all" on public.posts;
create policy "posts_service_all"
on public.posts
for all
to service_role
using (true)
with check (true);

-- Optional hardening: remove broad table grants from anon/authenticated.
revoke insert, update, delete on table public.posts from anon, authenticated;
grant select on table public.posts to anon, authenticated;
