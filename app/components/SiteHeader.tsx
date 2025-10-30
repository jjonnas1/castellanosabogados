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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session ?? null);
        setReady(true);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Rutas que ya usas en tu proyecto
  const clientLogin = '/cliente/login';
  const clientRegister = '/cliente/registro';
  const clientPanel = '/cliente/panel';

  const lawyerLogin = '/abogados/login';
  const lawyerRegister = '/abogados/registro';
  const lawyerPanel = '/abogados/panel';

  const goAgenda = () => {
    if (!session) window.location.href = clientLogin; // sin sesión → login cliente
    else window.location.href = '/agenda';             // con sesión → agenda
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Mientras hidrata
  if (!ready) {
    return (
      <header className="site-header">
        <div className="wrap" style={{ display: 'flex', gap: 16, alignItems: 'center', height: 64 }}>
          <Link href="/" className="logo">Castellanos <strong>Abogados</strong></Link>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="wrap" style={{ display: 'flex', gap: 16, alignItems: 'center', height: 64 }}>
        <Link href="/" className="logo">Castellanos <strong>Abogados</strong></Link>

        <nav style={{ display: 'flex', gap: 12, marginLeft: 24 }}>
          <Link href="/">Inicio</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>

          {/* ====== Menú Clientes ====== */}
          <div className="menu">
            <button className="menu__btn">Clientes ▾</button>
            <div className="menu__list">
              {!session ? (
                <>
                  <Link href={clientRegister}>Registrarse</Link>
                  <Link href={clientLogin}>Iniciar sesión</Link>
                </>
              ) : (
                <>
                  <Link href={clientPanel}>Mi panel</Link>
                  <button onClick={logout} className="aslink">Cerrar sesión</button>
                </>
              )}
            </div>
          </div>

          {/* ====== Menú Abogados ====== */}
          <div className="menu">
            <button className="menu__btn">Abogados ▾</button>
            <div className="menu__list">
              {/* Estos accesos son para abogados (independientes) */}
              <Link href={lawyerRegister}>Registro de abogados</Link>
              <Link href={lawyerLogin}>Acceso / Iniciar sesión</Link>
              <Link href={lawyerPanel}>Mi panel</Link>
            </div>
          </div>
        </nav>

        {/* Lado derecho */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button className="btn btn--primary" onClick={goAgenda}>Agendar asesoría</button>
          <Link className="btn btn--ghost" href="/trabaja">Trabaja con nosotros</Link>
        </div>
      </div>

      {/* estilos mínimos para el menú (usa tu CSS si ya lo tienes) */}
      <style jsx>{`
        .menu { position: relative; }
        .menu__btn { background: transparent; border: 0; cursor: pointer; }
        .menu__list {
          position: absolute; top: 100%; left: 0;
          min-width: 220px; display: none; z-index: 40;
          background: var(--panel, #fff); border: 1px solid #e8e8e8; border-radius: 12px; padding: 8px;
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .menu:hover .menu__list { display: grid; gap: 6px; }
        .menu__list a, .menu__list .aslink {
          padding: 8px 10px; border-radius: 10px; text-align: left;
        }
        .menu__list a:hover, .menu__list .aslink:hover { background: rgba(0,0,0,.04); }
        .aslink { background: transparent; border: 0; cursor: pointer; }
      `}</style>
    </header>
  );
}
