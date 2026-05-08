'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { AdminAuthContext } from '@/contexts/admin-auth';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublic = PUBLIC_ADMIN_PATHS.includes(pathname);

  const [token,  setToken]  = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isPublic) return;

    let mounted = true;

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.access_token) {
        setToken(session.access_token);
        setUserId(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setToken(null);
        setUserId(null);
        window.location.assign('/admin/login');
      }
    });

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.access_token) {
          setToken(session.access_token);
          setUserId(session.user.id);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [isPublic]);

  return (
    <AdminAuthContext.Provider value={{ token, userId }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
