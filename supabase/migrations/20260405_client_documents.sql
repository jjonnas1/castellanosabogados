create table if not exists public.client_documents (
  id uuid primary key default gen_random_uuid(),
  client_profile_id uuid not null references public.client_profiles(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  uploaded_by_admin_id uuid references auth.users(id) on delete set null,
  visible_to_client boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.client_documents enable row level security;

drop policy if exists documents_admin_all on public.client_documents;
create policy documents_admin_all on public.client_documents
  for all
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists documents_client_select_own_visible on public.client_documents;
create policy documents_client_select_own_visible on public.client_documents
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
