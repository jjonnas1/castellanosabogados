'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminDocumentosPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validamos la sesión para cargar la gestión de documentos
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  // Estado de espera para evitar conflictos con el middleware de redirección
  if (!session) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen text-slate-400">
          Accediendo al gestor de documentos...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Documentos</h1>
        <AdminWorkspace section="documentos" />
      </div>
    </AdminShell>
  );
}
