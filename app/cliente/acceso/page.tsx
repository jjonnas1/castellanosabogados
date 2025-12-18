'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Link from 'next/link';

export default function AccessPage() {
  const [status, setStatus] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setStatus(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${location.origin}/cliente/panel` : undefined,
      },
    });
    if (error) {
      setStatus('No pudimos iniciar el flujo con Google. Verifica la configuración de OAuth.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-[#eef3f9] pb-16">
      <div className="container section-shell max-w-xl">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Acceso</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Portal de clientes</h1>
          <p className="mt-2 text-slate-700">Inicia sesión para agendar y gestionar tus sesiones.</p>

          <button
            className="mt-6 inline-flex w-full justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800"
            onClick={signInWithGoogle}
          >
            Continuar con Google
          </button>

          {status && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {status}
            </div>
          )}

          <p className="mt-4 text-sm text-slate-600">
            ¿Problemas para acceder? Confirma que las URLs de redirección estén configuradas en Supabase y Google Cloud.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-brand-800">
            <Link href="/agenda" className="hover:underline">
              Volver a la agenda
            </Link>
            <Link href="/contacto" className="hover:underline">
              Contactar soporte
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
