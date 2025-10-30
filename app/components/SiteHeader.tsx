'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

type Item = { href: string; label: string };

function isActivePath(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={active ? 'active' : undefined}
      style={{ padding: '8px 14px', borderRadius: 12 }}
    >
      {label}
    </Link>
  );
}

function DropMenu({
  label,
  items,
  active,
}: {
  label: string;
  items: Item[];
  active?: boolean;
}) {
  return (
    <details className={`dropdown ${active ? 'active' : ''}`}>
      <summary className="dropdown-trigger">
        {label}
        <span className="chev">▾</span>
      </summary>
      <div className="dropdown-panel">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="dropdown-item">
            {it.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Cargar sesión actual y escuchar cambios
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session ?? null);
        setAuthReady(true);
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

  // CTA: si hay sesión → agenda; si no → acceso cliente
  const handleAgendar = () => {
    if (!authReady) return;
    if (session) router.push('/agenda');
    else router.push('/cliente/acceso');
  };

  // Menú Clientes (enfoque claro a login/panel)
  const clientesItems: Item[] = [
    { href: '/cliente/acceso', label: 'Iniciar sesión / Registrarme' },
    { href: '/cliente/panel', label: 'Mi panel' },
  ];

  // Menú Abogados
  const abogadosItems: Item[] = [
    { href: '/registro/abogado', label: 'Registro de abogados' },
    { href: '/login', label: 'Acceso / Iniciar sesión' },
    { href: '/panel', label: 'Mi panel' },
  ];

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* IZQUIERDA: logo + navegación principal */}
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" className="logo" aria-label="Castellanos Abogados">
            <strong>Castellanos</strong>{' '}
            <span style={{ opacity: 0.7 }}>Abogados</span>
          </Link>

          <nav aria-label="Principal" className="nav-main" style={{ display: 'flex', gap: 6 }}>
            <NavLink
              href="/"
              label="Inicio"
              active={isActivePath(pathname, '/', true)}
            />
            <NavLink
              href="/servicios"
              label="Servicios"
              active={isActivePath(pathname, '/servicios')}
            />
            <NavLink
              href="/contacto"
              label="Contacto"
              active={isActivePath(pathname, '/contacto')}
            />
            <DropMenu
              label="Clientes"
              items={clientesItems}
              active={
                isActivePath(pathname, '/cliente') ||
                isActivePath(pathname, '/clientes')
              }
            />
            <DropMenu
              label="Abogados"
              items={abogadosItems}
              active={
                isActivePath(pathname, '/abogados') ||
                isActivePath(pathname, '/registro') ||
                isActivePath(pathname, '/panel') ||
                isActivePath(pathname, '/login')
              }
            />
          </nav>
        </div>

        {/* DERECHA: CTAs destacados */}
        <div className="nav-right" style={{ display: 'flex', gap: 8 }}>
          <Link href="/trabaja" className="btn btn--ghost">
            Trabaja con nosotros
          </Link>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleAgendar}
            disabled={!authReady}
            aria-disabled={!authReady}
            title={authReady ? 'Agendar asesoría' : 'Cargando sesión…'}
          >
            Agendar asesoría
          </button>
        </div>
      </div>
    </header>
  );
}
