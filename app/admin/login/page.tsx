'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        window.location.href = '/administrativo/citas';
      }
    })();
  }, []);

  async function loginWithGoogle() {
    setLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/administrativo/citas`
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
        <p className="mt-1 text-sm text-slate-600">Acceso interno para administrar agenda y asignación de citas.</p>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white"
            disabled={loading}
          >
            {loading ? 'Redirigiendo…' : 'Ingresar con Google'}
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
