'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminShell from '@/components/AdminShell';
import AdminVisitasView from '@/app/components/AdminVisitasView';

export default function AdminVisitasPage() {
  const { ready } = useAdminAuth();

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Visitas al sitio</h1>
        {ready ? (
          <AdminVisitasView />
        ) : (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
