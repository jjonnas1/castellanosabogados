'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId } from '@/lib/profile-role';
import AdminShell from '@/components/AdminShell';
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
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Visitas al sitio</h1>
        <AdminVisitasView />
      </div>
    </AdminShell>
  );
}
