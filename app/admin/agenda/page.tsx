import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';
import AdminAgendaCalendar from '@/app/components/AdminAgendaCalendar';
import DashboardCitas from '@/components/DashboardCitas';

export default function AdminAgendaPage() {
  return (
    <AdminShell>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-semibold text-slate-100">Agenda</h1>
        <DashboardCitas />
        <AdminAgendaCalendar />
        <AdminWorkspace section="agenda" />
      </div>
    </AdminShell>
  );
}
