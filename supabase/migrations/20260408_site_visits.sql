create table if not exists public.site_visits (
  id            uuid        primary key default gen_random_uuid(),
  visited_at    timestamptz not null    default now(),
  path          text        not null,
  referrer      text,
  user_agent    text,
  ip_hash       text,
  ip_masked     text,
  country       text,
  region        text,
  city          text,
  is_admin_visit boolean    not null    default false,
  visitor_key   text
);

create index if not exists idx_site_visits_visited_at on public.site_visits (visited_at desc);
create index if not exists idx_site_visits_path       on public.site_visits (path);

alter table public.site_visits enable row level security;

-- Solo el admin puede leer visitas
drop policy if exists "site_visits_admin_select" on public.site_visits;
create policy "site_visits_admin_select"
  on public.site_visits
  for select
  using (public.is_admin_user());

-- Los inserts se hacen desde el servidor con service_role (bypasea RLS).
-- No se necesita política de insert para usuarios normales.
