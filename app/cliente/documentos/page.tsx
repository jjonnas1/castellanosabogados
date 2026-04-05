'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type ClientDocument = {
  id: string;
  file_name: string;
  storage_path: string;
  created_at: string;
};

export default function ClienteDocumentosPage() {
  const router = useRouter();
  const [items, setItems] = useState<ClientDocument[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.push('/cliente/login');
        return;
      }

      const { data: profile } = await supabase.from('client_profiles').select('id').maybeSingle();
      if (!profile?.id) {
        setStatus('No encontramos tu perfil de cliente.');
        return;
      }

      const { data, error } = await supabase
        .from('client_documents')
        .select('id,file_name,storage_path,created_at')
        .eq('client_profile_id', profile.id)
        .eq('visible_to_client', true)
        .order('created_at', { ascending: false });

      if (error) {
        setStatus(error.message);
        return;
      }

      setItems((data ?? []) as ClientDocument[]);
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push('/cliente/login');
  }

  async function download(path: string, fileName: string) {
    const { data, error } = await supabase.storage.from('client-documents').createSignedUrl(path, 60);
    if (error || !data?.signedUrl) {
      setStatus(error?.message ?? 'No se pudo generar el enlace de descarga');
      return;
    }

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <p className="font-semibold text-ink">Portal Cliente · Documentos</p>
          <button onClick={logout} className="btn-secondary px-4 py-2 text-sm">Cerrar sesión</button>
        </div>
      </header>

      <section className="container section-shell">
        <article className="card-shell bg-white p-5">
          <h1 className="text-xl font-semibold text-ink">Documentos disponibles</h1>
          {status && <p className="mt-2 text-sm text-muted">{status}</p>}

          <div className="mt-4 space-y-3">
            {items.map((doc) => (
              <article key={doc.id} className="rounded-2xl border border-border bg-surface p-4">
                <p className="font-semibold text-ink">{doc.file_name}</p>
                <p className="mt-1 text-xs text-muted">Subido: {new Date(doc.created_at).toLocaleString('es-CO')}</p>
                <button className="btn-primary mt-3" onClick={() => download(doc.storage_path, doc.file_name)}>
                  Descargar
                </button>
              </article>
            ))}
            {items.length === 0 && <p className="text-sm text-muted">Aún no hay documentos visibles para tu cuenta.</p>}
          </div>
        </article>
      </section>
    </main>
  );
}
