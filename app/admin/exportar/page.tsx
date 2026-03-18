import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminExportarPage() {
  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <AdminWorkspace section="exportar" />
    </main>
  );
}
