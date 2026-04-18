'use client';

import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminAgendaPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Agenda Jurídica</h1>
        <AdminWorkspace section="agenda" />
      </div>
    </AdminShell>
  );
}
