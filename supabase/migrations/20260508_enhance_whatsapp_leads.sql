alter table public.whatsapp_leads
  add column if not exists source_path text,
  add column if not exists link_text text,
  add column if not exists service_interest text,
  add column if not exists language text,
  add column if not exists status text not null default 'nuevo',
  add column if not exists notes text,
  add column if not exists contacted_at timestamptz;

create index if not exists whatsapp_leads_status_created_at_idx
  on public.whatsapp_leads (status, created_at desc);

comment on column public.whatsapp_leads.source_path is 'Ruta pública desde donde se capturó el lead.';
comment on column public.whatsapp_leads.link_text is 'Texto visible del enlace o botón que originó el lead.';
comment on column public.whatsapp_leads.service_interest is 'Servicio inferido por URL, texto o CTA.';
comment on column public.whatsapp_leads.language is 'Idioma activo en el sitio al momento de capturar el lead.';
comment on column public.whatsapp_leads.status is 'Estado operativo del lead: nuevo, contactado, convertido o descartado.';
