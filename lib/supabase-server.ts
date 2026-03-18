import { createClient } from '@supabase/supabase-js';

export function hasServiceRole() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseServer(options?: { serviceRole?: boolean }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const requiresServiceRole = options?.serviceRole ?? false;

  const key = requiresServiceRole ? serviceRole : serviceRole || anonKey;

  if (!url || !key) {
    if (requiresServiceRole) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY es obligatorio para operaciones admin.');
    }
    throw new Error('Supabase env is missing (NEXT_PUBLIC_SUPABASE_URL and a server key).');
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function hasAnyAdmin(supabaseServer: any) {
  const p = await supabaseServer.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin');
  return (p.count ?? 0) > 0;
}

async function bootstrapFirstAdmin(
  supabaseServer: any,
  user: { id: string; email?: string | null },
) {
  if (!hasServiceRole()) return false;

  const alreadyHasAdmin = await hasAnyAdmin(supabaseServer);
  if (alreadyHasAdmin) return false;

  const email = user.email ?? '';
  await supabaseServer.from('profiles').upsert({
    id: user.id,
    email,
    role: 'admin',
  });

  return true;
}

export async function requireAdmin(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return { ok: false as const, error: 'No autorizado' };
  if (!hasServiceRole()) {
    return { ok: false as const, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' };
  }

  const token = authHeader.slice('Bearer '.length);
  const supabaseServer = getSupabaseServer({ serviceRole: true });

  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) return { ok: false as const, error: 'Sesión inválida' };

  const configuredOwnerEmail = (process.env.ADMIN_OWNER_EMAIL ?? '').trim().toLowerCase();
  const fallbackOwnerEmail = 'jonatancastellanosabogado@gmail.com';
  const ownerEmails = [configuredOwnerEmail, fallbackOwnerEmail].filter(Boolean);
  const userEmail = (userData.user.email ?? '').toLowerCase();

  if (userEmail && ownerEmails.includes(userEmail)) {
    return { ok: true as const, user: userData.user, profile: { role: 'admin', email: userEmail } };
  }

  if (userEmail) {
    const profileByProfilesEmail = await supabaseServer
      .from('profiles')
      .select('role,email')
      .eq('email', userEmail)
      .maybeSingle();

    if (!profileByProfilesEmail.error && profileByProfilesEmail.data?.role === 'admin') {
      return { ok: true as const, user: userData.user, profile: profileByProfilesEmail.data };
    }
  }

  const profileByProfiles = await supabaseServer
    .from('profiles')
    .select('role,email')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (!profileByProfiles.error && profileByProfiles.data?.role === 'admin') {
    return { ok: true as const, user: userData.user, profile: profileByProfiles.data };
  }

  const bootstrapped = await bootstrapFirstAdmin(supabaseServer, {
    id: userData.user.id,
    email: userData.user.email,
  });

  if (bootstrapped) {
    return {
      ok: true as const,
      user: userData.user,
      profile: { role: 'admin', email: userData.user.email ?? '' },
    };
  }

  return { ok: false as const, error: 'Permisos insuficientes' };
}
