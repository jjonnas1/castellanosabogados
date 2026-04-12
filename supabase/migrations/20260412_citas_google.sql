-- Google Calendar events synced from jonatancastellanosabogado@gmail.com
-- Internal admin use only — not exposed to public or client portal
create table if not exists public.citas_google (
  id              uuid        primary key default gen_random_uuid(),
  google_event_id text        not null unique,
  titulo          text        not null,
  inicio          timestamptz not null,
  fin             timestamptz not null,
  descripcion     text,
  synced_at       timestamptz not null default now()
);

create index if not exists idx_citas_google_inicio         on public.citas_google (inicio);
create index if not exists idx_citas_google_google_event_id on public.citas_google (google_event_id);

-- RLS: only authenticated admins can access this table
alter table public.citas_google enable row level security;

drop policy if exists "citas_google_admin_all" on public.citas_google;
create policy "citas_google_admin_all"
  on public.citas_google
  for all
  using  (public.is_admin_user())
  with check (public.is_admin_user());
