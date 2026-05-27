-- Narrow public Q&A counter writes through RPC functions.
-- Public table UPDATE remains closed; only these functions can increment views/likes.

create or replace function public.increment_qa_view(question_id text)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.qa_questions
  set views = coalesce(views, 0) + 1
  where id = question_id;
$$;

create or replace function public.increment_qa_like(question_id text)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.qa_questions
  set likes = coalesce(likes, 0) + 1
  where id = question_id;
$$;

revoke all on function public.increment_qa_view(text) from public;
revoke all on function public.increment_qa_like(text) from public;

grant execute on function public.increment_qa_view(text) to anon, authenticated;
grant execute on function public.increment_qa_like(text) to anon, authenticated;
