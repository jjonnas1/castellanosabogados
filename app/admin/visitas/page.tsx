'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminVisitasView from '@/app/components/AdminVisitasView';

export default function AdminVisitasPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validamos la sesión para cargar las estadísticas de tráfico
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

  // Estado de espera para que el sistema de seguridad no bloquee la vista
  if (!session) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen text-slate-400">
          Cargando estadísticas de visitas...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Visitas al sitio</h1>
        {/* Este componente ahora cargará los datos con la sesión confirmada */}
        <AdminVisitasView />
      </div>
    </AdminShell>
  );
}
