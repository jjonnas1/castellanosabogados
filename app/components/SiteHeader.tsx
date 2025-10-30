'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SiteHeader() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setReady(true);
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return null;

  return (
    <header className="sitebar">
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="Castellanos Abogados">
          <strong>Castellanos</strong> <span style={{ opacity: 0.7 }}>Abogados</span>
        </Link>

        <nav className="nav-main" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/" className="nav-item">Inicio</Link>
          <Link href="/servicios" className="nav-item">Servicios</Link>
          <Link href="/contacto" className="nav-item">Contacto</Link>

          {session ? (
            <>
              <Link href="/agenda" className="btn btn--primary">
                Agendar asesoría
              </Link>
              <Link href="/cliente/panel" className="btn btn--ghost">
                Mi cuenta
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
                className="btn btn--ghost"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/cliente/acceso" className="btn btn--primary">
                Agendar asesoría
              </Link>
              <Link href="/trabaja" className="btn btn--ghost">
                Trabaja con nosotros
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
