-- Private legal panel tables
create extension if not exists "pgcrypto";

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha date not null,
  tarea text not null,
  categoria text not null,
  prioridad text not null check (prioridad in ('Alta', 'Media', 'Baja')),
  estado text not null check (estado in ('Pendiente', 'En progreso', 'Hecho')),
  impacto text not null check (impacto in ('Dinero', 'Legal', 'Crecimiento', 'Familia')),
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha date not null,
  cliente text not null,
  marce text,
  patio text,
  radicados text[] not null default '{}',
  proceso text not null,
  beneficios text[] not null default '{}',
  estado text not null,
  proxima_actuacion text,
  prioridad text not null check (prioridad in ('Alta', 'Media', 'Baja')),
  honorarios numeric(12,2) not null default 0,
  pago text not null default 'pendiente' check (pago in ('pendiente', 'abono', 'pagado')),
  comentarios text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id uuid not null references public.legal_cases(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  status text not null check (status in ('pendiente', 'abono', 'pagado')),
  movement_date date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.today_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  sort_order int not null check (sort_order between 1 and 3),
  created_at timestamptz not null default now(),
  unique (user_id, task_id),
  unique (user_id, sort_order)
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

drop trigger if exists legal_cases_set_updated_at on public.legal_cases;
create trigger legal_cases_set_updated_at
before update on public.legal_cases
for each row execute function public.set_updated_at();

alter table public.tasks enable row level security;
alter table public.legal_cases enable row level security;
alter table public.case_payments enable row level security;
alter table public.today_tasks enable row level security;

drop policy if exists "tasks_select_own" on public.tasks;
create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id);
drop policy if exists "tasks_insert_own" on public.tasks;
create policy "tasks_insert_own" on public.tasks for insert with check (auth.uid() = user_id);
drop policy if exists "tasks_update_own" on public.tasks;
create policy "tasks_update_own" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_delete_own" on public.tasks for delete using (auth.uid() = user_id);

drop policy if exists "cases_select_own" on public.legal_cases;
create policy "cases_select_own" on public.legal_cases for select using (auth.uid() = user_id);
drop policy if exists "cases_insert_own" on public.legal_cases;
create policy "cases_insert_own" on public.legal_cases for insert with check (auth.uid() = user_id);
drop policy if exists "cases_update_own" on public.legal_cases;
create policy "cases_update_own" on public.legal_cases for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "cases_delete_own" on public.legal_cases;
create policy "cases_delete_own" on public.legal_cases for delete using (auth.uid() = user_id);

drop policy if exists "payments_select_own" on public.case_payments;
create policy "payments_select_own" on public.case_payments for select using (auth.uid() = user_id);
drop policy if exists "payments_insert_own" on public.case_payments;
create policy "payments_insert_own" on public.case_payments for insert with check (auth.uid() = user_id);
drop policy if exists "payments_update_own" on public.case_payments;
create policy "payments_update_own" on public.case_payments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "payments_delete_own" on public.case_payments;
create policy "payments_delete_own" on public.case_payments for delete using (auth.uid() = user_id);

drop policy if exists "today_select_own" on public.today_tasks;
create policy "today_select_own" on public.today_tasks for select using (auth.uid() = user_id);
drop policy if exists "today_insert_own" on public.today_tasks;
create policy "today_insert_own" on public.today_tasks for insert with check (auth.uid() = user_id);
drop policy if exists "today_update_own" on public.today_tasks;
create policy "today_update_own" on public.today_tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "today_delete_own" on public.today_tasks;
create policy "today_delete_own" on public.today_tasks for delete using (auth.uid() = user_id);
