'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminVisitasView from '@/app/components/AdminVisitasView';

export default function AdminVisitasPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Obtenemos la sesión en segundo plano para que los componentes hijos tengan el token
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Visitas al sitio</h1>
        
        {/* Renderizado inmediato: AdminVisitasView se encargará de 
            pedir los datos una vez la sesión esté lista internamente */}
        <AdminVisitasView />
      </div>
    </AdminShell>
  );
}
