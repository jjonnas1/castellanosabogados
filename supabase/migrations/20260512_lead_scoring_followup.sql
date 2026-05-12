alter table public.whatsapp_leads
  add column if not exists lead_score integer not null default 0,
  add column if not exists follow_up_due_at timestamptz,
  add column if not exists last_follow_up_alert_at timestamptz,
  add column if not exists conversion_source text,
  add column if not exists urgency text not null default 'normal';

create index if not exists whatsapp_leads_follow_up_due_idx
  on public.whatsapp_leads (follow_up_due_at)
  where status = 'nuevo';

create index if not exists whatsapp_leads_score_created_at_idx
  on public.whatsapp_leads (lead_score desc, created_at desc);

comment on column public.whatsapp_leads.lead_score is 'Puntaje automático para priorizar seguimiento comercial.';
comment on column public.whatsapp_leads.follow_up_due_at is 'Momento máximo recomendado para contactar el lead.';
comment on column public.whatsapp_leads.last_follow_up_alert_at is 'Última alerta automática enviada por lead pendiente.';
comment on column public.whatsapp_leads.conversion_source is 'Origen normalizado de conversión: whatsapp_modal, formulario, cta_servicio, etc.';
comment on column public.whatsapp_leads.urgency is 'Urgencia operativa calculada: baja, normal, alta o critica.';
