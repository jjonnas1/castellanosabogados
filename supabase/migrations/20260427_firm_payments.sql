-- Tabla de registro de ingresos de la firma
create table if not exists firm_payments (
  id             uuid           primary key default gen_random_uuid(),
  created_at     timestamptz    not null default now(),
  payment_date   date           not null,
  client_name    text           not null,
  client_email   text,
  concept        text           not null,
  service_area   text           not null,
  amount         numeric(12,2)  not null check (amount >= 0),
  payment_method text           not null,
  status         text           not null default 'Pagado'
                                check (status in ('Pagado','Parcial','Pendiente')),
  notes          text,
  created_by     uuid           references auth.users(id) on delete set null
);

-- Índices para filtros frecuentes
create index if not exists firm_payments_date_idx        on firm_payments (payment_date desc);
create index if not exists firm_payments_status_idx      on firm_payments (status);
create index if not exists firm_payments_service_area_idx on firm_payments (service_area);

-- RLS: solo usuarios con role='admin' en la tabla profiles pueden operar
alter table firm_payments enable row level security;

create policy "admin_full_access_payments" on firm_payments
  for all
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );
