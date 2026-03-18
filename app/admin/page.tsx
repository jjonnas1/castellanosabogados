'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId, type AppRole } from '@/lib/profile-role';
import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminRootPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoadingSession(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadRole() {
      if (!session?.user?.id) {
        setRole(null);
        setLoadingRole(false);
        return;
      }

      setLoadingRole(true);
      const resolvedRole = await getProfileRoleByUserId(session.user.id);

      if (!mounted) return;
      setRole(resolvedRole);
      setLoadingRole(false);
    }

    loadRole();

    return () => {
      mounted = false;
    };
  }, [session?.user?.id]);

  useEffect(() => {
    if (loadingSession || loadingRole) return;
    if (!session) router.replace('/admin/login');
  }, [loadingSession, loadingRole, session, router]);

  if (loadingSession || loadingRole) {
    return (
      <main className="bg-canvas text-ink min-h-screen">
        <section className="container section-shell">
          <div className="card-shell bg-white p-6">Validando sesión admin…</div>
        </section>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  if (role !== 'admin') {
    return (
      <main className="bg-canvas text-ink min-h-screen">
        <section className="container section-shell">
          <div className="card-shell bg-white p-6">
            <h1 className="text-2xl font-semibold">403</h1>
            <p className="mt-2 text-sm text-muted">No autorizado.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <AdminWorkspace section="all" />
    </main>
  );
}
