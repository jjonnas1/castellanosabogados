'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminExportarPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Verificamos la sesión de fondo para que el token esté disponible
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Exportar / Respaldo</h1>
        
        {/* Entrada directa: El AdminWorkspace gestionará la seguridad 
            y los datos sin bloquear toda la interfaz */}
        <AdminWorkspace section="exportar" />
      </div>
    </AdminShell>
  );
}
