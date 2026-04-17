'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminExportarPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificamos la sesión antes de cargar la utilidad de exportación
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

  // Si no hay sesión, esperamos pacíficamente en lugar de redirigir bruscamente
  if (!session) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen text-slate-400">
          Preparando herramientas de respaldo...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Exportar / Respaldo</h1>
        <AdminWorkspace section="exportar" />
      </div>
    </AdminShell>
  );
}
