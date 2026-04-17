'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';
import AdminAgendaCalendar from '@/app/components/AdminAgendaCalendar';
import DashboardCitas from '@/components/DashboardCitas';

export default function AdminAgendaPage() {
  const { ready } = useAdminAuth();

  return (
    <AdminShell>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-semibold text-slate-100">Agenda</h1>
        {ready ? (
          <>
            <DashboardCitas />
            <AdminAgendaCalendar />
            <AdminWorkspace section="agenda" />
          </>
        ) : (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
