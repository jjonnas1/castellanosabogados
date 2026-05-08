'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { AdminAuthContext } from '@/contexts/admin-auth';
import { getProfileRoleByUserId } from '@/lib/profile-role';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const AUTH_RETRY_MS = 600;

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
      const next = encodeURIComponent(pathname || '/admin');
      const suffix = error ? `&error=${encodeURIComponent(error)}` : '';
      window.location.replace(`/admin/login?next=${next}${suffix}`);
    }

    async function acceptSession(session: Session | null) {
      if (!mounted || !session?.access_token) return false;

      const role = await getProfileRoleByUserId(session.user.id);
      if (!mounted) return false;

      if (role !== 'admin') {
        setToken(null);
        setUserId(null);
        setChecking(false);
        redirectTimer = setTimeout(() => redirectToLogin('admin_required'), 50);
        return false;
      }

      setToken(session.access_token);
      setUserId(session.user.id);
      setChecking(false);
      return true;
    }

    async function checkSession() {
      setChecking(true);

      try {
        const first = await supabase.auth.getSession();
        if (await acceptSession(first.data.session)) return;

        await wait(AUTH_RETRY_MS);
        const second = await supabase.auth.getSession();
        if (await acceptSession(second.data.session)) return;
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
  }, [isPublic, pathname]);

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
