'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { FileText, Calendar, Clock, ChevronRight, Activity, Download } from 'lucide-react';

type Appointment = { id: string; start_at?: string; starts_at?: string };
type Update = { id: string; title: string; update_text?: string; body?: string; status: string; created_at: string; visible_to_client: boolean };
type ClientProfile = { full_name: string; id: string; email?: string };
type ClientDocument = { id: string; file_name: string; storage_path: string; created_at: string };

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        router.push('/cliente/login');
        return;
      }

      await fetch('/api/client/link-profile', { method: 'POST', headers: { authorization: `Bearer ${token}` } });

      const { data: p } = await supabase.from('client_profiles').select('id,full_name,email').maybeSingle();
      setProfile((p as ClientProfile) ?? null);

      if (p?.id) {
        const [{ data: a }, { data: u }, { data: d }] = await Promise.all([
          supabase.from('appointments').select('id,start_at').eq('client_profile_id', p.id),
          supabase
            .from('client_case_updates')
            .select('id,title,update_text,body,status,created_at,visible_to_client')
            .eq('visible_to_client', true)
            .eq('client_profile_id', p.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('client_documents')
            .select('id,file_name,storage_path,created_at')
            .eq('visible_to_client', true)
            .eq('client_profile_id', p.id)
            .order('created_at', { ascending: false })
            .limit(5),
        ]);

        setAppointments((a ?? []) as Appointment[]);
        setUpdates((u ?? []) as Update[]);
        setDocuments((d ?? []) as ClientDocument[]);
      }
    })();
  }, [router]);

  const upcoming = useMemo(
    () =>
      appointments.filter((a) => {
        const dt = new Date(a.start_at ?? a.starts_at ?? '').getTime();
        return Number.isFinite(dt) && dt >= Date.now();
      }).length,
    [appointments]
  );

  async function logout() {
    await supabase.auth.signOut();
    router.push('/cliente/login');
  }

  async function download(path: string, fileName: string) {
    const { data, error } = await supabase.storage.from('client-documents').createSignedUrl(path, 60);
    if (error || !data?.signedUrl) return;
    
    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <main className="dark min-h-screen bg-canvas text-white">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-canvas/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-5">
          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Portal Cliente</p>
            <p className="font-serif text-lg text-white">Castellanos Abogados</p>
          </div>
          <button onClick={logout} className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition">
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="container py-8 lg:py-12 space-y-8">
        
        {/* Bienvenida y Resumen Ejecutivo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <article>
            <h1 className="text-3xl lg:text-4xl font-serif text-white">Bienvenido{profile?.full_name ? `, ${profile.full_name}` : ''}</h1>
            <p className="mt-2 text-white/60 max-w-xl leading-relaxed">
              Este es su portal privado. Aquí puede revisar el avance de su caso y los documentos disponibles con total transparencia y seguridad.
            </p>
          </article>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Calendar size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Citas vigentes</p>
              <p className="text-lg font-bold text-white">{upcoming} {upcoming === 1 ? 'Programada' : 'Programadas'}</p>
            </div>
            <Link href="/cliente/citas" className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ChevronRight size={16} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Timeline del Proceso */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Activity size={20} className="text-white/50" />
                Línea de Tiempo del Proceso
              </h2>
              <Link href="/cliente/actualizaciones" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition">
                Ver todo
              </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8">
              {updates.length > 0 ? (
                <div className="relative border-l border-white/20 ml-3 space-y-8 pb-4">
                  {updates.map((update, idx) => (
                    <div key={update.id} className="relative pl-8">
                      <div className="absolute w-3 h-3 bg-white rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      {idx !== updates.length - 1 && (
                        <div className="absolute w-px h-full bg-white/20 -left-px top-3" />
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="text-xs uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                          <Clock size={12} />
                          {new Date(update.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-[10px] uppercase tracking-wider text-white">
                          {update.status}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-white mb-2">{update.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {update.update_text ?? update.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="text-white/60">Aún no hay actuaciones registradas en el expediente.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Documentos */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <FileText size={20} className="text-white/50" />
                Documentos
              </h2>
              <Link href="/cliente/documentos" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition">
                Ver todos
              </Link>
            </div>

            <div className="space-y-3">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div key={doc.id} className="group flex items-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition cursor-pointer" onClick={() => download(doc.storage_path, doc.file_name)}>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 shrink-0">
                      <FileText size={18} className="text-white/70 group-hover:text-white transition" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">{doc.file_name}</p>
                      <p className="text-xs text-white/50 mt-1">
                        {new Date(doc.created_at).toLocaleDateString('es-CO')}
                      </p>
                    </div>
                    <div className="ml-auto pl-3 opacity-0 group-hover:opacity-100 transition">
                      <Download size={16} className="text-white" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <FileText size={24} className="mx-auto text-white/20 mb-3" />
                  <p className="text-sm text-white/50">No hay documentos disponibles en este momento.</p>
                </div>
              )}
              
              {documents.length > 0 && (
                <Link href="/cliente/documentos" className="block w-full py-4 text-center text-xs uppercase tracking-wider text-white border border-white/10 rounded-2xl hover:bg-white/10 transition mt-2">
                  Ver expediente completo
                </Link>
              )}
            </div>
            
            {/* Contacto Directo Mini */}
            <div className="mt-8 p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl">
              <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Su Abogado</p>
              <p className="text-base font-serif text-white mb-4">Jonatan Castellanos</p>
              <a href="https://wa.me/573148309306" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center text-sm font-medium text-canvas bg-white rounded-xl hover:bg-white/90 transition">
                Contactar por WhatsApp
              </a>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

