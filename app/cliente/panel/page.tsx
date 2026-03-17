'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import type { Session } from '@supabase/supabase-js';

type LegalCase = {
  id: string;
  fecha: string;
  cliente: string;
  proceso: string;
  estado: string;
  beneficios: string[];
  proxima_actuacion: string | null;
  prioridad: 'Alta' | 'Media' | 'Baja';
  honorarios: number;
  pago: 'pendiente' | 'abono' | 'pagado';
  comentarios: string | null;
};

type CasePayment = {
  id: string;
  case_id: string;
  amount: number;
  movement_date: string;
};

export default function ClientPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [payments, setPayments] = useState<CasePayment[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    (async () => {
      setLoading(true);
      const [{ data: casesData }, { data: paymentData }] = await Promise.all([
        supabase.from('legal_cases').select('*').order('updated_at', { ascending: false }),
        supabase.from('case_payments').select('id,case_id,amount,movement_date').order('movement_date', { ascending: false }),
      ]);
      setCases((casesData ?? []) as LegalCase[]);
      setPayments((paymentData ?? []) as CasePayment[]);
      setLoading(false);
    })();
  }, [session]);

  const stats = useMemo(() => {
    const total = cases.length;
    const active = cases.filter((item) => item.estado.toLowerCase() !== 'cerrado').length;
    const next = cases.filter((item) => item.proxima_actuacion).length;
    return { total, active, next };
  }, [cases]);

  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/cliente/acceso';
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal cliente · CastellanosAbogados</p>
          <h1 className="text-2xl font-semibold text-slate-900">Progreso de mis casos</h1>
          <p className="text-sm text-slate-600">Correo de acceso: {session.user.email}</p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Casos totales" value={stats.total} />
          <StatCard label="Casos activos" value={stats.active} />
          <StatCard label="Con próxima actuación" value={stats.next} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Mi agenda de avances</h2>
          {loading && <p className="text-sm text-slate-600">Cargando progreso…</p>}
          {!loading && cases.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500">
              Aún no tienes casos asociados a este correo. Si ya contrataste, solicita a tu abogado asociar este correo en tu caso.
            </p>
          )}

          <div className="space-y-3">
            {cases.map((item) => {
              const casePayments = payments.filter((p) => p.case_id === item.id);
              const paid = casePayments.reduce((acc, value) => acc + value.amount, 0);
              const balance = Math.max(item.honorarios - paid, 0);
              return (
                <article key={item.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{item.cliente}</p>
                      <p className="text-xs text-slate-500">{item.proceso}</p>
                      <p className="text-xs text-slate-500">Estado: {item.estado} · Prioridad: {item.prioridad}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">Pago: {item.pago}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.beneficios?.map((benefit) => (
                      <span key={benefit} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{benefit}</span>
                    ))}
                  </div>

                  <div className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-700">
                    <p>Próxima actuación: {item.proxima_actuacion || 'Pendiente por definir'}</p>
                    <p>Honorarios pactados: ${item.honorarios.toLocaleString('es-CO')}</p>
                    <p>Valor pagado: ${paid.toLocaleString('es-CO')}</p>
                    <p>Saldo: ${balance.toLocaleString('es-CO')}</p>
                  </div>

                  {item.comentarios && (
                    <p className="mt-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-700">{item.comentarios}</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}
