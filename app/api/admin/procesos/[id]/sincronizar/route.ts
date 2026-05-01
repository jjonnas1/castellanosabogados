import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

const RAMA_BASE = 'https://consultaprocesos.ramajudicial.gov.co/api/v2';

async function fetchConTimeout(url: string, ms = 10_000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: ctrl.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const { id } = await params;
  const db = createSupabaseAdminClient();

  const { data: proceso, error } = await db
    .from('procesos')
    .select('id, radicado, id_rama_judicial')
    .eq('id', id)
    .single();

  if (error || !proceso) {
    return NextResponse.json({ ok: false, error: 'Proceso no encontrado' }, { status: 404 });
  }

  try {
    let idRama = proceso.id_rama_judicial;

    if (!idRama) {
      const res = await fetchConTimeout(
        `${RAMA_BASE}/Procesos/Consulta?numero=${encodeURIComponent(proceso.radicado)}&codificacion=UNICO`,
      );
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: `Rama Judicial HTTP ${res.status}` }, { status: 502 });
      }
      const json = await res.json();
      const procesos: Array<{ idProceso: number; despacho?: string }> = json.procesos ?? json ?? [];
      if (!procesos.length) {
        await db.from('procesos').update({ estado: 'No encontrado en Rama Judicial', updated_at: new Date().toISOString() }).eq('id', id);
        return NextResponse.json({ ok: false, error: 'No encontrado en Rama Judicial' }, { status: 404 });
      }
      idRama = String(procesos[0].idProceso);
      await db.from('procesos').update({
        id_rama_judicial: idRama,
        despacho: procesos[0].despacho ?? undefined,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    }

    const actRes = await fetchConTimeout(`${RAMA_BASE}/Proceso/Actuaciones/${idRama}`);
    if (!actRes.ok) {
      return NextResponse.json({ ok: false, error: `Actuaciones HTTP ${actRes.status}` }, { status: 502 });
    }
    const actJson = await actRes.json();
    const ramaActuaciones: Array<{
      fechaActuacion: string;
      actuacion: string;
      anotacion?: string;
      fechaInicio?: string;
      fechaFin?: string;
      conDocumento?: boolean;
    }> = actJson.actuaciones ?? actJson ?? [];

    const { data: existentes } = await db
      .from('actuaciones')
      .select('fecha, tipo')
      .eq('proceso_id', id);

    const existentesSet = new Set(
      (existentes ?? []).map((a) => `${new Date(a.fecha).toISOString().slice(0, 10)}|${a.tipo}`),
    );

    const aNuevas = ramaActuaciones.filter((a) => {
      const key = `${new Date(a.fechaActuacion).toISOString().slice(0, 10)}|${a.actuacion}`;
      return !existentesSet.has(key);
    });

    if (aNuevas.length > 0) {
      await db.from('actuaciones').insert(
        aNuevas.map((a) => ({
          proceso_id:    id,
          fecha:         a.fechaActuacion,
          tipo:          a.actuacion,
          anotacion:     a.anotacion    ?? null,
          fecha_inicio:  a.fechaInicio  ?? null,
          fecha_fin:     a.fechaFin     ?? null,
          con_documento: a.conDocumento ?? false,
          nueva:         true,
        })),
      );
    }

    if (ramaActuaciones.length > 0) {
      const ultima = ramaActuaciones[0];
      await db.from('procesos').update({
        ultima_actuacion:    ultima.actuacion,
        fecha_ult_actuacion: ultima.fechaActuacion,
        sincronizado_en:     new Date().toISOString(),
        updated_at:          new Date().toISOString(),
      }).eq('id', id);
    } else {
      await db.from('procesos').update({
        sincronizado_en: new Date().toISOString(),
        updated_at:      new Date().toISOString(),
      }).eq('id', id);
    }

    return NextResponse.json({ ok: true, actuacionesNuevas: aNuevas.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
