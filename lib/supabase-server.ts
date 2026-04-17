import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// Cliente para Server Components (basado en cookies)
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

// Cliente con privilegios administrativos (Service Role)
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error('Faltan llaves de Supabase Admin');
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Helper para obtener el cliente servidor
export function getSupabaseServer(options?: { serviceRole?: boolean }) {
  if (options?.serviceRole) return createSupabaseAdminClient();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// LA FUNCIÓN CRÍTICA: Simplificada para no bloquearte
export async function requireAdmin(authHeader?: string | null) {
  const supabaseAdmin = createSupabaseAdminClient();
  let user: any = null;

  try {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice('Bearer '.length);
      const { data } = await supabaseAdmin.auth.getUser(token);
      user = data.user;
    } else {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) return { ok: false as const, status: 401, error: 'No autenticado' };

    // Verificación de email de dueño (Jonatan)
    const ownerEmail = 'jonatancastellanosabogado@gmail.com';
    const isOwner = user.email?.toLowerCase() === ownerEmail.toLowerCase();

    // Buscamos el perfil
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    // Si eres el dueño o tienes rol admin, pasas directo
    if (isOwner || profile?.role === 'admin') {
      return { ok: true as const, user, profile: profile || { role: 'admin' }, supabase: supabaseAdmin };
    }

    return { ok: false as const, status: 403, error: 'Acceso denegado' };

  } catch (err: any) {
    return { ok: false as const, status: 500, error: err.message };
  }
}
