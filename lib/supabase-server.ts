import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );
}

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function hasServiceRole() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getAllowedOwnerEmails() {
  const ownerEmail = (process.env.ADMIN_OWNER_EMAIL ?? '').trim().toLowerCase();
  const fallbackOwner = 'jonatancastellanosabogado@gmail.com';
  return [ownerEmail, fallbackOwner].filter(Boolean);
}

async function ensureOwnerAdminRole(user: { id: string; email?: string | null }) {
  if (!hasServiceRole()) return false;

  const userEmail = (user.email ?? '').trim().toLowerCase();
  if (!userEmail || !getAllowedOwnerEmails().includes(userEmail)) return false;

  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin.from('profiles').upsert({
    id: user.id,
    email: userEmail,
    role: 'admin',
  });

  return !error;
}

export function getSupabaseServer(options?: { serviceRole?: boolean }) {
  if (options?.serviceRole) return createSupabaseAdminClient();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Supabase env is missing (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY).');
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function requireAdmin(authHeader?: string | null) {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    if (!hasServiceRole()) {
      return { ok: false as const, status: 500, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' };
    }

    const token = authHeader.slice('Bearer '.length);
    const supabaseAdmin = createSupabaseAdminClient();
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return { ok: false as const, status: 401, error: 'No autenticado' };
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      return { ok: false as const, status: 500, error: profileError.message };
    }

    if (!profile || profile.role !== 'admin') {
      const ownerRoleEnsured = await ensureOwnerAdminRole(user);
      if (!ownerRoleEnsured) {
        return { ok: false as const, status: 403, error: 'Permisos insuficientes' };
      }

      const { data: ensuredProfile, error: ensuredProfileError } = await supabaseAdmin
        .from('profiles')
        .select('id, email, role')
        .eq('id', user.id)
        .maybeSingle();

      if (ensuredProfileError) {
        return { ok: false as const, status: 500, error: ensuredProfileError.message };
      }

      if (!ensuredProfile || ensuredProfile.role !== 'admin') {
        return { ok: false as const, status: 403, error: 'Permisos insuficientes' };
      }

      return { ok: true as const, user, profile: ensuredProfile, supabase: supabaseAdmin };
    }

    return { ok: true as const, user, profile, supabase: supabaseAdmin };
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: false as const, status: 401, error: 'No autenticado' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    return { ok: false as const, status: 500, error: profileError.message };
  }

  if (!profile || profile.role !== 'admin') {
    const ownerRoleEnsured = await ensureOwnerAdminRole(user);
    if (!ownerRoleEnsured) {
      return { ok: false as const, status: 403, error: 'Permisos insuficientes' };
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const { data: ensuredProfile, error: ensuredProfileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, role')
      .eq('id', user.id)
      .maybeSingle();

    if (ensuredProfileError) {
      return { ok: false as const, status: 500, error: ensuredProfileError.message };
    }

    if (!ensuredProfile || ensuredProfile.role !== 'admin') {
      return { ok: false as const, status: 403, error: 'Permisos insuficientes' };
    }

    return { ok: true as const, user, profile: ensuredProfile, supabase };
  }

  return { ok: true as const, user, profile, supabase };
}
