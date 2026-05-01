import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';

const RAMA_BASE = 'https://consultaprocesos.ramajudicial.gov.co/api/v2';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const radicado = req.nextUrl.searchParams.get('radicado');
  if (!radicado) return NextResponse.json({ ok: false, error: 'Falta el parámetro radicado' }, { status: 400 });

  try {
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    const res = await fetch(
      `${RAMA_BASE}/Procesos/Consulta?numero=${encodeURIComponent(radicado)}&codificacion=UNICO`,
      { headers: { Accept: 'application/json' }, signal: ctrl.signal },
    );
    clearTimeout(timer);

    if (!res.ok) return NextResponse.json({ ok: false, error: `Rama Judicial HTTP ${res.status}` }, { status: 502 });

    const json = await res.json();
    const procesos: Array<{
      idProceso: number;
      despacho?: string;
      sujetosProcesales?: string;
      fechaUltimaActuacion?: string;
    }> = json.procesos ?? json ?? [];

    if (!procesos.length) return NextResponse.json({ ok: false, error: 'Radicado no encontrado en Rama Judicial' }, { status: 404 });

    const p = procesos[0];
    return NextResponse.json({
      ok: true,
      idRamaJudicial:     String(p.idProceso),
      despacho:           p.despacho ?? null,
      sujetosProcesales:  p.sujetosProcesales ?? null,
      fechaUltActuacion:  p.fechaUltimaActuacion ?? null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
