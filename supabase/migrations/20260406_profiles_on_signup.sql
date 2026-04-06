-- Ensure every new auth user has a corresponding profile row.
create or replace function public.handle_new_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    lower(new.email),
    case
      when lower(new.email) = 'jonatancastellanosabogado@gmail.com' then 'admin'
      else 'client'
    end,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_profile();

-- Backfill users created before this trigger existed.
insert into public.profiles (id, email, role, full_name)
select
  u.id,
  lower(u.email),
  case
    when lower(u.email) = 'jonatancastellanosabogado@gmail.com' then 'admin'
    else 'client'
  end,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name')
from auth.users u
on conflict (id) do update
set email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name);
