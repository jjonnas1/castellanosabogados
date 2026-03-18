-- Ensure profiles table exists and is the single source of auth role truth.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'client' check (role in ('admin', 'client')),
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists role text not null default 'client';
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

create unique index if not exists idx_profiles_email_unique on public.profiles (email) where email is not null;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Replace old admin resolver that referenced non-existent user_profiles.
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

-- Guarantee owner admin role in profiles.
insert into public.profiles (id, email, role)
select u.id, lower(u.email), 'admin'
from auth.users u
where lower(u.email) = 'jonatancastellanosabogado@gmail.com'
on conflict (id) do update
set email = excluded.email,
    role = 'admin';

update public.profiles
set role = 'admin'
where lower(email) = 'jonatancastellanosabogado@gmail.com';
