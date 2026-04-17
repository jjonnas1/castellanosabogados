'use client';

import AdminShell from '@/components/AdminShell';
import AdminVisitasView from '@/app/components/AdminVisitasView';

export default function AdminVisitasPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Visitas al sitio</h1>
        <AdminVisitasView />
      </div>
    </AdminShell>
  );
}
