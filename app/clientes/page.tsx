'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminConsultasPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Bandeja de Consultas</h1>
        {/* Renderizado inmediato del Workspace */}
        <AdminWorkspace section="consultas" />
      </div>
    </AdminShell>
  );
}
