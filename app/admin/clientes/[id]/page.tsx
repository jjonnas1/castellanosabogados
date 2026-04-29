import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default async function AdminClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <div className="container pt-4">
        <Link
          href="/admin/clientes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver a Clientes
        </Link>
      </div>
      <AdminWorkspace section="all" clientId={id} />
    </main>
  );
}
