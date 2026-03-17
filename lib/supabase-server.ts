import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error('Supabase server env is missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).');
  }

  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function requireAdmin(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return { ok: false as const, error: 'No autorizado' };

  const token = authHeader.slice('Bearer '.length);
  const supabaseServer = getSupabaseServer();

  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) return { ok: false as const, error: 'Sesión inválida' };

  const ownerEmail = (process.env.ADMIN_OWNER_EMAIL ?? '').trim().toLowerCase();
  const userEmail = (userData.user.email ?? '').toLowerCase();

  if (ownerEmail && userEmail === ownerEmail) {
    return { ok: true as const, user: userData.user, profile: { role: 'admin', email: userEmail } };
  }

  const profileByUserProfiles = await supabaseServer
    .from('user_profiles')
    .select('role,email')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (!profileByUserProfiles.error && profileByUserProfiles.data?.role === 'admin') {
    return { ok: true as const, user: userData.user, profile: profileByUserProfiles.data };
  }

  const profileByProfiles = await supabaseServer
    .from('profiles')
    .select('role,email')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (!profileByProfiles.error && profileByProfiles.data?.role === 'admin') {
    return { ok: true as const, user: userData.user, profile: profileByProfiles.data };
  }

  return { ok: false as const, error: 'Permisos insuficientes' };
}
