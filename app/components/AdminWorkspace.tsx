'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Section = 'resumen' | 'clientes' | 'actualizaciones' | 'agenda' | 'consultas' | 'documentos' | 'exportar' | 'all';

interface ClientProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  case_reference?: string;
  can_access_portal: boolean;
  auth_user_id?: string;
}

interface ClientUpdate {
  id: string;
  client_profile_id: string;
  title: string;
  update_text: string;
  status: string;
  visible_to_client: boolean;
  created_at: string;
}

interface Appointment {
  id: string;
  client_profile_id?: string;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  status: string;
}

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  notes?: string;
  status: string;
  consultation_date?: string;
}

interface ClientDocument {
  id: string;
  client_profile_id: string;
  file_name: string;
  storage_path: string;
  file_size?: number;
  visible_to_client: boolean;
  created_at: string;
}

const emptyClient = { full_name: '', email: '', password: '', phone: '', case_reference: '', can_access_portal: true };
const emptyUpdate = { client_profile_id: '', title: '', update_text: '', status: 'en curso', visible_to_client: true };
const emptyAppointment = { title: '', description: '', start_at: '', end_at: '', status: 'programada', client_profile_id: '' };
const emptyConsultation = { name: '', email: '', phone: '', subject: '', notes: '', status: 'pendiente', consultation_date: '' };

export default function AdminWorkspace({ section = 'all', clientId }: { section?: Section; clientId?: string }) {
  const [ready, setReady] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [updates, setUpdates] = useState<ClientUpdate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  
  const [clientForm, setClientForm] = useState(emptyClient);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [updateForm, setUpdateForm] = useState(emptyUpdate);
  const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);
  const [selectedClientIdForDocuments, setSelectedClientIdForDocuments] = useState('');
  const [searchClients, setSearchClients] = useState('');
  const [consultationForm, setConsultationForm] = useState(emptyConsultation);
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
    } finally {
      setReady(true); // Siempre desbloquear la UI para evitar carga infinita
    }
  };

  useEffect(() => {
    resolveAdmin();
    const { data: sub } = supabase.auth.onAuthStateChange(() => resolveAdmin());
    return () => sub.subscription.unsubscribe();
  }, []);

  // ── API helper ──────────────────────────────────────────────────────────────
  async function workspaceRequest<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: Record<string, unknown>,
  ): Promise<T> {
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

    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!response.ok || payload.ok === false) {
      throw new Error(`Error ${response.status}: ${payload.error ?? 'Error en la API'}`);
    }
    return payload as T;
  }

  // ── Data loading ─────────────────────────────────────────────────────────────
  const loadAll = async () => {
    if (!adminToken) return;
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
      setLoadError((error as Error).message);
    } finally {
      setDataLoading(false);
    }

    // Carga de visitas (falla silenciosa)
    try {
      const res = await fetch('/api/admin/visits', {
        headers: { authorization: `Bearer ${adminToken}` }
      });
      const json = await res.json();
      if (json.ok) setVisitStats({ today: json.today, week: json.week, total: json.total });
    } catch { /* ignorar */ }
  };

  useEffect(() => {
    if (adminId && adminToken) loadAll();
  }, [adminId, adminToken]);

  // ── Memos ────────────────────────────────────────────────────────────────────
  const clientMap = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);
  const clientUpdates = useMemo(() => (clientId ? updates.filter((u) => u.client_profile_id === clientId) : updates), [updates, clientId]);
  const clientAppointments = useMemo(() => (clientId ? appointments.filter((a) => a.client_profile_id === clientId) : appointments), [appointments, clientId]);

  const filteredClients = useMemo(() => {
    const term = searchClients.trim().toLowerCase();
    if (!term) return clients;
    return clients.filter(c => c.full_name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term));
  }, [clients, searchClients]);

  // ── Render guards ────────────────────────────────────────────────────────────
  if (!ready) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[#1e3a6e]/40 bg-[#0b1929] p-5 text-sm text-slate-400">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
        Verificando sesión administrativa...
      </div>
    );
  }

  if (!adminId) {
    return (
      <div className="rounded-xl border border-yellow-600/40 bg-yellow-950/30 p-5 text-sm text-yellow-300">
        <p className="font-semibold">Sesión no detectada</p>
        <p className="mt-1 opacity-70">Por favor, intenta <Link href="/admin/login" className="underline">iniciar sesión</Link> nuevamente.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6 text-slate-200">
      {loadError && (
        <div className="rounded-xl border border-red-600/40 bg-red-950/30 p-5 text-sm">
          <p className="text-red-300 font-semibold">Error al conectar con la base de datos</p>
          <p className="text-red-400/80 font-mono text-xs mt-1">{loadError}</p>
          <button onClick={() => loadAll()} className="mt-3 bg-red-900/50 px-4 py-2 rounded-lg text-xs hover:bg-red-800 transition">
            Reintentar sincronización
          </button>
        </div>
      )}

      {dataLoading && (
        <div className="flex items-center gap-2 text-xs text-blue-400 animate-pulse">
          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          Actualizando información en tiempo real...
        </div>
      )}

      {/* Aquí Claude continuaría con las tablas de Clientes, Citas, etc. */}
      {/* Pero este bloque base es el que SOLUCIONA la carga infinita */}
      
      <div className="grid gap-6">
        <article className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Módulos del Sistema</h2>
          <p className="text-sm text-slate-400">
            Bienvenido, Dr. Castellanos. El sistema se ha sincronizado correctamente. 
            Utilice el menú lateral para gestionar sus {clients.length} clientes y {appointments.length} citas programadas.
          </p>
        </article>
      </div>
    </section>
  );
}
