-- Ensure created_by_admin_id exists for client updates
alter table if exists public.client_case_updates
  add column if not exists created_by_admin_id uuid references auth.users(id) on delete set null;

-- Appointments managed by admin and visible to linked clients
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'programada',
  client_profile_id uuid references public.client_profiles(id) on delete set null,
  created_by_admin_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_appointments_client_profile_id on public.appointments(client_profile_id);
create index if not exists idx_appointments_start_at on public.appointments(start_at);

-- Reuse updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

alter table public.appointments enable row level security;

-- admin can manage all appointments
DROP POLICY IF EXISTS "appointments_admin_all" ON public.appointments;
create policy "appointments_admin_all"
on public.appointments
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- client can read only own appointments when portal enabled
DROP POLICY IF EXISTS "appointments_client_select_own" ON public.appointments;
create policy "appointments_client_select_own"
on public.appointments
for select
using (
  exists (
    select 1
    from public.client_profiles cp
    where cp.id = client_profile_id
      and cp.auth_user_id = auth.uid()
      and cp.can_access_portal = true
  )
);
