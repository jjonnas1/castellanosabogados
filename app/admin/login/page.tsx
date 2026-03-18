'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

const FALLBACK_ADMIN_EMAIL = 'jonatancastellanosabogado@gmail.com';

async function getStableSession() {
  for (let i = 0; i < 6; i += 1) {
    const sessionData = await supabase.auth.getSession();
    if (sessionData.data.session?.user) return sessionData;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  return supabase.auth.getSession();
}

async function resolveClientAdmin(): Promise<boolean> {
  const sessionData = await getStableSession();
  const user = sessionData.data.session?.user;

  if (!user) return false;

  const userEmail = (user.email ?? '').toLowerCase();
  if (userEmail && userEmail === FALLBACK_ADMIN_EMAIL) return true;

  const token = sessionData.data.session?.access_token;
  if (token) {
    try {
      const res = await fetch('/api/admin/me', {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) return true;
    } catch {
      // fallback to client profile query
    }
  }

  const { data: byId } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (byId?.role === 'admin') return true;

  if (userEmail) {
    const { data: byEmail } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('email', userEmail)
      .maybeSingle();

    if (byEmail?.role === 'admin') return true;

    const { data: profileByEmail } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', userEmail)
      .maybeSingle();

    if (profileByEmail?.role === 'admin') return true;
  }

  const { data: profileById } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  return profileById?.role === 'admin';
}

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const isAdmin = await resolveClientAdmin();

        if (isAdmin) {
          window.location.href = '/admin/dashboard';
          return;
        }
      } catch {
        setError('No pudimos validar tu sesión en este momento. Intenta nuevamente.');
      }

      setChecking(false);
    };

    checkAdmin();

    const { data: authSub } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => authSub.subscription.unsubscribe();
  }, []);

  async function loginWithGoogle() {
    setLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/admin/dashboard`
            : undefined,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">CastellanosAbogados</p>
        <h1 className="text-2xl font-semibold text-slate-900">Login administrador</h1>
        <p className="mt-1 text-sm text-slate-600">Acceso interno para administrar agenda y asignación de citas con Google (sin contraseña local).</p>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white"
            disabled={loading || checking}
          >
            {checking ? 'Verificando sesión…' : loading ? 'Redirigiendo…' : 'Continuar con Google'}
          </button>

          <p className="text-xs text-slate-500">
            Solo usuarios con rol <strong>admin</strong> podrán ver el panel administrativo.
          </p>
        </div>

        {error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      </div>
    </main>
  );
}
