import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminResumenPage() {
  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Resumen</h1>
        <AdminWorkspace section="resumen" />
      </div>
    </AdminShell>
  );
}
