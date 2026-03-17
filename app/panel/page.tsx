'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type PanelTab = 'dashboard' | 'tareas' | 'casos' | 'hoy';
type Priority = 'Alta' | 'Media' | 'Baja';
type TaskStatus = 'Pendiente' | 'En progreso' | 'Hecho';
type TaskImpact = 'Dinero' | 'Legal' | 'Crecimiento' | 'Familia';
type PaymentStatus = 'pendiente' | 'abono' | 'pagado';

type Task = {
  id: string;
  user_id: string;
  fecha: string;
  tarea: string;
  categoria: string;
  prioridad: Priority;
  estado: TaskStatus;
  impacto: TaskImpact;
  notas: string | null;
  created_at: string;
  updated_at: string;
};

type LegalCase = {
  id: string;
  user_id: string;
  fecha: string;
  cliente: string;
  client_email: string | null;
  marce: string | null;
  patio: string | null;
  radicados: string[];
  proceso: string;
  beneficios: string[];
  estado: string;
  proxima_actuacion: string | null;
  prioridad: Priority;
  honorarios: number;
  pago: PaymentStatus;
  comentarios: string | null;
  created_at: string;
  updated_at: string;
};

type CasePayment = {
  id: string;
  user_id: string;
  case_id: string;
  amount: number;
  status: PaymentStatus;
  movement_date: string;
  notes: string | null;
  created_at: string;
};

type TodayTask = {
  id: string;
  user_id: string;
  task_id: string;
  sort_order: number;
};

const initialTaskForm = {
  fecha: new Date().toISOString().slice(0, 10),
  tarea: '',
  categoria: 'Personal',
  prioridad: 'Media' as Priority,
  estado: 'Pendiente' as TaskStatus,
  impacto: 'Legal' as TaskImpact,
  notas: '',
};

const initialCaseForm = {
  fecha: new Date().toISOString().slice(0, 10),
  cliente: '',
  client_email: '',
  marce: '',
  patio: '',
  radicados: '',
  proceso: '',
  beneficios: '',
  estado: 'En curso',
  proxima_actuacion: '',
  prioridad: 'Media' as Priority,
  honorarios: 0,
  pago: 'pendiente' as PaymentStatus,
  comentarios: '',
};

export default function PrivatePanelPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [tab, setTab] = useState<PanelTab>('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [payments, setPayments] = useState<CasePayment[]>([]);
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>([]);

  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [caseForm, setCaseForm] = useState(initialCaseForm);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [paymentInputByCase, setPaymentInputByCase] = useState<Record<string, string>>({});

  const [taskSearch, setTaskSearch] = useState('');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('all');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  const [taskCategoryFilter, setTaskCategoryFilter] = useState('all');

  const [caseSearch, setCaseSearch] = useState('');
  const [caseStatusFilter, setCaseStatusFilter] = useState('all');
  const [casePriorityFilter, setCasePriorityFilter] = useState('all');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login';
        return;
      }
      setUserId(data.user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session?.user) {
        window.location.href = '/login';
        return;
      }
      setUserId(session.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    loadAll();
  }, [userId]);

  async function loadAll() {
    setLoading(true);
    setError(null);

    const [taskRes, caseRes, paymentRes, todayRes] = await Promise.all([
      supabase.from('tasks').select('*').order('fecha', { ascending: true }),
      supabase.from('legal_cases').select('*').order('updated_at', { ascending: false }),
      supabase.from('case_payments').select('*').order('movement_date', { ascending: false }),
      supabase.from('today_tasks').select('*').order('sort_order', { ascending: true }),
    ]);

    if (taskRes.error || caseRes.error || paymentRes.error || todayRes.error) {
      setError(taskRes.error?.message ?? caseRes.error?.message ?? paymentRes.error?.message ?? todayRes.error?.message ?? 'No se pudo cargar el panel.');
    } else {
      setTasks(taskRes.data as Task[]);
      setCases(caseRes.data as LegalCase[]);
      setPayments(paymentRes.data as CasePayment[]);
      setTodayTasks(todayRes.data as TodayTask[]);
    }

    setLoading(false);
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const bySearch = [task.tarea, task.categoria, task.notas ?? ''].join(' ').toLowerCase().includes(taskSearch.toLowerCase());
      const byPriority = taskPriorityFilter === 'all' || task.prioridad === taskPriorityFilter;
      const byStatus = taskStatusFilter === 'all' || task.estado === taskStatusFilter;
      const byCategory = taskCategoryFilter === 'all' || task.categoria === taskCategoryFilter;
      return bySearch && byPriority && byStatus && byCategory;
    });
  }, [tasks, taskSearch, taskPriorityFilter, taskStatusFilter, taskCategoryFilter]);

  const filteredCases = useMemo(() => {
    return cases.filter((legalCase) => {
      const searchable = [
        legalCase.cliente,
        legalCase.marce ?? '',
        legalCase.patio ?? '',
        legalCase.radicados.join(' '),
        legalCase.beneficios.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const bySearch = searchable.includes(caseSearch.toLowerCase());
      const byStatus = caseStatusFilter === 'all' || legalCase.estado === caseStatusFilter;
      const byPriority = casePriorityFilter === 'all' || legalCase.prioridad === casePriorityFilter;
      return bySearch && byStatus && byPriority;
    });
  }, [cases, caseSearch, caseStatusFilter, casePriorityFilter]);

  const dashboard = useMemo(() => {
    const pendingPayments = cases.filter((c) => c.pago !== 'pagado').length;
    const urgentCases = cases.filter((c) => c.prioridad === 'Alta').length;
    const inProgress = tasks.filter((t) => t.estado === 'En progreso').length;
    const pending = tasks.filter((t) => t.estado === 'Pendiente').length;
    const done = tasks.filter((t) => t.estado === 'Hecho').length;
    const upcomingActions = cases.filter((c) => c.proxima_actuacion).slice(0, 4);
    const priorityCases = cases.filter((c) => c.prioridad === 'Alta').slice(0, 4);

    return {
      totalTasks: tasks.length,
      pending,
      inProgress,
      done,
      urgentCases,
      pendingPayments,
      upcomingActions,
      priorityCases,
    };
  }, [tasks, cases]);

  const categories = useMemo(() => Array.from(new Set(tasks.map((t) => t.categoria))), [tasks]);

  const todayTaskRows = useMemo(() => {
    return todayTasks
      .map((row) => ({ row, task: tasks.find((t) => t.id === row.task_id) }))
      .filter((entry) => entry.task) as { row: TodayTask; task: Task }[];
  }, [todayTasks, tasks]);

  async function upsertTask(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !taskForm.tarea.trim()) return;

    if (editingTaskId) {
      const { error } = await supabase
        .from('tasks')
        .update({ ...taskForm, notas: taskForm.notas || null })
        .eq('id', editingTaskId);
      if (error) return setError(error.message);
    } else {
      const { error } = await supabase.from('tasks').insert({ ...taskForm, notas: taskForm.notas || null, user_id: userId });
      if (error) return setError(error.message);
    }

    setTaskForm(initialTaskForm);
    setEditingTaskId(null);
    loadAll();
  }

  function startTaskEdit(task: Task) {
    setEditingTaskId(task.id);
    setTaskForm({
      fecha: task.fecha,
      tarea: task.tarea,
      categoria: task.categoria,
      prioridad: task.prioridad,
      estado: task.estado,
      impacto: task.impacto,
      notas: task.notas ?? '',
    });
  }

  async function removeTask(id: string) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) return setError(error.message);
    loadAll();
  }

  async function quickState(id: string, estado: TaskStatus) {
    const { error } = await supabase.from('tasks').update({ estado }).eq('id', id);
    if (error) return setError(error.message);
    loadAll();
  }

  async function toggleToday(taskId: string) {
    if (!userId) return;
    const existing = todayTasks.find((t) => t.task_id === taskId);
    if (existing) {
      const { error } = await supabase.from('today_tasks').delete().eq('id', existing.id);
      if (error) return setError(error.message);
      return loadAll();
    }

    if (todayTasks.length >= 3) {
      setError('Solo puedes seleccionar hasta 3 tareas para Hoy.');
      return;
    }

    const { error } = await supabase
      .from('today_tasks')
      .insert({ user_id: userId, task_id: taskId, sort_order: todayTasks.length + 1 });

    if (error) return setError(error.message);
    loadAll();
  }

  async function upsertCase(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !caseForm.cliente.trim() || !caseForm.proceso.trim()) return;

    const payload = {
      ...caseForm,
      marce: caseForm.marce || null,
      patio: caseForm.patio || null,
      proxima_actuacion: caseForm.proxima_actuacion || null,
      comentarios: caseForm.comentarios || null,
      client_email: caseForm.client_email || null,
      radicados: splitCsv(caseForm.radicados),
      beneficios: splitCsv(caseForm.beneficios),
    };

    if (editingCaseId) {
      const { error } = await supabase.from('legal_cases').update(payload).eq('id', editingCaseId);
      if (error) return setError(error.message);
    } else {
      const { error } = await supabase.from('legal_cases').insert({ ...payload, user_id: userId });
      if (error) return setError(error.message);
    }

    setCaseForm(initialCaseForm);
    setEditingCaseId(null);
    loadAll();
  }

  function startCaseEdit(legalCase: LegalCase) {
    setEditingCaseId(legalCase.id);
    setCaseForm({
      fecha: legalCase.fecha,
      cliente: legalCase.cliente,
      client_email: legalCase.client_email ?? '',
      marce: legalCase.marce ?? '',
      patio: legalCase.patio ?? '',
      radicados: legalCase.radicados.join(', '),
      proceso: legalCase.proceso,
      beneficios: legalCase.beneficios.join(', '),
      estado: legalCase.estado,
      proxima_actuacion: legalCase.proxima_actuacion ?? '',
      prioridad: legalCase.prioridad,
      honorarios: legalCase.honorarios,
      pago: legalCase.pago,
      comentarios: legalCase.comentarios ?? '',
    });
  }

  async function removeCase(id: string) {
    const { error } = await supabase.from('legal_cases').delete().eq('id', id);
    if (error) return setError(error.message);
    loadAll();
  }

  async function addPayment(caseId: string) {
    if (!userId) return;
    const rawAmount = paymentInputByCase[caseId];
    const amount = Number(rawAmount);
    if (!amount || amount <= 0) return;

    const legalCase = cases.find((c) => c.id === caseId);
    if (!legalCase) return;

    const paidUntilNow = payments.filter((p) => p.case_id === caseId).reduce((acc, item) => acc + item.amount, 0);
    const newTotalPaid = paidUntilNow + amount;
    const nextStatus: PaymentStatus = newTotalPaid >= legalCase.honorarios ? 'pagado' : 'abono';

    const insertPayment = await supabase.from('case_payments').insert({
      user_id: userId,
      case_id: caseId,
      amount,
      status: nextStatus,
      movement_date: new Date().toISOString().slice(0, 10),
    });

    if (insertPayment.error) return setError(insertPayment.error.message);

    const updateCase = await supabase.from('legal_cases').update({ pago: nextStatus }).eq('id', caseId);
    if (updateCase.error) return setError(updateCase.error.message);

    setPaymentInputByCase((prev) => ({ ...prev, [caseId]: '' }));
    loadAll();
  }

  if (!userId || loading) {
    return <main className="min-h-screen bg-slate-100 p-6 text-slate-700">Cargando panel privado…</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 md:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Panel privado · CastellanosAbogados</p>
              <h1 className="text-2xl font-semibold text-slate-900">Gestión interna jurídica</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={loadAll} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Actualizar</button>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/login';
                }}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <PanelButton current={tab} value="dashboard" onClick={setTab} label="Dashboard" />
            <PanelButton current={tab} value="tareas" onClick={setTab} label="Agenda / Pendientes" />
            <PanelButton current={tab} value="casos" onClick={setTab} label="CRM Jurídico" />
            <PanelButton current={tab} value="hoy" onClick={setTab} label="Top 3 de Hoy" />
          </div>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
        </header>

        {tab === 'dashboard' && (
          <section className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total tareas" value={dashboard.totalTasks} />
              <MetricCard title="Pendientes" value={dashboard.pending} />
              <MetricCard title="En progreso" value={dashboard.inProgress} />
              <MetricCard title="Hechas" value={dashboard.done} />
              <MetricCard title="Casos urgentes" value={dashboard.urgentCases} />
              <MetricCard title="Pagos pendientes" value={dashboard.pendingPayments} />
              <MetricCard title="Movimientos clave" value={dashboard.upcomingActions.length} />
              <MetricCard title="Casos prioritarios" value={dashboard.priorityCases.length} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <PanelBox title="Próximas actuaciones">
                {dashboard.upcomingActions.length === 0 && <EmptyState text="No hay actuaciones próximas." />}
                {dashboard.upcomingActions.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.cliente}</p>
                    <p className="text-slate-600">{item.proceso}</p>
                    <p className="text-xs text-slate-500">{item.proxima_actuacion}</p>
                  </div>
                ))}
              </PanelBox>

              <PanelBox title="Casos prioritarios">
                {dashboard.priorityCases.length === 0 && <EmptyState text="No hay casos en prioridad alta." />}
                {dashboard.priorityCases.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.cliente}</p>
                    <p className="text-slate-600">{item.estado}</p>
                    <p className="text-xs text-slate-500">Pago: {item.pago}</p>
                  </div>
                ))}
              </PanelBox>
            </div>
          </section>
        )}

        {tab === 'tareas' && (
          <section className="grid gap-4 lg:grid-cols-[0.95fr_1.3fr]">
            <PanelBox title={editingTaskId ? 'Editar tarea' : 'Nueva tarea'}>
              <form onSubmit={upsertTask} className="space-y-2 text-sm">
                <input className="w-full rounded-lg border p-2" type="date" value={taskForm.fecha} onChange={(e) => setTaskForm({ ...taskForm, fecha: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" placeholder="Tarea" value={taskForm.tarea} onChange={(e) => setTaskForm({ ...taskForm, tarea: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" placeholder="Categoría (Personal, Empresarial, Jurídico...)" value={taskForm.categoria} onChange={(e) => setTaskForm({ ...taskForm, categoria: e.target.value })} required />
                <div className="grid grid-cols-2 gap-2">
                  <Select value={taskForm.prioridad} onChange={(v) => setTaskForm({ ...taskForm, prioridad: v as Priority })} options={['Alta', 'Media', 'Baja']} />
                  <Select value={taskForm.estado} onChange={(v) => setTaskForm({ ...taskForm, estado: v as TaskStatus })} options={['Pendiente', 'En progreso', 'Hecho']} />
                </div>
                <Select value={taskForm.impacto} onChange={(v) => setTaskForm({ ...taskForm, impacto: v as TaskImpact })} options={['Dinero', 'Legal', 'Crecimiento', 'Familia']} />
                <textarea className="w-full rounded-lg border p-2" rows={3} placeholder="Notas" value={taskForm.notas} onChange={(e) => setTaskForm({ ...taskForm, notas: e.target.value })} />
                <div className="flex gap-2">
                  <button className="rounded-lg bg-slate-900 px-3 py-2 text-white">{editingTaskId ? 'Guardar' : 'Crear tarea'}</button>
                  {editingTaskId && (
                    <button type="button" onClick={() => { setEditingTaskId(null); setTaskForm(initialTaskForm); }} className="rounded-lg border px-3 py-2">Cancelar</button>
                  )}
                </div>
              </form>
            </PanelBox>

            <PanelBox title="Pendientes y agenda">
              <div className="mb-3 grid gap-2 md:grid-cols-4">
                <input className="rounded-lg border p-2 text-sm" placeholder="Buscar tarea" value={taskSearch} onChange={(e) => setTaskSearch(e.target.value)} />
                <Select value={taskPriorityFilter} onChange={setTaskPriorityFilter} options={['all', 'Alta', 'Media', 'Baja']} />
                <Select value={taskStatusFilter} onChange={setTaskStatusFilter} options={['all', 'Pendiente', 'En progreso', 'Hecho']} />
                <Select value={taskCategoryFilter} onChange={setTaskCategoryFilter} options={['all', ...categories]} />
              </div>

              <div className="space-y-2">
                {filteredTasks.length === 0 && <EmptyState text="No hay tareas para los filtros actuales." />}
                {filteredTasks.map((task) => {
                  const isToday = todayTasks.some((t) => t.task_id === task.id);
                  return (
                    <article key={task.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{task.tarea}</p>
                          <p className="text-xs text-slate-500">{task.fecha} · {task.categoria} · {task.impacto}</p>
                          {task.notas && <p className="text-sm text-slate-600">{task.notas}</p>}
                        </div>
                        <div className="flex flex-wrap gap-1 text-xs">
                          <Badge text={task.prioridad} />
                          <Badge text={task.estado} tone="dark" />
                          <button onClick={() => toggleToday(task.id)} className="rounded-md border px-2 py-1">{isToday ? 'Quitar de Hoy' : 'Marcar Hoy'}</button>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <button onClick={() => quickState(task.id, 'Pendiente')} className="rounded border px-2 py-1">Pendiente</button>
                        <button onClick={() => quickState(task.id, 'En progreso')} className="rounded border px-2 py-1">En progreso</button>
                        <button onClick={() => quickState(task.id, 'Hecho')} className="rounded border px-2 py-1">Hecho</button>
                        <button onClick={() => startTaskEdit(task)} className="rounded border px-2 py-1">Editar</button>
                        <button onClick={() => removeTask(task.id)} className="rounded border border-red-200 px-2 py-1 text-red-700">Eliminar</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </PanelBox>
          </section>
        )}

        {tab === 'casos' && (
          <section className="grid gap-4 lg:grid-cols-[0.95fr_1.3fr]">
            <PanelBox title={editingCaseId ? 'Editar caso jurídico' : 'Nuevo caso jurídico'}>
              <form onSubmit={upsertCase} className="space-y-2 text-sm">
                <input className="w-full rounded-lg border p-2" type="date" value={caseForm.fecha} onChange={(e) => setCaseForm({ ...caseForm, fecha: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" placeholder="Cliente" value={caseForm.cliente} onChange={(e) => setCaseForm({ ...caseForm, cliente: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" type="email" placeholder="Correo del cliente (para acceso al progreso)" value={caseForm.client_email} onChange={(e) => setCaseForm({ ...caseForm, client_email: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-lg border p-2" placeholder="MARCE" value={caseForm.marce} onChange={(e) => setCaseForm({ ...caseForm, marce: e.target.value })} />
                  <input className="rounded-lg border p-2" placeholder="Patio" value={caseForm.patio} onChange={(e) => setCaseForm({ ...caseForm, patio: e.target.value })} />
                </div>
                <input className="w-full rounded-lg border p-2" placeholder="Radicados (separados por coma)" value={caseForm.radicados} onChange={(e) => setCaseForm({ ...caseForm, radicados: e.target.value })} />
                <input className="w-full rounded-lg border p-2" placeholder="Proceso" value={caseForm.proceso} onChange={(e) => setCaseForm({ ...caseForm, proceso: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" placeholder="Beneficios solicitados (coma)" value={caseForm.beneficios} onChange={(e) => setCaseForm({ ...caseForm, beneficios: e.target.value })} />
                <input className="w-full rounded-lg border p-2" placeholder="Estado del caso" value={caseForm.estado} onChange={(e) => setCaseForm({ ...caseForm, estado: e.target.value })} required />
                <input className="w-full rounded-lg border p-2" placeholder="Próxima actuación" value={caseForm.proxima_actuacion} onChange={(e) => setCaseForm({ ...caseForm, proxima_actuacion: e.target.value })} />
                <div className="grid grid-cols-3 gap-2">
                  <Select value={caseForm.prioridad} onChange={(v) => setCaseForm({ ...caseForm, prioridad: v as Priority })} options={['Alta', 'Media', 'Baja']} />
                  <input className="rounded-lg border p-2" type="number" min={0} placeholder="Honorarios" value={caseForm.honorarios} onChange={(e) => setCaseForm({ ...caseForm, honorarios: Number(e.target.value) })} />
                  <Select value={caseForm.pago} onChange={(v) => setCaseForm({ ...caseForm, pago: v as PaymentStatus })} options={['pendiente', 'abono', 'pagado']} />
                </div>
                <textarea className="w-full rounded-lg border p-2" rows={3} placeholder="Comentarios" value={caseForm.comentarios} onChange={(e) => setCaseForm({ ...caseForm, comentarios: e.target.value })} />
                <div className="flex gap-2">
                  <button className="rounded-lg bg-slate-900 px-3 py-2 text-white">{editingCaseId ? 'Guardar' : 'Crear caso'}</button>
                  {editingCaseId && <button type="button" className="rounded-lg border px-3 py-2" onClick={() => { setEditingCaseId(null); setCaseForm(initialCaseForm); }}>Cancelar</button>}
                </div>
              </form>
            </PanelBox>

            <PanelBox title="CRM Jurídico y pagos">
              <div className="mb-3 grid gap-2 md:grid-cols-3">
                <input className="rounded-lg border p-2 text-sm" placeholder="Buscar cliente / marce / patio / radicado / beneficio" value={caseSearch} onChange={(e) => setCaseSearch(e.target.value)} />
                <Select value={caseStatusFilter} onChange={setCaseStatusFilter} options={['all', ...Array.from(new Set(cases.map((c) => c.estado)))]} />
                <Select value={casePriorityFilter} onChange={setCasePriorityFilter} options={['all', 'Alta', 'Media', 'Baja']} />
              </div>

              <div className="space-y-3">
                {filteredCases.length === 0 && <EmptyState text="No hay casos para los filtros actuales." />}
                {filteredCases.map((item) => {
                  const casePayments = payments.filter((p) => p.case_id === item.id);
                  const totalPaid = casePayments.reduce((acc, p) => acc + p.amount, 0);
                  const balance = Math.max(item.honorarios - totalPaid, 0);
                  const lastMovement = casePayments[0]?.movement_date ?? 'Sin movimientos';

                  return (
                    <article key={item.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{item.cliente}</p>
                          <p className="text-xs text-slate-500">{item.proceso} · {item.estado}</p>
                          <p className="text-xs text-slate-500">Cliente acceso: {item.client_email || 'No definido'}</p>
                          <p className="text-xs text-slate-500">MARCE: {item.marce || '—'} · Patio: {item.patio || '—'}</p>
                          <p className="text-xs text-slate-500">Radicados: {item.radicados.join(', ') || '—'}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 text-xs">
                          <Badge text={item.prioridad} />
                          <Badge text={item.pago} tone="dark" />
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.beneficios.map((benefit) => (
                          <span key={benefit} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{benefit}</span>
                        ))}
                      </div>

                      <div className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-700">
                        <p>Honorarios pactados: ${item.honorarios.toLocaleString('es-CO')}</p>
                        <p>Valor pagado: ${totalPaid.toLocaleString('es-CO')}</p>
                        <p>Saldo: ${balance.toLocaleString('es-CO')}</p>
                        <p>Último movimiento: {lastMovement}</p>
                        <div className="mt-2 flex gap-2">
                          <input
                            type="number"
                            min={0}
                            value={paymentInputByCase[item.id] ?? ''}
                            onChange={(e) => setPaymentInputByCase((prev) => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder="Registrar abono"
                            className="w-40 rounded border p-1"
                          />
                          <button onClick={() => addPayment(item.id)} className="rounded border px-2 py-1">Guardar pago</button>
                        </div>
                      </div>

                      {item.comentarios && (
                        <p className="mt-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-700">{item.comentarios}</p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <button onClick={() => startCaseEdit(item)} className="rounded border px-2 py-1">Editar</button>
                        <button onClick={() => removeCase(item.id)} className="rounded border border-red-200 px-2 py-1 text-red-700">Eliminar</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </PanelBox>
          </section>
        )}

        {tab === 'hoy' && (
          <PanelBox title="Top 3 del día (persistente)">
            <p className="mb-3 text-sm text-slate-600">Selecciona hasta 3 tareas desde Agenda / Pendientes. Quedan guardadas en Supabase para sincronizar iPhone y Mac.</p>
            <div className="space-y-2">
              {todayTaskRows.length === 0 && <EmptyState text="Aún no tienes tareas marcadas para hoy." />}
              {todayTaskRows.map((entry, index) => (
                <div key={entry.row.id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-semibold text-slate-900">#{index + 1} · {entry.task.tarea}</p>
                  <p className="text-xs text-slate-500">{entry.task.fecha} · {entry.task.prioridad} · {entry.task.estado}</p>
                </div>
              ))}
            </div>
          </PanelBox>
        )}
      </div>
    </main>
  );
}

function PanelButton({ current, value, label, onClick }: { current: PanelTab; value: PanelTab; label: string; onClick: (tab: PanelTab) => void; }) {
  const active = current === value;
  return (
    <button onClick={() => onClick(value)} className={`rounded-lg px-3 py-2 text-sm ${active ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>
      {label}
    </button>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}

function PanelBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">{title}</h2>
      <div className="space-y-2">{children}</div>
    </article>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500">{text}</p>;
}

function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <select className="w-full rounded-lg border p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

function Badge({ text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs ${tone === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
      {text}
    </span>
  );
}

function splitCsv(raw: string) {
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}
