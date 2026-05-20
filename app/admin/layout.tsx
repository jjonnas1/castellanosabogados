'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { AdminAuthContext } from '@/contexts/admin-auth';
import { verifyAdminSession } from '@/lib/admin-auth-client';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const ADMIN_CACHE_KEY = 'ca_admin_user_id';
const AUTH_RETRY_MS = 700;
const AUTH_MAX_ATTEMPTS = 3;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublic = PUBLIC_ADMIN_PATHS.includes(pathname);

  const [token,  setToken]  = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(!isPublic);

  useEffect(() => {
    if (isPublic) {
      setToken(null);
      setUserId(null);
      setChecking(false);
      return;
    }

    let mounted = true;
    let redirectTimer: ReturnType<typeof setTimeout> | null = null;

    function redirectToLogin(error?: string) {
      const currentPath = window.location.pathname || '/admin';
      const next = encodeURIComponent(currentPath === '/admin/login' ? '/admin' : currentPath);
      const suffix = error ? `&error=${encodeURIComponent(error)}` : '';
      window.location.replace(`/admin/login?next=${next}${suffix}`);
    }

    async function acceptSession(session: Session | null): Promise<'accepted' | 'forbidden' | 'retry'> {
      if (!mounted || !session?.access_token) return 'retry';

      const cachedAdminId = window.sessionStorage.getItem(ADMIN_CACHE_KEY);
      const status = cachedAdminId === session.user.id ? 'admin' : await verifyAdminSession(session);
      if (!mounted) return 'retry';

      if (status === 'unknown') return 'retry';

      if (status !== 'admin') {
        window.sessionStorage.removeItem(ADMIN_CACHE_KEY);
        setToken(null);
        setUserId(null);
        setChecking(false);
        redirectTimer = setTimeout(() => redirectToLogin('admin_required'), 50);
        return 'forbidden';
      }

      setToken(session.access_token);
      setUserId(session.user.id);
      window.sessionStorage.setItem(ADMIN_CACHE_KEY, session.user.id);
      setChecking(false);
      return 'accepted';
    }

    async function checkSession() {
      setChecking(true);

      try {
        for (let attempt = 0; attempt < AUTH_MAX_ATTEMPTS; attempt += 1) {
          const { data } = await supabase.auth.getSession();
          const status = await acceptSession(data.session);
          if (status === 'accepted' || status === 'forbidden') return;
          if (attempt < AUTH_MAX_ATTEMPTS - 1) await wait(AUTH_RETRY_MS * (attempt + 1));
        }
      } catch {
        // La UI queda en verificación y redirige abajo si no hay sesión válida.
      }

      if (!mounted) return;
      setToken(null);
      setUserId(null);
      setChecking(false);
      redirectTimer = setTimeout(() => redirectToLogin(), 50);
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        void acceptSession(session);
      } else if (event === 'SIGNED_OUT') {
        window.sessionStorage.removeItem(ADMIN_CACHE_KEY);
        setToken(null);
        setUserId(null);
        setChecking(false);
        redirectTimer = setTimeout(() => redirectToLogin(), 50);
      }
    });

    void checkSession();

    return () => {
      mounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
      sub.subscription.unsubscribe();
    };
  }, [isPublic]);

  if (!isPublic && (checking || !token)) {
    return (
      <AdminAuthContext.Provider value={{ token, userId }}>
        <div className="flex min-h-screen items-center justify-center bg-[#0d1626]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      </AdminAuthContext.Provider>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ token, userId }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
