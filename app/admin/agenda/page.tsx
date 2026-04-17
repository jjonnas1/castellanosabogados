'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';
import AdminAgendaCalendar from '@/app/components/AdminAgendaCalendar';
import DashboardCitas from '@/components/DashboardCitas';

export default function AdminAgendaPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  // Si no hay sesión, no redirigimos agresivamente, solo mostramos mensaje
  // Esto evita que el middleware te saque mientras navegas
  if (!session) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen text-slate-400">
          Verificando acceso a la Agenda...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-semibold text-slate-100">Agenda</h1>
        <DashboardCitas />
        <AdminAgendaCalendar />
        {/* Pasamos la sección para que AdminWorkspace cargue los datos de agenda */}
        <AdminWorkspace section="agenda" />
      </div>
    </AdminShell>
  );
}
