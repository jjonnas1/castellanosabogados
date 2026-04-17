'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminResumenPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validamos la sesión antes de cargar el resumen general
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  // Evitamos la redirección agresiva para que el AdminWorkspace tenga tiempo de conectar
  if (!session) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen text-slate-400">
          Sincronizando resumen del Workspace...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Resumen</h1>
        <AdminWorkspace section="resumen" />
      </div>
    </AdminShell>
  );
}
