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
        get(name: string) { return cookieStore.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
}

export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// ESTA ES LA FUNCIÓN QUE FALTABA Y CAUSÓ EL ERROR DE VERCEL
export function hasServiceRole() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function requireAdmin(authHeader?: string | null) {
  try {
    const supabaseAdmin = createSupabaseAdminClient();
    let user: any = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const { data } = await supabaseAdmin.auth.getUser(token);
      user = data.user;
    } else {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) return { ok: false as const, status: 401, error: 'Sesión expirada' };

    const masterEmail = 'jonatancastellanosabogado@gmail.com';
    if (user.email?.toLowerCase() === masterEmail.toLowerCase()) {
      return { ok: true as const, user, profile: { role: 'admin' }, supabase: supabaseAdmin };
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.role === 'admin') {
      return { ok: true as const, user, profile, supabase: supabaseAdmin };
    }

    return { ok: false as const, status: 403, error: 'No tienes permiso de admin' };
  } catch (err: any) {
    return { ok: false as const, status: 500, error: err.message };
  }
}

export function getSupabaseServer(options?: { serviceRole?: boolean }) {
  if (options?.serviceRole) return createSupabaseAdminClient();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
