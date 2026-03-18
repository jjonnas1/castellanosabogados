'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

type ClientProfile = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  case_reference: string | null;
  can_access_portal: boolean;
};

type ClientUpdate = {
  id: string;
  client_profile_id: string;
  title: string;
  update_text: string;
  status: string;
  visible_to_client: boolean;
  created_by_admin_id: string | null;
  created_at: string;
};

type Appointment = {
  id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  status: string;
  client_profile_id: string | null;
  created_by_admin_id: string | null;
  created_at: string;
};

const emptyClient = { full_name: '', email: '', phone: '', case_reference: '', can_access_portal: true };
const emptyUpdate = { client_profile_id: '', title: '', update_text: '', status: 'en curso', visible_to_client: true };
const emptyAppointment = { title: '', description: '', start_at: '', end_at: '', status: 'programada', client_profile_id: '' };

export default function AdminWorkspace() {
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [updates, setUpdates] = useState<ClientUpdate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [clientForm, setClientForm] = useState(emptyClient);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [updateForm, setUpdateForm] = useState(emptyUpdate);
  const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);

  const resolveAdmin = async () => {
    const { data: s } = await supabase.auth.getSession();
    const token = s.session?.access_token;
    const uid = s.session?.user?.id ?? null;

    setHasSession(Boolean(token));
    setAdminId(uid);
    setAdminToken(token ?? null);

    if (!token) {
      setIsAdmin(false);
      setAuthReady(true);
      return;
    }

    let me = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
    if (!me.ok) {
      await fetch('/api/admin/ensure-role', { method: 'POST', headers: { authorization: `Bearer ${token}` } });
      me = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
    }

    setIsAdmin(me.ok);
    setAuthReady(true);
  };

  const loadAll = async () => {
    const [c, u, a] = await Promise.all([
      supabase.from('client_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('client_case_updates').select('*').order('created_at', { ascending: false }),
      supabase.from('appointments').select('*').order('start_at', { ascending: true }),
    ]);

    if (!c.error) setClients((c.data ?? []) as ClientProfile[]);
    if (!u.error) setUpdates((u.data ?? []) as ClientUpdate[]);
    if (!a.error) setAppointments((a.data ?? []) as Appointment[]);

    if (c.error || u.error || a.error) {
      setStatus(`Error cargando datos: ${c.error?.message ?? u.error?.message ?? a.error?.message ?? 'desconocido'}`);
    }
  };

  useEffect(() => {
    resolveAdmin();
    const { data: sub } = supabase.auth.onAuthStateChange(() => resolveAdmin());
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !hasSession || isAdmin) return;
    window.location.href = '/admin/login';
  }, [authReady, hasSession, isAdmin]);

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin]);

  const nextAppointments = useMemo(() => appointments.filter((a) => new Date(a.start_at).getTime() >= Date.now()).slice(0, 5), [appointments]);
  const lastUpdates = useMemo(() => updates.slice(0, 5), [updates]);
  const totalVisibleUpdates = useMemo(() => updates.filter((u) => u.visible_to_client).length, [updates]);

  const saveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      full_name: clientForm.full_name,
      email: clientForm.email.toLowerCase(),
      phone: clientForm.phone || null,
      case_reference: clientForm.case_reference || null,
      can_access_portal: clientForm.can_access_portal,
    };

    const query = editingClientId
      ? supabase.from('client_profiles').update(payload).eq('id', editingClientId)
      : supabase.from('client_profiles').insert(payload);

    const { error } = await query;
    if (error) return setStatus(`Error guardando cliente: ${error.message}`);

    setStatus('Cliente guardado correctamente.');
    setClientForm(emptyClient);
    setEditingClientId(null);
    loadAll();
  };

  const saveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) return setStatus('No hay sesión admin activa.');

    const payload = {
      client_profile_id: updateForm.client_profile_id,
      title: updateForm.title,
      update_text: updateForm.update_text,
      status: updateForm.status,
      visible_to_client: updateForm.visible_to_client,
      created_by_admin_id: adminId,
    };

    const query = editingUpdateId
      ? supabase.from('client_case_updates').update(payload).eq('id', editingUpdateId)
      : supabase.from('client_case_updates').insert(payload);

    const { error } = await query;
    if (error) return setStatus(`Error guardando actualización: ${error.message}`);

    setStatus('Actualización guardada correctamente.');
    setUpdateForm(emptyUpdate);
    setEditingUpdateId(null);
    loadAll();
  };

  const deleteUpdate = async (id: string) => {
    const { error } = await supabase.from('client_case_updates').delete().eq('id', id);
    if (error) return setStatus(`Error eliminando actualización: ${error.message}`);
    setStatus('Actualización eliminada.');
    loadAll();
  };

  const saveAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) return setStatus('No hay sesión admin activa.');

    const payload = {
      title: appointmentForm.title,
      description: appointmentForm.description || null,
      start_at: appointmentForm.start_at,
      end_at: appointmentForm.end_at,
      status: appointmentForm.status,
      client_profile_id: appointmentForm.client_profile_id || null,
      created_by_admin_id: adminId,
    };

    const query = editingAppointmentId
      ? supabase.from('appointments').update(payload).eq('id', editingAppointmentId)
      : supabase.from('appointments').insert(payload);

    const { error } = await query;
    if (error) return setStatus(`Error guardando cita: ${error.message}`);

    setStatus('Cita guardada correctamente.');
    setAppointmentForm(emptyAppointment);
    setEditingAppointmentId(null);
    loadAll();
  };

  const deleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) return setStatus(`Error eliminando cita: ${error.message}`);
    setStatus('Cita eliminada.');
    loadAll();
  };

  const exportBackup = async () => {
    if (!adminToken) return setStatus('No hay sesión admin para exportar.');

    const res = await fetch('/api/admin/export', {
      headers: { authorization: `Bearer ${adminToken}` },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setStatus(`Error exportando: ${data?.error ?? 'desconocido'}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo-castellanos-${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const toInputDate = (value: string) => (value ? new Date(value).toISOString().slice(0, 16) : '');

  if (!authReady) return <section className="container section-shell"><div className="card-shell bg-white p-6">Validando sesión admin…</div></section>;
  if (!hasSession) return null;
  if (!isAdmin) return <section className="container section-shell"><div className="card-shell bg-white p-6 text-center"><h1 className="text-2xl font-semibold text-ink">403</h1><p className="mt-2 text-muted">No tienes permisos admin.</p></div></section>;

  return (
    <section className="container section-shell space-y-6">
      <header className="card-shell bg-white p-6">
        <p className="pill w-fit">Dashboard Admin</p>
        <h1 className="mt-3 text-2xl font-semibold text-ink">Panel administrativo funcional</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={exportBackup}>Descargar respaldo (Excel)</button>
        </div>
        {status && <p className="mt-2 text-sm text-muted">{status}</p>}
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Clientes</p><p className="mt-1 text-2xl font-semibold">{clients.length}</p></article>
        <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Citas/Agenda</p><p className="mt-1 text-2xl font-semibold">{appointments.length}</p></article>
        <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Actualizaciones visibles</p><p className="mt-1 text-2xl font-semibold">{totalVisibleUpdates}</p></article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Próximas citas</h2>
          <div className="mt-3 space-y-2 text-sm">
            {nextAppointments.map((a) => <p key={a.id}>{new Date(a.start_at).toLocaleString('es-CO')} · {a.title}</p>)}
            {nextAppointments.length === 0 && <p className="text-muted">Sin próximas citas.</p>}
          </div>
        </article>
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Últimas actualizaciones</h2>
          <div className="mt-3 space-y-2 text-sm">
            {lastUpdates.map((u) => <p key={u.id}>{u.title} · {u.status}</p>)}
            {lastUpdates.length === 0 && <p className="text-muted">Sin actualizaciones.</p>}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Agenda / Calendario (CRUD)</h2>
          <form className="mt-3 grid gap-2" onSubmit={saveAppointment}>
            <input className="rounded-lg border p-2" placeholder="Título" value={appointmentForm.title} onChange={(e)=>setAppointmentForm({...appointmentForm,title:e.target.value})} required />
            <textarea className="rounded-lg border p-2" placeholder="Descripción" value={appointmentForm.description} onChange={(e)=>setAppointmentForm({...appointmentForm,description:e.target.value})} />
            <div className="grid gap-2 sm:grid-cols-2">
              <input className="rounded-lg border p-2" type="datetime-local" value={appointmentForm.start_at} onChange={(e)=>setAppointmentForm({...appointmentForm,start_at:e.target.value})} required />
              <input className="rounded-lg border p-2" type="datetime-local" value={appointmentForm.end_at} onChange={(e)=>setAppointmentForm({...appointmentForm,end_at:e.target.value})} required />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input className="rounded-lg border p-2" placeholder="Estado" value={appointmentForm.status} onChange={(e)=>setAppointmentForm({...appointmentForm,status:e.target.value})} required />
              <select className="rounded-lg border p-2" value={appointmentForm.client_profile_id} onChange={(e)=>setAppointmentForm({...appointmentForm,client_profile_id:e.target.value})}>
                <option value="">Sin cliente</option>
                {clients.map((c)=><option key={c.id} value={c.id}>{c.full_name}</option>)}
              </select>
            </div>
            <button className="btn-primary w-fit" type="submit">{editingAppointmentId ? 'Actualizar cita' : 'Crear cita'}</button>
          </form>
          <div className="mt-4 space-y-2 max-h-72 overflow-auto">
            {appointments.map((a)=> (
              <div key={a.id} className="rounded-lg border p-2 text-sm">
                <p className="font-semibold">{a.title}</p>
                <p className="text-muted">{new Date(a.start_at).toLocaleString('es-CO')} → {new Date(a.end_at).toLocaleString('es-CO')}</p>
                <p className="text-muted">{a.status} · {clients.find(c=>c.id===a.client_profile_id)?.full_name || 'Sin cliente'}</p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-secondary" onClick={()=>{setEditingAppointmentId(a.id);setAppointmentForm({title:a.title,description:a.description || '',start_at:toInputDate(a.start_at),end_at:toInputDate(a.end_at),status:a.status,client_profile_id:a.client_profile_id || ''});}}>Editar</button>
                  <button className="btn-secondary" onClick={()=>deleteAppointment(a.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Clientes (CRUD)</h2>
          <form className="mt-3 grid gap-2" onSubmit={saveClient}>
            <input className="rounded-lg border p-2" placeholder="Nombre" value={clientForm.full_name} onChange={(e)=>setClientForm({...clientForm,full_name:e.target.value})} required />
            <input className="rounded-lg border p-2" type="email" placeholder="Correo" value={clientForm.email} onChange={(e)=>setClientForm({...clientForm,email:e.target.value})} required />
            <input className="rounded-lg border p-2" placeholder="Teléfono" value={clientForm.phone} onChange={(e)=>setClientForm({...clientForm,phone:e.target.value})} />
            <input className="rounded-lg border p-2" placeholder="Referencia" value={clientForm.case_reference} onChange={(e)=>setClientForm({...clientForm,case_reference:e.target.value})} />
            <label className="text-sm"><input type="checkbox" checked={clientForm.can_access_portal} onChange={(e)=>setClientForm({...clientForm,can_access_portal:e.target.checked})} /> Habilitar portal</label>
            <button className="btn-primary w-fit" type="submit">{editingClientId ? 'Actualizar cliente' : 'Crear cliente'}</button>
          </form>
          <div className="mt-4 space-y-2 max-h-72 overflow-auto">
            {clients.map((c)=> (
              <div key={c.id} className="rounded-lg border p-2 text-sm">
                <p className="font-semibold">{c.full_name}</p>
                <p className="text-muted">{c.email} · {c.case_reference || 'Sin referencia'}</p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-secondary" onClick={()=>{setEditingClientId(c.id);setClientForm({full_name:c.full_name,email:c.email,phone:c.phone || '',case_reference:c.case_reference || '',can_access_portal:c.can_access_portal});}}>Editar</button>
                  <button className="btn-secondary" onClick={async ()=>{await supabase.from('client_profiles').update({can_access_portal:!c.can_access_portal}).eq('id', c.id);loadAll();}}>{c.can_access_portal ? 'Deshabilitar portal' : 'Habilitar portal'}</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <article className="card-shell bg-white p-5">
        <h2 className="text-lg font-semibold">Actualizaciones de cliente (CRUD)</h2>
        <form className="mt-3 grid gap-2" onSubmit={saveUpdate}>
          <select className="rounded-lg border p-2" value={updateForm.client_profile_id} onChange={(e)=>setUpdateForm({...updateForm,client_profile_id:e.target.value})} required>
            <option value="">Selecciona cliente</option>
            {clients.map((c)=><option key={c.id} value={c.id}>{c.full_name}</option>)}
          </select>
          <input className="rounded-lg border p-2" placeholder="Título" value={updateForm.title} onChange={(e)=>setUpdateForm({...updateForm,title:e.target.value})} required />
          <textarea className="rounded-lg border p-2" placeholder="Detalle" value={updateForm.update_text} onChange={(e)=>setUpdateForm({...updateForm,update_text:e.target.value})} required />
          <input className="rounded-lg border p-2" placeholder="Estado" value={updateForm.status} onChange={(e)=>setUpdateForm({...updateForm,status:e.target.value})} required />
          <label className="text-sm"><input type="checkbox" checked={updateForm.visible_to_client} onChange={(e)=>setUpdateForm({...updateForm,visible_to_client:e.target.checked})} /> Visible al cliente</label>
          <button className="btn-primary w-fit" type="submit">{editingUpdateId ? 'Actualizar actualización' : 'Crear actualización'}</button>
        </form>

        <div className="mt-4 space-y-2 max-h-80 overflow-auto">
          {updates.map((u)=> (
            <div key={u.id} className="rounded-lg border p-2 text-sm">
              <p className="font-semibold">{u.title}</p>
              <p className="text-muted">{clients.find(c=>c.id===u.client_profile_id)?.full_name || 'Cliente no encontrado'} · {u.status}</p>
              <p>{u.update_text}</p>
              <div className="mt-2 flex gap-2">
                <button className="btn-secondary" onClick={()=>{setEditingUpdateId(u.id);setUpdateForm({client_profile_id:u.client_profile_id,title:u.title,update_text:u.update_text,status:u.status,visible_to_client:u.visible_to_client});}}>Editar</button>
                <button className="btn-secondary" onClick={()=>deleteUpdate(u.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
