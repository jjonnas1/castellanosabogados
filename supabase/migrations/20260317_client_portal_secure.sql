create table if not exists public.client_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  case_reference text,
  can_access_portal boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_case_updates (
  id uuid primary key default gen_random_uuid(),
  client_profile_id uuid not null references public.client_profiles(id) on delete cascade,
  title text not null,
  update_text text not null,
  status text not null default 'en curso',
  visible_to_client boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_client_profiles_auth_user_id on public.client_profiles(auth_user_id);
create index if not exists idx_client_case_updates_client_profile_id on public.client_case_updates(client_profile_id);

-- updated_at trigger reuse
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists client_profiles_set_updated_at on public.client_profiles;
create trigger client_profiles_set_updated_at
before update on public.client_profiles
for each row execute function public.set_updated_at();

drop trigger if exists client_case_updates_set_updated_at on public.client_case_updates;
create trigger client_case_updates_set_updated_at
before update on public.client_case_updates
for each row execute function public.set_updated_at();

alter table public.client_profiles enable row level security;
alter table public.client_case_updates enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- client_profiles policies
DROP POLICY IF EXISTS "client_profiles_admin_all" ON public.client_profiles;
create policy "client_profiles_admin_all"
on public.client_profiles
for all
using (public.is_admin_user())
with check (public.is_admin_user());

DROP POLICY IF EXISTS "client_profiles_client_select_own" ON public.client_profiles;
create policy "client_profiles_client_select_own"
on public.client_profiles
for select
using (
  can_access_portal = true and auth_user_id = auth.uid()
);

-- updates policies
DROP POLICY IF EXISTS "client_updates_admin_all" ON public.client_case_updates;
create policy "client_updates_admin_all"
on public.client_case_updates
for all
using (public.is_admin_user())
with check (public.is_admin_user());

DROP POLICY IF EXISTS "client_updates_client_select_own_visible" ON public.client_case_updates;
create policy "client_updates_client_select_own_visible"
on public.client_case_updates
for select
using (
  visible_to_client = true
  and exists (
    select 1
    from public.client_profiles cp
    where cp.id = client_profile_id
      and cp.auth_user_id = auth.uid()
      and cp.can_access_portal = true
  )
);
