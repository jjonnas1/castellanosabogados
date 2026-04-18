'use client';

import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminActualizacionesPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Actualizaciones de Casos</h1>
        {/* El Workspace con la sección específica para que cargue los datos de procesos */}
        <AdminWorkspace section="actualizaciones" />
      </div>
    </AdminShell>
  );
}
