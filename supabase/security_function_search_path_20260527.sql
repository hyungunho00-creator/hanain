-- Pin trigger function search_path to avoid mutable search_path warnings.

alter function public.set_updated_at()
set search_path = public, pg_temp;
