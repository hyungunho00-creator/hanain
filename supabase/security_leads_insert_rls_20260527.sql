-- Keep public lead submission open, but make the INSERT policy bounded.

drop policy if exists "leads insert anon" on public.leads;

create policy "leads insert anon"
on public.leads
for insert
to anon, authenticated
with check (
  status = 'new'
  and (
    nullif(trim(coalesce(name, '')), '') is not null
    or nullif(trim(coalesce(phone, '')), '') is not null
    or nullif(trim(coalesce(email, '')), '') is not null
    or nullif(trim(coalesce(message, '')), '') is not null
  )
  and char_length(coalesce(name, '')) <= 120
  and char_length(coalesce(phone, '')) <= 80
  and char_length(coalesce(email, '')) <= 180
  and char_length(coalesce(message, '')) <= 5000
  and char_length(coalesce(source, '')) <= 120
  and char_length(coalesce(partner_slug, '')) <= 120
);
