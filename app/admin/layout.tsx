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

    // Si ya verificamos la sesión antes en esta pestaña, no esperamos de nuevo
    const cached = sessionStorage.getItem('admin_session_ok');
    if (cached === 'true') {
      setReady(true);
      return;
    }

    let mounted = true;
    found.current      = false;
    redirected.current = false;

    function applySession(session: { access_token: string; user: { id: string } } | null) {
      if (!mounted || found.current) return;
      if (session?.access_token) {
        found.current = true;
        sessionStorage.setItem('admin_session_ok', 'true');
        setToken(session.access_token);
        setUserId(session.user.id);
        setReady(true);
      }
    }

    function doRedirect() {
      if (mounted && !found.current && !redirected.current) {
        redirected.current = true;
        sessionStorage.removeItem('admin_session_ok');
        router.replace('/admin/login');
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        applySession(session);
      } else if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem('admin_session_ok');
        doRedirect();
      }
    });

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.access_token) {
          applySession(session);
        } else {
          setTimeout(doRedirect, 2000);
        }
      })
      .catch(() => {
        setTimeout(doRedirect, 2000);
      });

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
