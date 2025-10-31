'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';

export default function SiteHeader() {
  const [session, setSession] = useState<Session|null>(null);
  const [role, setRole] = useState<'client'|'lawyer'|'admin'|'unknown'>('unknown');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) { setRole('unknown'); return; }
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();
      setRole((data?.role as any) ?? 'client');
    })();
  }, [session]);

  const gotoAgenda = () => {
    if (!session) window.location.href = '/cliente/acceso';
    else window.location.href = '/agenda';
  };

  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo">Castellanos <b>Abogados</b></Link>

        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>

          <div className="nav__group">
            <button className="btn btn--primary" onClick={gotoAgenda}>
              Agendar asesoría
            </button>
            {!session ? (
              <Link href="/cliente/acceso" className="btn btn--ghost">Iniciar sesión</Link>
            ) : (
              <>
                <Link href="/cliente/panel" className="btn btn--ghost">Mi panel</Link>
                {role === 'admin' && <Link href="/admin" className="btn btn--ghost">Admin</Link>}
                <button
                  className="btn btn--ghost"
                  onClick={async () => { await supabase.auth.signOut(); location.href='/'; }}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

