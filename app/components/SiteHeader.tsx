'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SiteHeader() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<'client' | 'lawyer' | 'admin' | null>(null);
  const isAuthed = !!session;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);

      const uid = data.session?.user?.id;
      if (uid) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', uid)
          .maybeSingle();
        if (prof?.role) setRole(prof.role);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
      setSession(s);
      const uid = s?.user?.id;
      if (uid) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', uid)
          .maybeSingle();
        if (prof?.role) setRole(prof.role);
      } else {
        setRole(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  function gotoAgenda() {
    if (!isAuthed) {
      window.location.href = '/cliente/acceso';
    } else {
      window.location.href = '/agenda';
    }
  }

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* IZQUIERDA */}
        <div className="nav-left" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/" className="logo" aria-label="Castellanos Abogados">
            <strong>Castellanos</strong> <span style={{ opacity: 0.7 }}>Abogados</span>
          </Link>

          <nav aria-label="Principal" className="nav-main" style={{ display: 'flex', gap: 6 }}>
            <Link href="/" className="active" style={{ padding: '8px 14px', borderRadius: 12 }}>Inicio</Link>
            <Link href="/servicios" style={{ padding: '8px 14px', borderRadius: 12 }}>Servicios</Link>
            <Link href="/contacto" style={{ padding: '8px 14px', borderRadius: 12 }}>Contacto</Link>

            {/* Clientes */}
            <details className="dropdown">
              <summary className="dropdown-trigger">Clientes <span className="chev">▾</span></summary>
              <div className="dropdown-panel">
                <Link href="/cliente/acceso" className="dropdown-item">Acceso / Registro</Link>
                <Link href="/cliente/panel" className="dropdown-item">Mi panel</Link>
              </div>
            </details>

            {/* Abogados */}
            <details className="dropdown">
              <summary className="dropdown-trigger">Abogados <span className="chev">▾</span></summary>
              <div className="dropdown-panel">
                <Link href="/registro/abogado" className="dropdown-item">Registro de abogados</Link>
                <Link href="/panel" className="dropdown-item">Panel de abogado</Link>
              </div>
            </details>

            {/* Admin solo si rol=admin */}
            {role === 'admin' && (
              <Link href="/admin" style={{ padding: '8px 14px', borderRadius: 12, fontWeight: 700 }}>
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* DERECHA: CTA + sesión */}
        <div className="nav-right" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn--primary" onClick={gotoAgenda}>Agendar asesoría</button>

          {!isAuthed ? (
            <Link href="/cliente/acceso" className="btn btn--ghost">Iniciar sesión</Link>
          ) : (
            <button
              className="btn btn--ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
