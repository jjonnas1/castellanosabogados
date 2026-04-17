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
  const redirected = useRef(false);

  useEffect(() => {
    if (isPublic) return;

    let mounted = true;

    // ── onAuthStateChange: SOLO actualiza el token cuando llega sesión válida.
    //    NUNCA redirige desde aquí — INITIAL_SESSION puede disparar null antes
    //    de que las cookies estén disponibles (falso negativo).
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        setToken(session.access_token);
        setUserId(session.user.id);
        setReady(true);
      }
      // null session aquí no significa "no autenticado" — puede ser timing.
      // getSession() es la fuente de verdad para la decisión de redirigir.
    });

    // ── getSession() ES el único trigger de redirect.
    //    Lee directamente las cookies y es autoritativo.
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.access_token) {
          setToken(session.access_token);
          setUserId(session.user.id);
          setReady(true);
        } else if (!redirected.current) {
          redirected.current = true;
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        if (mounted && !redirected.current) {
          redirected.current = true;
          router.replace('/admin/login');
        }
      });

    // Fallback: si en 6 s getSession() no resolvió, desbloquear igual
    // (el middleware ya protegió la ruta en el servidor)
    const timeout = setTimeout(() => {
      if (mounted) setReady(true);
    }, 6000);

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
