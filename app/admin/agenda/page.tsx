import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';
import AdminAgendaCalendar from '@/app/components/AdminAgendaCalendar';

export default function AdminAgendaPage() {
  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <AdminAgendaCalendar />
      <AdminWorkspace section="agenda" />
    </main>
  );
}
