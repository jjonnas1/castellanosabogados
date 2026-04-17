'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

type Section = 'resumen' | 'clientes' | 'agenda' | 'actualizaciones' | 'documentos' | 'exportar' | 'consultas' | 'all';

type ClientProfile = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  case_reference: string | null;
  can_access_portal: boolean;
  active?: boolean | null;
  created_at?: string;
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

type ClientDocument = {
  id: string;
  client_profile_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  uploaded_by_admin_id: string | null;
  visible_to_client: boolean;
  created_at: string;
};

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  notes: string | null;
  status: string;
  consultation_date: string | null;
  created_at: string;
};

const emptyClient = { full_name: '', email: '', password: '', phone: '', case_reference: '', can_access_portal: true };
const emptyUpdate = { client_profile_id: '', title: '', update_text: '', status: 'en curso', visible_to_client: true };
const emptyAppointment = { title: '', description: '', start_at: '', end_at: '', status: 'programada', client_profile_id: '' };
const emptyConsultation = { name: '', email: '', phone: '', subject: '', notes: '', status: 'pendiente', consultation_date: '' };

export default function AdminWorkspace({ section = 'all', clientId }: { section?: Section; clientId?: string }) {
  const [ready, setReady]           = useState(false);
  const [adminId, setAdminId]       = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [status, setStatus]         = useState('');
  const [loadError, setLoadError]   = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const [clients, setClients]             = useState<ClientProfile[]>([]);
  const [updates, setUpdates]             = useState<ClientUpdate[]>([]);
  const [appointments, setAppointments]   = useState<Appointment[]>([]);
  const [documents, setDocuments]         = useState<ClientDocument[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const [clientForm, setClientForm]               = useState(emptyClient);
  const [editingClientId, setEditingClientId]     = useState<string | null>(null);
  const [updateForm, setUpdateForm]               = useState(emptyUpdate);
  const [editingUpdateId, setEditingUpdateId]     = useState<string | null>(null);
  const [appointmentForm, setAppointmentForm]     = useState(emptyAppointment);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);
  const [selectedClientIdForDocuments, setSelectedClientIdForDocuments] = useState('');
  const [searchClients, setSearchClients]         = useState('');
  const [consultationForm, setConsultationForm]   = useState(emptyConsultation);
  const [editingConsultationId, setEditingConsultationId] = useState<string | null>(null);
  const [consultationStatusFilter, setConsultationStatusFilter] = useState('');
  const [consultationSearch, setConsultationSearch] = useState('');
  const [visitStats, setVisitStats] = useState<{ today: number; week: number; total: number } | null>(null);

  // ── Auth ────────────────────────────────────────────────────────────────────

  const resolveAdmin = async () => {
    try {
      const { data: s } = await supabase.auth.getSession();
      setAdminId(s.session?.user?.id ?? null);
      setAdminToken(s.session?.access_token ?? null);
    } catch (err) {
      console.error('[AdminWorkspace] getSession error:', err);
      setAdminId(null);
      setAdminToken(null);
    } finally {
      setReady(true); // siempre desbloquear la UI
    }
  };

  useEffect(() => {
    resolveAdmin();
    const { data: sub } = supabase.auth.onAuthStateChange(() => resolveAdmin());
    return () => sub.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── API helper ───────────────────────────────────────────────────────────────

  async function workspaceRequest<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: Record<string, unknown>,
  ): Promise<T> {
    // Obtener token fresco por si caducó
    let token = adminToken;
    if (!token) {
      const { data: s } = await supabase.auth.getSession();
      token = s.session?.access_token ?? null;
      if (token) {
        setAdminId(s.session?.user?.id ?? null);
        setAdminToken(token);
      }
    }

    if (!token) throw new Error('Sin sesión activa. Recarga la página.');

    const response = await fetch('/api/admin/workspace', {
      method,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Si el token expiró, refrescar sesión y reintentar una vez
    if (response.status === 401) {
      const { data: refreshed } = await supabase.auth.getSession();
      const newToken = refreshed.session?.access_token ?? null;
      setAdminToken(newToken);
      if (!newToken) throw new Error('Sesión expirada. Por favor recarga la página.');

      const retry = await fetch('/api/admin/workspace', {
        method,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${newToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const retryPayload = (await retry.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!retry.ok || retryPayload.ok === false) {
        throw new Error(`Error ${retry.status}: ${retryPayload.error ?? 'Error en la API'}`);
      }
      return retryPayload as T;
    }

    const payload = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      clients?: ClientProfile[];
      updates?: ClientUpdate[];
      appointments?: Appointment[];
      consultations?: Consultation[];
    };

    if (!response.ok || payload.ok === false) {
      throw new Error(`Error ${response.status}: ${payload.error ?? 'Error en la API de administración'}`);
    }

    return payload as T;
  }

  // ── Data loading ─────────────────────────────────────────────────────────────

  const loadAll = async () => {
    setDataLoading(true);
    setLoadError(null);
    try {
      const data = await workspaceRequest<{
        clients: ClientProfile[];
        updates: ClientUpdate[];
        appointments: Appointment[];
        consultations: Consultation[];
      }>('GET');
      setClients(data.clients ?? []);
      setUpdates(data.updates ?? []);
      setAppointments(data.appointments ?? []);
      setConsultations(data.consultations ?? []);
    } catch (error) {
      const msg = (error as Error).message;
      setLoadError(msg);
      setStatus(`Error cargando datos: ${msg}`);
    } finally {
      setDataLoading(false);
    }

    // Visitas — falla silenciosamente
    try {
      const { data: s } = await supabase.auth.getSession();
      const token = s.session?.access_token;
      if (token) {
        const res = await fetch('/api/admin/visits?limit=1', {
          headers: { authorization: `Bearer ${token}` },
        });
        const json = await res.json().catch(() => null) as { ok?: boolean; today?: number; week?: number; total?: number } | null;
        if (json?.ok) setVisitStats({ today: json.today ?? 0, week: json.week ?? 0, total: json.total ?? 0 });
      }
    } catch { /* ignorar */ }
  };

  useEffect(() => {
    if (adminId && adminToken) loadAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId, adminToken]);

  useEffect(() => {
    if (selectedClientIdForDocuments) {
      loadDocuments(selectedClientIdForDocuments);
    } else {
      setDocuments([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClientIdForDocuments]);

  // ── Memos ────────────────────────────────────────────────────────────────────

  const clientMap          = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);
  const clientUpdates      = useMemo(() => (clientId ? updates.filter((u) => u.client_profile_id === clientId) : updates), [updates, clientId]);
  const clientAppointments = useMemo(() => (clientId ? appointments.filter((a) => a.client_profile_id === clientId) : appointments), [appointments, clientId]);
  const nextAppointments   = useMemo(() => appointments.filter((a) => new Date(a.start_at).getTime() >= Date.now()).slice(0, 5), [appointments]);
  const lastUpdates        = useMemo(() => updates.slice(0, 5), [updates]);

  const filteredClients = useMemo(() => {
    const term = searchClients.trim().toLowerCase();
    if (!term) return clients;
    return clients.filter(
      (c) => (c.full_name ?? '').toLowerCase().includes(term) || (c.email ?? '').toLowerCase().includes(term)
    );
  }, [clients, searchClients]);

  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const matchStatus = !consultationStatusFilter || c.status === consultationStatusFilter;
      const term = consultationSearch.trim().toLowerCase();
      const matchSearch = !term ||
        (c.name ?? '').toLowerCase().includes(term) ||
        (c.email ?? '').toLowerCase().includes(term) ||
        (c.subject ?? '').toLowerCase().includes(term);
      return matchStatus && matchSearch;
    });
  }, [consultations, consultationStatusFilter, consultationSearch]);

  // ── CRUD helpers ─────────────────────────────────────────────────────────────

  async function convertToClient(c: Consultation) {
    if (!adminToken) return setStatus('No hay sesión admin activa.');
    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ full_name: c.name, email: c.email, phone: c.phone, can_access_portal: false }),
    });
    const data = await res.json().catch(() => ({})) as { ok?: boolean; error?: string };
    if (!res.ok || data.ok === false) return setStatus(`Error: ${data.error ?? 'No se pudo convertir'}`);
    setStatus(`${c.name || c.email || 'Consulta'} convertido a cliente correctamente.`);
    loadAll();
  }

  async function saveClient(e: React.FormEvent) {
    e.preventDefault();
    const email = clientForm.email.toLowerCase();
    const payload = {
      full_name: clientForm.full_name,
      email,
      phone: clientForm.phone || null,
      case_reference: clientForm.case_reference || null,
      can_access_portal: clientForm.can_access_portal,
    };

    try {
      if (editingClientId) {
        await workspaceRequest('PATCH', { entity: 'clients', id: editingClientId, payload });
        setStatus('Cliente actualizado correctamente.');
      } else {
        if (!adminToken) return setStatus('No hay sesión admin activa.');
        const createRes = await fetch('/api/admin/clients', {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
          body: JSON.stringify({ ...payload, password: clientForm.password }),
        });
        const createData = (await createRes.json().catch(() => ({} as { error?: string }))) as { ok?: boolean; error?: string; auth_created?: boolean };
        if (!createRes.ok || createData.ok === false) throw new Error(createData.error ?? 'Error creando cliente');
        setStatus(createData.auth_created ? `✅ Cliente creado. Cuenta habilitada para ${email}.` : '✅ Cliente creado correctamente.');
      }
    } catch (error) {
      return setStatus(`Error guardando cliente: ${(error as Error).message}`);
    }
    setClientForm(emptyClient);
    setEditingClientId(null);
    loadAll();
  }

  async function saveAppointment(e: React.FormEvent) {
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
    try {
      if (editingAppointmentId) {
        await workspaceRequest('PATCH', { entity: 'appointments', id: editingAppointmentId, payload });
      } else {
        await workspaceRequest('POST', { entity: 'appointments', payload });
      }
    } catch (error) {
      return setStatus(`Error guardando cita: ${(error as Error).message}`);
    }
    setStatus('Cita guardada correctamente.');
    setAppointmentForm(emptyAppointment);
    setEditingAppointmentId(null);
    loadAll();
    window.dispatchEvent(new CustomEvent('appointments-updated'));
  }

  async function deleteAppointment(id: string) {
    try {
      await workspaceRequest('DELETE', { entity: 'appointments', id });
    } catch (error) {
      return setStatus(`Error eliminando cita: ${(error as Error).message}`);
    }
    setStatus('Cita eliminada.');
    loadAll();
    window.dispatchEvent(new CustomEvent('appointments-updated'));
  }

  async function saveUpdate(e: React.FormEvent) {
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
    try {
      if (editingUpdateId) {
        await workspaceRequest('PATCH', { entity: 'updates', id: editingUpdateId, payload });
      } else {
        const result = await workspaceRequest<{ ok: boolean; item: { id: string } }>('POST', { entity: 'updates', payload });
        if (payload.visible_to_client && result.item?.id && adminToken) {
          fetch('/api/admin/notify-update', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
            body: JSON.stringify({ update_id: result.item.id }),
          }).catch(() => null);
        }
      }
    } catch (error) {
      return setStatus(`Error guardando actualización: ${(error as Error).message}`);
    }
    setStatus('Actualización guardada correctamente.');
    setUpdateForm(emptyUpdate);
    setEditingUpdateId(null);
    loadAll();
  }

  async function deleteUpdate(id: string) {
    try {
      await workspaceRequest('DELETE', { entity: 'updates', id });
    } catch (error) {
      return setStatus(`Error eliminando actualización: ${(error as Error).message}`);
    }
    setStatus('Actualización eliminada.');
    loadAll();
  }

  async function deleteClient(id: string) {
    if (!window.confirm('¿Eliminar este cliente? Esta acción elimina datos relacionados.')) return;
    try {
      await workspaceRequest('DELETE', { entity: 'clients', id });
      setStatus('Cliente eliminado.');
      await loadAll();
    } catch (error) {
      setStatus(`Error eliminando cliente: ${(error as Error).message}`);
    }
  }

  async function inviteClient(email: string) {
    if (!adminToken) return setStatus('No hay sesión admin activa.');
    try {
      const response = await fetch('/api/admin/invite-client', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; invited?: string };
      if (!response.ok || payload.ok === false) throw new Error(payload.error ?? 'No se pudo enviar la invitación');
      setStatus(`Invitación enviada a ${payload.invited ?? email}.`);
    } catch (error) {
      setStatus(`Error enviando invitación: ${(error as Error).message}`);
    }
  }

  async function loadDocuments(clientProfileId: string) {
    if (!adminToken || !clientProfileId) return;
    try {
      const response = await fetch(`/api/admin/documents?client_profile_id=${clientProfileId}`, {
        headers: { authorization: `Bearer ${adminToken}` },
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; documents?: ClientDocument[] };
      if (!response.ok || payload.ok === false) throw new Error(payload.error ?? 'No se pudieron cargar documentos');
      setDocuments(payload.documents ?? []);
    } catch (error) {
      setStatus(`Error cargando documentos: ${(error as Error).message}`);
    }
  }

  async function uploadDocument(file: File) {
    if (!adminToken || !selectedClientIdForDocuments) return;
    const formData = new FormData();
    formData.append('client_profile_id', selectedClientIdForDocuments);
    formData.append('file', file);
    try {
      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { authorization: `Bearer ${adminToken}` },
        body: formData,
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || payload.ok === false) throw new Error(payload.error ?? 'No se pudo subir el documento');
      setStatus('Documento cargado correctamente.');
      await loadDocuments(selectedClientIdForDocuments);
    } catch (error) {
      setStatus(`Error subiendo documento: ${(error as Error).message}`);
    }
  }

  async function toggleDocumentVisibility(id: string, visible: boolean) {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/documents', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ id, visible_to_client: visible }),
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || payload.ok === false) throw new Error(payload.error ?? 'No se pudo actualizar la visibilidad');
      await loadDocuments(selectedClientIdForDocuments);
    } catch (error) {
      setStatus(`Error actualizando visibilidad: ${(error as Error).message}`);
    }
  }

  async function deleteDocument(id: string) {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/documents', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || payload.ok === false) throw new Error(payload.error ?? 'No se pudo eliminar el documento');
      await loadDocuments(selectedClientIdForDocuments);
    } catch (error) {
      setStatus(`Error eliminando documento: ${(error as Error).message}`);
    }
  }

  async function downloadDocument(path: string, fileName: string) {
    const { data, error } = await supabase.storage.from('client-documents').createSignedUrl(path, 60);
    if (error || !data?.signedUrl) return setStatus(error?.message ?? 'No se pudo generar URL de descarga');
    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function saveConsultation(e: React.FormEvent) {
    e.preventDefault();
    if (!adminId) return setStatus('No hay sesión admin activa.');
    const payload = {
      name: consultationForm.name,
      email: consultationForm.email.toLowerCase(),
      phone: consultationForm.phone || null,
      subject: consultationForm.subject,
      notes: consultationForm.notes || null,
      status: consultationForm.status,
      consultation_date: consultationForm.consultation_date || null,
    };
    try {
      if (editingConsultationId) {
        await workspaceRequest('PATCH', { entity: 'consultations', id: editingConsultationId, payload });
      } else {
        await workspaceRequest('POST', { entity: 'consultations', payload });
      }
    } catch (error) {
      return setStatus(`Error guardando consulta: ${(error as Error).message}`);
    }
    setStatus('✅ Consulta guardada correctamente.');
    setConsultationForm(emptyConsultation);
    setEditingConsultationId(null);
    loadAll();
  }

  async function deleteConsultation(id: string) {
    if (!window.confirm('¿Eliminar esta consulta?')) return;
    try {
      await workspaceRequest('DELETE', { entity: 'consultations', id });
      setStatus('Consulta eliminada.');
      loadAll();
    } catch (error) {
      setStatus(`Error eliminando consulta: ${(error as Error).message}`);
    }
  }

  async function exportBackup() {
    if (!adminId || !adminToken) return setStatus('No hay sesión admin para exportar.');
    const res = await fetch('/api/admin/export', {
      headers: { authorization: `Bearer ${adminToken}` },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({} as { error?: string }));
      return setStatus(`Error exportando: ${data.error ?? 'desconocido'}`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `castellanos-backup-${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const toInputDate = (value: string) => (value ? new Date(value).toISOString().slice(0, 16) : '');

  // ── Render guards ────────────────────────────────────────────────────────────

  if (!ready) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[#1e3a6e]/40 bg-[#0b1929] p-5 text-sm text-slate-400">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
        Verificando sesión…
      </div>
    );
  }

  if (!adminId || !adminToken) {
    return (
      <div className="rounded-xl border border-yellow-600/40 bg-yellow-950/30 p-5 text-sm text-yellow-300">
        <p className="font-semibold">Sin sesión activa</p>
        <p className="mt-1 text-yellow-400/70">
          No se detectó una sesión de administrador. Intenta recargar la página o
          volver a <a href="/admin/login" className="underline">iniciar sesión</a>.
        </p>
      </div>
    );
  }

  // ── Error de carga de datos ──────────────────────────────────────────────────

  if (loadError && !dataLoading) {
    return (
      <div className="rounded-xl border border-red-600/40 bg-red-950/30 p-5 text-sm text-red-300">
        <p className="font-semibold">Error al cargar datos</p>
        <p className="mt-1 font-mono text-xs text-red-400/80">{loadError}</p>
        <button
          className="mt-3 rounded-lg bg-red-900/50 px-4 py-2 text-xs font-semibold text-red-200 hover:bg-red-900 transition"
          onClick={() => loadAll()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────

  return (
    <section className="space-y-6">
      {status && (
        <p className={`text-sm rounded-lg px-3 py-2 ${
          status.startsWith('Error') || status.startsWith('✗')
            ? 'bg-red-950/40 text-red-300'
            : 'bg-emerald-950/40 text-emerald-300'
        }`}>
          {status}
        </p>
      )}

      {dataLoading && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
          Sincronizando datos…
        </div>
      )}

      {(section === 'resumen' || section === 'all') && (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Total clientes</p><p className="mt-1 text-2xl font-semibold">{clients.length}</p></article>
            <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Total citas</p><p className="mt-1 text-2xl font-semibold">{appointments.length}</p></article>
            <article className="card-shell bg-white p-4"><p className="text-xs text-muted uppercase">Total actualizaciones</p><p className="mt-1 text-2xl font-semibold">{updates.length}</p></article>
          </section>
          {visitStats && (
            <section className="grid gap-4 sm:grid-cols-3">
              <Link href="/admin/visitas" className="card-shell bg-white p-4 hover:bg-surface transition block"><p className="text-xs text-muted uppercase">Visitas hoy</p><p className="mt-1 text-2xl font-semibold">{visitStats.today}</p></Link>
              <Link href="/admin/visitas" className="card-shell bg-white p-4 hover:bg-surface transition block"><p className="text-xs text-muted uppercase">Visitas últimos 7 días</p><p className="mt-1 text-2xl font-semibold">{visitStats.week}</p></Link>
              <Link href="/admin/visitas" className="card-shell bg-white p-4 hover:bg-surface transition block"><p className="text-xs text-muted uppercase">Visitas totales</p><p className="mt-1 text-2xl font-semibold">{visitStats.total}</p></Link>
            </section>
          )}
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="card-shell bg-white p-5"><h2 className="text-lg font-semibold">Próximas citas</h2><div className="mt-3 space-y-2 text-sm">{nextAppointments.map((a) => <p key={a.id}>{new Date(a.start_at).toLocaleString('es-CO')} · {a.title}</p>)}{nextAppointments.length===0&&<p className="text-muted">Sin próximas citas.</p>}</div></article>
            <article className="card-shell bg-white p-5"><h2 className="text-lg font-semibold">Últimas actualizaciones</h2><div className="mt-3 space-y-2 text-sm">{lastUpdates.map((u) => <p key={u.id}>{u.title} · {u.status}</p>)}{lastUpdates.length===0&&<p className="text-muted">Sin actualizaciones.</p>}</div></article>
          </section>
        </>
      )}

      {(section === 'clientes' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Clientes</h2>
          <form className="mt-3 grid gap-2" onSubmit={saveClient}>
            <input className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" placeholder="Nombre (opcional)" value={clientForm.full_name} onChange={(e)=>setClientForm({...clientForm,full_name:e.target.value})} />
            <input className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" type="email" placeholder="Correo (opcional)" value={clientForm.email} onChange={(e)=>setClientForm({...clientForm,email:e.target.value})} />
            {!editingClientId && (
              <input className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" type="password" placeholder="Contraseña de acceso al portal" value={clientForm.password} onChange={(e)=>setClientForm({...clientForm,password:e.target.value})} required={clientForm.can_access_portal} />
            )}
            <input className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" placeholder="Teléfono" value={clientForm.phone} onChange={(e)=>setClientForm({...clientForm,phone:e.target.value})} />
            <input className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" placeholder="Referencia" value={clientForm.case_reference} onChange={(e)=>setClientForm({...clientForm,case_reference:e.target.value})} />
            <label className="text-sm text-ink"><input type="checkbox" checked={clientForm.can_access_portal} onChange={(e)=>setClientForm({...clientForm,can_access_portal:e.target.checked})} /> Habilitar portal</label>
            <button className="btn-primary w-fit" type="submit">{editingClientId ? 'Actualizar cliente' : 'Crear cliente'}</button>
          </form>
          <input className="mt-4 rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" placeholder="Buscar por nombre o correo" value={searchClients} onChange={(e) => setSearchClients(e.target.value)} />
          <div className="mt-4 space-y-2 max-h-80 overflow-auto">
            {filteredClients.map((c)=>(
              <div key={c.id} className="rounded-xl border border-border bg-surface p-3 text-sm">
                <p className="font-semibold text-ink">{c.full_name}</p>
                <p className="text-muted">{c.email}</p>
                <p className="text-muted">Citas: {appointments.filter((a)=>a.client_profile_id===c.id).length}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${c.auth_user_id ? 'bg-emerald-100 text-emerald-700' : 'bg-panel text-muted'}`}>{c.auth_user_id ? 'Cuenta activa' : 'Sin cuenta'}</span>
                  {!c.can_access_portal && <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Portal bloqueado</span>}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button className="btn-secondary" onClick={()=>{setEditingClientId(c.id);setClientForm({full_name:c.full_name,email:c.email,password:'',phone:c.phone||'',case_reference:c.case_reference||'',can_access_portal:c.can_access_portal});}}>Editar</button>
                  <button className="btn-secondary" onClick={async ()=>{try{await workspaceRequest('PATCH',{entity:'clients',id:c.id,payload:{can_access_portal:!c.can_access_portal}});await loadAll();}catch(error){setStatus(`Error: ${(error as Error).message}`);}}}>{c.can_access_portal ? 'Deshabilitar portal' : 'Habilitar portal'}</button>
                  {c.can_access_portal && !c.auth_user_id && <button className="btn-secondary" onClick={() => inviteClient(c.email)}>Invitar al portal</button>}
                  <button className="btn-secondary" onClick={() => deleteClient(c.id)}>Eliminar</button>
                  <Link href={`/admin/clientes/${c.id}`} className="btn-secondary">Detalle</Link>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {(section === 'agenda' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Agenda / Calendario</h2>
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
          <div className="mt-4 space-y-2 max-h-80 overflow-auto">
            {clientAppointments.map((a)=>(
              <div key={a.id} className="rounded-lg border p-2 text-sm">
                <p className="font-semibold">{a.title}</p>
                <p className="text-muted">{new Date(a.start_at).toLocaleString('es-CO')} → {new Date(a.end_at).toLocaleString('es-CO')}</p>
                <p className="text-muted">{a.status} · {a.client_profile_id ? clientMap.get(a.client_profile_id)?.full_name || 'Sin cliente' : 'Sin cliente'}</p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-secondary" onClick={()=>{setEditingAppointmentId(a.id);setAppointmentForm({title:a.title,description:a.description||'',start_at:toInputDate(a.start_at),end_at:toInputDate(a.end_at),status:a.status,client_profile_id:a.client_profile_id||''});}}>Editar</button>
                  <button className="btn-secondary" onClick={()=>deleteAppointment(a.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {(section === 'actualizaciones' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Actualizaciones de proceso</h2>
          <form className="mt-3 grid gap-2" onSubmit={saveUpdate}>
            <select className="rounded-lg border p-2" value={updateForm.client_profile_id} onChange={(e)=>setUpdateForm({...updateForm,client_profile_id:e.target.value})} required>
              <option value="">Selecciona cliente</option>
              {clients.map((c)=><option key={c.id} value={c.id}>{c.full_name}</option>)}
            </select>
            <input className="rounded-lg border p-2" placeholder="Título" value={updateForm.title} onChange={(e)=>setUpdateForm({...updateForm,title:e.target.value})} required />
            <textarea className="rounded-lg border p-2" placeholder="Detalle" value={updateForm.update_text} onChange={(e)=>setUpdateForm({...updateForm,update_text:e.target.value})} required />
            <input className="rounded-lg border p-2" placeholder="Estado" value={updateForm.status} onChange={(e)=>setUpdateForm({...updateForm,status:e.target.value})} required />
            <label className="text-sm"><input type="checkbox" checked={updateForm.visible_to_client} onChange={(e)=>setUpdateForm({...updateForm,visible_to_client:e.target.checked})} /> Visible al cliente</label>
            <button className="btn-primary w-fit" type="submit">{editingUpdateId ? 'Actualizar' : 'Crear actualización'}</button>
          </form>
          <div className="mt-4 space-y-2 max-h-80 overflow-auto">
            {clientUpdates.map((u)=>(
              <div key={u.id} className="rounded-lg border p-2 text-sm">
                <p className="font-semibold">{u.title}</p>
                <p className="text-muted">{clientMap.get(u.client_profile_id)?.full_name || 'Cliente no encontrado'} · {u.status}</p>
                <p>{u.update_text}</p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-secondary" onClick={()=>{setEditingUpdateId(u.id);setUpdateForm({client_profile_id:u.client_profile_id,title:u.title,update_text:u.update_text,status:u.status,visible_to_client:u.visible_to_client});}}>Editar</button>
                  <button className="btn-secondary" onClick={()=>deleteUpdate(u.id)}>Eliminar</button>
                  <button className="btn-secondary" onClick={async ()=>{try{await workspaceRequest('PATCH',{entity:'updates',id:u.id,payload:{visible_to_client:!u.visible_to_client}});await loadAll();}catch(error){setStatus(`Error: ${(error as Error).message}`);}}}>{u.visible_to_client ? 'Ocultar' : 'Hacer visible'}</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {(section === 'documentos' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Documentos</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <select className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink" value={selectedClientIdForDocuments} onChange={(e) => setSelectedClientIdForDocuments(e.target.value)}>
              <option value="">Selecciona cliente</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
            </select>
            <label className="btn-secondary cursor-pointer justify-center">
              Subir documento
              <input type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files?.[0]; if (file) { void uploadDocument(file); e.currentTarget.value = ''; } }} />
            </label>
          </div>
          <div className="mt-4 space-y-3">
            {documents.map((doc) => (
              <article key={doc.id} className="rounded-xl border border-border bg-surface p-4">
                <p className="font-semibold text-ink">{doc.file_name}</p>
                <p className="text-xs text-muted">{doc.file_size ? `${Math.round(doc.file_size / 1024)} KB` : 'Tamaño no disponible'} · {new Date(doc.created_at).toLocaleString('es-CO')}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn-secondary" onClick={() => downloadDocument(doc.storage_path, doc.file_name)}>Descargar</button>
                  <button className="btn-secondary" onClick={() => toggleDocumentVisibility(doc.id, !doc.visible_to_client)}>{doc.visible_to_client ? 'Ocultar' : 'Mostrar'}</button>
                  <button className="btn-secondary" onClick={() => deleteDocument(doc.id)}>Eliminar</button>
                </div>
              </article>
            ))}
            {selectedClientIdForDocuments && documents.length === 0 && <p className="text-sm text-muted">No hay documentos para este cliente.</p>}
          </div>
        </article>
      )}

      {(section === 'consultas' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Consultas — personas interesadas (sin registro)</h2>
          <p className="mt-1 text-sm text-muted">Registro de consultas de personas que contactaron pero aún no son clientes.</p>
          <form className="mt-4 grid gap-3" onSubmit={saveConsultation}>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" placeholder="Nombre completo (opcional)" value={consultationForm.name} onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })} />
              <input className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" type="email" placeholder="Correo (opcional)" value={consultationForm.email} onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" placeholder="Teléfono (opcional)" value={consultationForm.phone} onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })} />
              <input className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" type="date" value={consultationForm.consultation_date} onChange={(e) => setConsultationForm({ ...consultationForm, consultation_date: e.target.value })} />
            </div>
            <input className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" placeholder="Asunto / tema de consulta (opcional)" value={consultationForm.subject} onChange={(e) => setConsultationForm({ ...consultationForm, subject: e.target.value })} />
            <textarea className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" placeholder="Notas internas (opcional)" rows={3} value={consultationForm.notes} onChange={(e) => setConsultationForm({ ...consultationForm, notes: e.target.value })} />
            <select className="rounded-xl border border-border px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" value={consultationForm.status} onChange={(e) => setConsultationForm({ ...consultationForm, status: e.target.value })}>
              <option value="pendiente">Pendiente</option>
              <option value="atendida">Atendida</option>
              <option value="descartada">Descartada</option>
            </select>
            <div className="flex gap-3">
              <button className="btn-primary" type="submit">{editingConsultationId ? 'Actualizar consulta' : 'Registrar consulta'}</button>
              {editingConsultationId && <button className="btn-secondary" type="button" onClick={() => { setEditingConsultationId(null); setConsultationForm(emptyConsultation); }}>Cancelar</button>}
            </div>
          </form>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <input className="rounded-xl border border-border px-4 py-2 text-sm text-ink" placeholder="Buscar por nombre, correo o asunto" value={consultationSearch} onChange={(e) => setConsultationSearch(e.target.value)} />
            <select className="rounded-xl border border-border px-4 py-2 text-sm text-ink" value={consultationStatusFilter} onChange={(e) => setConsultationStatusFilter(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="atendida">Atendida</option>
              <option value="descartada">Descartada</option>
            </select>
          </div>
          <div className="mt-4 max-h-96 space-y-3 overflow-auto">
            {filteredConsultations.length === 0 && <p className="text-sm text-muted">No hay consultas registradas aún.</p>}
            {filteredConsultations.map((c) => (
              <div key={c.id} className="rounded-2xl border border-border bg-white p-4 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">{c.name}</p>
                    <p className="text-muted">{c.email}{c.phone ? ` · ${c.phone}` : ''}</p>
                    <p className="mt-1 text-ink">{c.subject}</p>
                    {c.notes && <p className="mt-1 italic text-muted">{c.notes}</p>}
                    {c.consultation_date && <p className="mt-1 text-xs text-muted">Fecha: {new Date(c.consultation_date).toLocaleDateString('es-CO')}</p>}
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === 'atendida' ? 'bg-green-100 text-green-700' : c.status === 'descartada' ? 'bg-slate-100 text-slate-500' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn-secondary" onClick={() => { setEditingConsultationId(c.id); setConsultationForm({ name: c.name, email: c.email, phone: c.phone || '', subject: c.subject, notes: c.notes || '', status: c.status, consultation_date: c.consultation_date ? new Date(c.consultation_date).toISOString().slice(0, 10) : '' }); }}>Editar</button>
                  <button className="btn-secondary" onClick={() => deleteConsultation(c.id)}>Eliminar</button>
                  <button className="btn-primary" onClick={() => convertToClient(c)}>Convertir en cliente</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {(section === 'exportar' || section === 'all') && (
        <article className="card-shell bg-white p-5">
          <h2 className="text-lg font-semibold">Exportar / respaldo</h2>
          <p className="text-sm text-muted mt-2">Descarga Excel con clientes, citas y actualizaciones.</p>
          <button className="btn-primary mt-3" onClick={exportBackup}>Descargar Excel completo</button>
        </article>
      )}
    </section>
  );
}
