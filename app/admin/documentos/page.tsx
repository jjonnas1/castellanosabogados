'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminDocumentosPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Obtenemos la sesión en segundo plano para que el Workspace tenga acceso al token
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Gestión de Documentos</h1>
        
        {/* Cargamos el Workspace directamente. 
            Él mismo mostrará su estado de carga interno si es necesario */}
        <AdminWorkspace section="documentos" />
      </div>
    </AdminShell>
  );
}
