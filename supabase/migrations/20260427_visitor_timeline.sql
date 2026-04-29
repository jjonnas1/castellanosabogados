-- Páginas visitadas dentro de cada sesión (con tiempo de permanencia)
create table if not exists public.site_page_views (
  id               uuid        primary key default gen_random_uuid(),
  visitor_key      text        not null,
  visit_id         uuid,
  path             text        not null,
  duration_seconds integer,
  entered_at       timestamptz not null default now()
);

create index if not exists idx_site_page_views_visitor_key on public.site_page_views (visitor_key);
create index if not exists idx_site_page_views_entered_at  on public.site_page_views (entered_at desc);

-- Clicks en links de contacto (WhatsApp, correo, teléfono)
create table if not exists public.site_contact_clicks (
  id           uuid        primary key default gen_random_uuid(),
  visitor_key  text        not null,
  visit_id     uuid,
  type         text        not null check (type in ('whatsapp', 'email', 'phone')),
  occurred_at  timestamptz not null default now()
);

create index if not exists idx_site_contact_clicks_visitor_key on public.site_contact_clicks (visitor_key);
create index if not exists idx_site_contact_clicks_occurred_at on public.site_contact_clicks (occurred_at desc);

alter table public.site_page_views    enable row level security;
alter table public.site_contact_clicks enable row level security;

-- Solo el admin puede leer; los inserts se hacen con service_role (bypasea RLS)
drop policy if exists "page_views_admin_select"     on public.site_page_views;
drop policy if exists "contact_clicks_admin_select" on public.site_contact_clicks;

create policy "page_views_admin_select"
  on public.site_page_views
  for select
  using (public.is_admin_user());

create policy "contact_clicks_admin_select"
  on public.site_contact_clicks
  for select
  using (public.is_admin_user());
