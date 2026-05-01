'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminClienteDetallePage() {
  const params = useParams<{ id: string }>();

  return (
    <AdminShell>
      <div className="p-6">
        <div className="mb-4">
          <Link
            href="/admin/clientes"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver a Clientes
          </Link>
        </div>
        <AdminWorkspace section="all" clientId={params.id} />
      </div>
    </AdminShell>
  );
}
