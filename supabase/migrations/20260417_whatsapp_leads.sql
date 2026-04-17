-- Tabla de leads capturados desde el modal de intercepción de WhatsApp
create table if not exists public.whatsapp_leads (
  id          uuid        primary key default gen_random_uuid(),
  nombre      text        not null,
  telefono    text        not null,
  wa_url      text,
  created_at  timestamptz not null default now()
);

alter table public.whatsapp_leads enable row level security;

-- Solo el service role puede leer/escribir leads. Sin acceso público.
create policy "No public access"
  on public.whatsapp_leads
  for all
  using (false);

comment on table public.whatsapp_leads is
  'Leads capturados mediante el modal de intercepción de clics en enlaces de WhatsApp.';
