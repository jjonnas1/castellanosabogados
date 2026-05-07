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
  // ready=true por defecto: evita el flash de redirect durante navegación
  // client-side entre sub-rutas del admin (el layout no se desmonta).
  const [ready,  setReady]  = useState(true);

  const redirected = useRef(false);

  useEffect(() => {
    if (isPublic) return;

    let mounted = true;
    redirected.current = false;

    // Fuente 1: onAuthStateChange — detecta cambios en tiempo real
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        setToken(session.access_token);
        setUserId(session.user.id);
        setReady(true);
      } else if (event === 'SIGNED_OUT') {
        if (!redirected.current) {
          redirected.current = true;
          setReady(false);
          router.replace('/admin/login');
        }
      }
    });

    // Fuente 2: getSession() — lee cookies directamente
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.access_token) {
          setToken(session.access_token);
          setUserId(session.user.id);
        } else {
          // Sin sesión → redirigir tras 1.5 s de gracia
          setTimeout(() => {
            if (mounted && !redirected.current) {
              redirected.current = true;
              setReady(false);
              router.replace('/admin/login');
            }
          }, 1500);
        }
      })
      .catch(() => {
        if (mounted && !redirected.current) {
          redirected.current = true;
          router.replace('/admin/login');
        }
      });

    return () => {
      mounted = false;
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
