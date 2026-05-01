-- ─── Procesos judiciales ───────────────────────────────────────────────────────

create table if not exists public.procesos (
  id                  uuid        primary key default gen_random_uuid(),
  radicado            text        not null unique,
  id_rama_judicial    text,
  cliente_id          uuid        references public.client_profiles(id) on delete set null,
  nombre_cliente      text        not null,
  contraparte         text,
  despacho            text,
  ciudad              text,
  tipo                text,
  estado              text        not null default 'Activo',
  ultima_actuacion    text,
  fecha_ult_actuacion timestamptz,
  notas               text,
  alerta_vencimiento  timestamptz,
  tipo_vencimiento    text,
  sincronizado_en     timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.actuaciones (
  id            uuid        primary key default gen_random_uuid(),
  proceso_id    uuid        not null references public.procesos(id) on delete cascade,
  fecha         timestamptz not null,
  tipo          text        not null,
  anotacion     text,
  fecha_inicio  timestamptz,
  fecha_fin     timestamptz,
  con_documento boolean     not null default false,
  nueva         boolean     not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists idx_actuaciones_proceso_id on public.actuaciones(proceso_id);
create index if not exists idx_actuaciones_nueva      on public.actuaciones(nueva) where nueva = true;
create index if not exists idx_procesos_estado        on public.procesos(estado);

-- RLS: service role bypasses RLS automatically; no rows accessible to anon/authenticated
alter table public.procesos    enable row level security;
alter table public.actuaciones enable row level security;
