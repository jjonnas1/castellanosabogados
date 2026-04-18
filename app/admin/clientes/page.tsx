'use client';

import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminClientesPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Gestión de Clientes</h1>
        {/* Usamos el workspace para traer los datos sin bloquear la página */}
        <AdminWorkspace section="clientes" />
      </div>
    </AdminShell>
  );
}
