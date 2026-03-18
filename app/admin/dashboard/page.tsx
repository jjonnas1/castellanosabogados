import SiteHeader from '@/app/components/SiteHeader';
import AdminCitasPanel from '@/app/components/AdminCitasPanel';

export default function AdminDashboardPage() {
  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <AdminCitasPanel />
    </main>
  );
}
