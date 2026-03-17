'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

type ClientProfile = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  case_reference: string | null;
  can_access_portal: boolean;
  created_at: string;
};

type ClientUpdate = {
  id: string;
  client_profile_id: string;
  title: string;
  update_text: string;
  status: string;
  visible_to_client: boolean;
  created_at: string;
};

const initialClient = { full_name: '', email: '', phone: '', case_reference: '', can_access_portal: true };
const initialUpdate = { client_profile_id: '', title: '', update_text: '', status: 'en curso', visible_to_client: true };

export default function AdminClientesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [updates, setUpdates] = useState<ClientUpdate[]>([]);
  const [clientForm, setClientForm] = useState(initialClient);
  const [updateForm, setUpdateForm] = useState(initialUpdate);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      const token = s.session?.access_token;
      if (!token) {
        setIsAdmin(false);
        setAuthResolved(true);
        return;
      }
      const res = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
      setIsAdmin(res.ok);
      setAuthResolved(true);
    })();
  }, []);

  async function loadData() {
    const [c, u] = await Promise.all([
      supabase.from('client_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('client_case_updates').select('*').order('created_at', { ascending: false }),
    ]);
    if (!c.error) setClients((c.data ?? []) as ClientProfile[]);
    if (!u.error) setUpdates((u.data ?? []) as ClientUpdate[]);
  }

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  const updatesByClient = useMemo(() => {
    const map = new Map<string, ClientUpdate[]>();
    updates.forEach((update) => {
      const current = map.get(update.client_profile_id) ?? [];
      current.push(update);
      map.set(update.client_profile_id, current);
    });
    return map;
  }, [updates]);

  async function createClient(e: React.FormEvent) {
    e.preventDefault();
    setStatus('');

    const { data: inserted, error } = await supabase
      .from('client_profiles')
      .insert({
        full_name: clientForm.full_name,
        email: clientForm.email.toLowerCase(),
        phone: clientForm.phone || null,
        case_reference: clientForm.case_reference || null,
        can_access_portal: clientForm.can_access_portal,
      })
      .select('*')
      .single();

    if (error) return setStatus(`Error creando cliente: ${error.message}`);
    setStatus('Cliente creado.');

    if (inserted?.email && inserted.can_access_portal) {
      await inviteClient(inserted.email);
    }

    setClientForm(initialClient);
    loadData();
  }

  async function inviteClient(email: string) {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return setStatus('No hay sesión admin activa para invitar cliente.');

    const response = await fetch('/api/admin/invite-client', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      setStatus(`Cliente creado, pero no se pudo enviar invitación: ${data.error ?? 'Error'}`);
    } else {
      setStatus(`Cliente creado y enlace de acceso enviado a ${email}.`);
    }
  }

  async function createUpdate(e: React.FormEvent) {
    e.preventDefault();
    setStatus('');

    const { error } = await supabase.from('client_case_updates').insert(updateForm);
    if (error) return setStatus(`Error creando actualización: ${error.message}`);

    setStatus('Actualización creada.');
    setUpdateForm(initialUpdate);
    loadData();
  }

  async function toggleAccess(client: ClientProfile) {
    const { error } = await supabase
      .from('client_profiles')
      .update({ can_access_portal: !client.can_access_portal })
      .eq('id', client.id);
    if (error) return setStatus(`Error: ${error.message}`);
    setStatus('Acceso de portal actualizado.');
    loadData();
  }

  async function downloadBackup() {
    setStatus('');
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return setStatus('No hay sesión admin activa.');

    const response = await fetch('/api/admin/export', {
      headers: { authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const err = await response.json();
      setStatus(`Error exportando respaldo: ${err.error ?? 'Error'}`);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `respaldo-castellanos-${new Date().toISOString().slice(0, 10)}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!authResolved || loading) return <main className="section"><div className="wrap">Cargando…</div></main>;
  if (!isAdmin) {
    return (
      <main className="section"><div className="wrap"><h1>403</h1><p>Acceso solo para administradores.</p></div></main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Administrativo · Clientes</p>
              <h1 className="text-2xl font-semibold text-slate-900">Clientes y actualizaciones del proceso</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadBackup} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Descargar respaldo</button>
              <Link href="/administrativo/citas" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Agenda administrativa</Link>
            </div>
          </div>
          {status && <p className="mt-3 rounded-lg bg-slate-50 p-2 text-sm text-slate-700">{status}</p>}
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Crear cliente</h2>
            <form onSubmit={createClient} className="space-y-2 text-sm">
              <input className="w-full rounded-lg border p-2" placeholder="Nombre completo" value={clientForm.full_name} onChange={(e) => setClientForm({ ...clientForm, full_name: e.target.value })} required />
              <input className="w-full rounded-lg border p-2" type="email" placeholder="Email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} required />
              <input className="w-full rounded-lg border p-2" placeholder="Teléfono" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} />
              <input className="w-full rounded-lg border p-2" placeholder="Referencia del caso" value={clientForm.case_reference} onChange={(e) => setClientForm({ ...clientForm, case_reference: e.target.value })} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={clientForm.can_access_portal} onChange={(e) => setClientForm({ ...clientForm, can_access_portal: e.target.checked })} />Habilitar acceso al portal</label>
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-white">Guardar cliente</button>
            </form>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Publicar actualización</h2>
            <form onSubmit={createUpdate} className="space-y-2 text-sm">
              <select className="w-full rounded-lg border p-2" value={updateForm.client_profile_id} onChange={(e) => setUpdateForm({ ...updateForm, client_profile_id: e.target.value })} required>
                <option value="">Selecciona cliente</option>
                {clients.map((client) => <option key={client.id} value={client.id}>{client.full_name} · {client.email}</option>)}
              </select>
              <input className="w-full rounded-lg border p-2" placeholder="Título" value={updateForm.title} onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })} required />
              <textarea className="w-full rounded-lg border p-2" rows={4} placeholder="Texto de actualización" value={updateForm.update_text} onChange={(e) => setUpdateForm({ ...updateForm, update_text: e.target.value })} required />
              <input className="w-full rounded-lg border p-2" placeholder="Estado" value={updateForm.status} onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })} required />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={updateForm.visible_to_client} onChange={(e) => setUpdateForm({ ...updateForm, visible_to_client: e.target.checked })} />Visible al cliente</label>
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-white">Guardar actualización</button>
            </form>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Listado de clientes</h2>
          <div className="space-y-3">
            {clients.map((client) => (
              <article key={client.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{client.full_name}</p>
                    <p className="text-xs text-slate-500">{client.email} · {client.phone || 'sin teléfono'} · Ref: {client.case_reference || 'sin referencia'}</p>
                  </div>
                  <button onClick={() => toggleAccess(client)} className="rounded border px-2 py-1 text-xs">{client.can_access_portal ? 'Deshabilitar acceso' : 'Habilitar acceso'}</button>
                </div>
                <div className="mt-2 space-y-2">
                  {(updatesByClient.get(client.id) ?? []).slice(0, 4).map((update) => (
                    <div key={update.id} className="rounded-lg bg-slate-50 p-2 text-sm text-slate-700">
                      <p className="font-medium text-slate-900">{update.title}</p>
                      <p>{update.update_text}</p>
                      <p className="text-xs text-slate-500">Estado: {update.status} · Visible: {update.visible_to_client ? 'Sí' : 'No'}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
            {clients.length === 0 && <p className="text-sm text-slate-500">Sin clientes registrados.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
