create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  notes text,
  status text not null default 'pendiente' check (status in ('pendiente', 'atendida', 'descartada')),
  consultation_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_consultations_status on public.consultations(status);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists consultations_set_updated_at on public.consultations;
create trigger consultations_set_updated_at
before update on public.consultations
for each row execute function public.set_updated_at();

alter table public.consultations enable row level security;

drop policy if exists consultations_admin_all on public.consultations;
create policy consultations_admin_all
  on public.consultations
  for all
  using (public.is_admin_user())
  with check (public.is_admin_user());
