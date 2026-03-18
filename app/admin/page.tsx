'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminRootPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) {
      router.push('/cliente/acceso');
    }
  }, [session, router]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    (async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      const resolvedRole = (profile?.role as string | undefined) ?? null;
      setRole(resolvedRole);

      if (resolvedRole !== 'admin') {
        router.push('/cliente');
      }
    })();
  }, [session?.user?.id, router]);

  if (session === undefined) {
    return null;
  }

  if (session === null || role !== 'admin') {
    return null;
  }

  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <AdminWorkspace section="all" />
    </main>
  );
}
