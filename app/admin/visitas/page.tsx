'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId } from '@/lib/profile-role';
import SiteHeader from '@/app/components/SiteHeader';
import AdminVisitasView from '@/app/components/AdminVisitasView';

export default function AdminVisitasPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) { router.replace('/admin/login'); return; }

      const role = await getProfileRoleByUserId(user.id);
      if (role !== 'admin') { router.replace('/admin/login'); return; }

      setReady(true);
    });
  }, [router]);

  if (!ready) return null;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <AdminVisitasView />
    </main>
  );
}
