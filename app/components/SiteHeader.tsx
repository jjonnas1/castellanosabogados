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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user?.id) {
        const { data: prof } = await supabase
          .from('profiles')              // si usas user_profiles, cambia aquí
          .select('role')
          .eq('id', data.session.user.id)
          .maybeSingle();

        setRole(prof?.role ?? null);
      } else {
        setRole(null);
      }
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      // refresca el header al iniciar / cerrar sesión
      window.location.reload();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <nav className="wrap nav">
        <Link href="/" className="logo">Castellanos <strong>Abogados</strong></Link>

        <ul className="nav__links">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/servicios">Servicios</Link></li>
          <li><Link href="/contacto">Contacto</Link></li>
          <li><Link href="/agenda">Agendar asesoría</Link></li>
          {/* Muestra ADMIN si el usuario es admin */}
          {!loading && role === 'admin' && (
            <li><Link href="/admin"><strong>Admin</strong></Link></li>
          )}
        </ul>

        <div className="nav__auth">
          {/* Si no hay sesión, mostrar acceso */}
          {!session && (
            <Link className="btn btn--ghost" href="/cliente/acceso">Iniciar sesión</Link>
          )}

          {/* Si hay sesión, botón de cerrar */}
          {session && (
            <button className="btn btn--ghost" onClick={handleSignOut}>Cerrar sesión</button>
          )}
        </div>
      </nav>
    </header>
  );
}
