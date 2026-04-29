'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { AdminAuthContext } from '@/contexts/admin-auth';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_ADMIN_PATHS.includes(pathname);

  const [token,  setToken]  = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready,  setReady]  = useState(isPublic);

  const found      = useRef(false);
  const redirected = useRef(false);

  useEffect(() => {
    if (isPublic) return;

    let mounted = true;
    found.current      = false;
    redirected.current = false;

    function applySession(session: { access_token: string; user: { id: string } } | null) {
      if (!mounted || found.current) return;
      if (session?.access_token) {
        found.current = true;
        setToken(session.access_token);
        setUserId(session.user.id);
        setReady(true);
      }
    }

    function doRedirect() {
      if (mounted && !found.current && !redirected.current) {
        redirected.current = true;
        router.replace('/admin/login');
      }
    }

    // Fuente 1: onAuthStateChange
    // - Aplica sesión válida cuando llega.
    // - Solo redirige en SIGNED_OUT explícito (no en INITIAL_SESSION null,
    //   que puede ser un falso negativo por timing de cookies).
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        applySession(session);
      } else if (event === 'SIGNED_OUT') {
        doRedirect();
      }
      // INITIAL_SESSION null → ignorar, getSession() es la fuente de verdad
    });

    // Fuente 2: getSession() lee las cookies directamente.
    // Si devuelve sesión → listo.
    // Si devuelve null → esperar 2 s por si onAuthStateChange llega después,
    // luego redirigir solo si aún no hay sesión.
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.access_token) {
          applySession(session);
        } else {
          // Grace period: cookies pueden tardar un ciclo en propagarse
          setTimeout(doRedirect, 2000);
        }
      })
      .catch(() => {
        setTimeout(doRedirect, 2000);
      });

    // Fallback absoluto: 10 s sin sesión → redirigir
    const timeout = setTimeout(doRedirect, 10_000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      sub.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1626]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ token, userId }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
