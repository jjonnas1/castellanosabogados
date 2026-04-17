'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { AdminAuthContext } from '@/contexts/admin-auth';

// Páginas de admin que no necesitan sesión
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_ADMIN_PATHS.includes(pathname);

  const [token,  setToken]  = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // Las páginas públicas arrancan "ready" de inmediato para no bloquear el login
  const [ready, setReady] = useState(isPublic);
  const didRedirect = useRef(false);

  useEffect(() => {
    // Páginas públicas (login) no necesitan verificar sesión
    if (isPublic) return;

    let mounted = true;

    function applySession(session: { access_token: string; user: { id: string } } | null) {
      if (!mounted) return;
      if (session?.access_token) {
        setToken(session.access_token);
        setUserId(session.user.id);
        setReady(true);
      } else if (!didRedirect.current) {
        didRedirect.current = true;
        router.replace('/admin/login');
      }
    }

    // 1. Intento inmediato con getSession()
    supabase.auth.getSession()
      .then(({ data: { session } }) => applySession(session))
      .catch(() => {
        if (mounted && !didRedirect.current) {
          didRedirect.current = true;
          router.replace('/admin/login');
        }
      });

    // 2. Escuchar cambios de auth (INITIAL_SESSION, TOKEN_REFRESHED, SIGNED_OUT)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);

  // Mostrar spinner mientras se confirma la sesión (solo en páginas protegidas)
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
