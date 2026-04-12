import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';
import AdminAgendaCalendar from '@/app/components/AdminAgendaCalendar';
import DashboardCitas from '@/components/DashboardCitas';

export default function AdminAgendaPage() {
  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-8 max-w-lg">
        <DashboardCitas />
      </div>
      <AdminAgendaCalendar />
      <AdminWorkspace section="agenda" />
    </main>
  );
}
