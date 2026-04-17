'use client';

import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminConsultasPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Consultas</h1>
        <AdminWorkspace section="consultas" />
      </div>
    </AdminShell>
  );
}
