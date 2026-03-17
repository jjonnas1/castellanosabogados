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

  const { data: profile, error: profileError } = await supabaseServer
    .from('user_profiles')
    .select('role,email')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== 'admin') return { ok: false as const, error: 'Permisos insuficientes' };

  return { ok: true as const, user: userData.user, profile };
}
