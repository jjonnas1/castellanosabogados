'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase-browser';

type Section = 'resumen' | 'clientes' | 'actualizaciones' | 'agenda' | 'consultas' | 'documentos' | 'exportar' | 'all';

// AÑADIMOS clientId AQUÍ PARA QUE VERCEL NO PROTESTE
export default function AdminWorkspace({ section = 'all', clientId }: { section?: Section; clientId?: string }) {
  const [ready, setReady] = useState(true);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>({ clients: [], appointments: [], consultations: [] });

  const fetchToken = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        setAdminToken(session.access_token);
        return session.access_token;
      }
      return null;
    } catch (err) {
      return null;
    }
  }, []);

  const loadData = useCallback(async (token: string) => {
    setDataLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/admin/workspace', {
        headers: { authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error en servidor");
      
      setData({
        clients: json.clients || [],
        appointments: json.appointments || [],
        consultations: json.consultations || []
      });
    } catch (error: any) {
      setLoadError(error.message);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = await fetchToken();
      if (token) loadData(token);
      else {
        setTimeout(async () => {
          const retryToken = await fetchToken();
          if (retryToken) loadData(retryToken);
        }, 1500);
      }
    };
    init();
  }, [fetchToken, loadData]);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {!adminToken ? (
          <span className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            Sincronizando seguridad...
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Conexión Segura Establecida
          </span>
        )}
      </div>

      {loadError && (
        <div className="p-4 bg-red-950/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
          <p className="opacity-80">{loadError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(section === 'clientes' || section === 'all') && (
          <div className="bg-[#111f35] p-5 rounded-2xl border border-[#1e3a6e]/50">
            <h3 className="text-slate-500 text-xs font-bold uppercase">Clientes</h3>
            <p className="text-3xl font-mono text-white mt-1">{dataLoading ? '...' : data.clients.length}</p>
          </div>
        )}
        {(section === 'agenda' || section === 'all') && (
          <div className="bg-[#111f35] p-5 rounded-2xl border border-[#1e3a6e]/50">
            <h3 className="text-slate-500 text-xs font-bold uppercase">Citas</h3>
            <p className="text-3xl font-mono text-white mt-1">{dataLoading ? '...' : data.appointments.length}</p>
          </div>
        )}
        {(section === 'consultas' || section === 'all') && (
          <div className="bg-[#111f35] p-5 rounded-2xl border border-[#1e3a6e]/50">
            <h3 className="text-slate-500 text-xs font-bold uppercase">Consultas</h3>
            <p className="text-3xl font-mono text-white mt-1">{dataLoading ? '...' : data.consultations.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}
