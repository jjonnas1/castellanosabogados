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

async function sincronizarUnProceso(
  db: ReturnType<typeof createSupabaseAdminClient>,
  proceso: { id: string; radicado: string; id_rama_judicial: string | null },
): Promise<{ actuacionesNuevas: number; ok: boolean }> {
  try {
    let idRama = proceso.id_rama_judicial;

    // Paso 1: Si no tenemos el ID de Rama Judicial, buscamos por radicado
    if (!idRama) {
      const res = await fetchConTimeout(
        `${RAMA_BASE}/Procesos/Consulta?numero=${encodeURIComponent(proceso.radicado)}&codificacion=UNICO`,
      );
      if (!res.ok) {
        console.error(`[sync] Rama Judicial HTTP ${res.status} para radicado ${proceso.radicado}`);
        return { ok: false, actuacionesNuevas: 0 };
      }
      const json = await res.json();
      const procesos: Array<{ idProceso: number; despacho?: string; sujetosProcesales?: string }> =
        json.procesos ?? json ?? [];
      if (!procesos.length) {
        await db.from('procesos').update({ estado: 'No encontrado en Rama Judicial', updated_at: new Date().toISOString() }).eq('id', proceso.id);
        return { ok: false, actuacionesNuevas: 0 };
      }
      idRama = String(procesos[0].idProceso);
      // Guardar el id de Rama Judicial y datos básicos
      await db.from('procesos').update({
        id_rama_judicial: idRama,
        despacho: procesos[0].despacho ?? undefined,
        updated_at: new Date().toISOString(),
      }).eq('id', proceso.id);
    }

    // Paso 2: Obtener actuaciones
    const actRes = await fetchConTimeout(`${RAMA_BASE}/Proceso/Actuaciones/${idRama}`);
    if (!actRes.ok) {
      console.error(`[sync] Actuaciones HTTP ${actRes.status} para idRama ${idRama}`);
      return { ok: false, actuacionesNuevas: 0 };
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

    if (!ramaActuaciones.length) {
      await db.from('procesos').update({ sincronizado_en: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', proceso.id);
      return { ok: true, actuacionesNuevas: 0 };
    }

    // Paso 3: Obtener actuaciones ya guardadas para deduplicar
    const { data: existentes } = await db
      .from('actuaciones')
      .select('fecha, tipo')
      .eq('proceso_id', proceso.id);

    const existentesSet = new Set(
      (existentes ?? []).map((a) => `${new Date(a.fecha).toISOString().slice(0, 10)}|${a.tipo}`),
    );

    // Paso 4: Filtrar solo las nuevas
    const aNuevas = ramaActuaciones.filter((a) => {
      const key = `${new Date(a.fechaActuacion).toISOString().slice(0, 10)}|${a.actuacion}`;
      return !existentesSet.has(key);
    });

    if (aNuevas.length > 0) {
      await db.from('actuaciones').insert(
        aNuevas.map((a) => ({
          proceso_id:    proceso.id,
          fecha:         a.fechaActuacion,
          tipo:          a.actuacion,
          anotacion:     a.anotacion     ?? null,
          fecha_inicio:  a.fechaInicio   ?? null,
          fecha_fin:     a.fechaFin      ?? null,
          con_documento: a.conDocumento  ?? false,
          nueva:         true,
        })),
      );
    }

    // Paso 5: Actualizar proceso
    const ultima = ramaActuaciones[0];
    await db.from('procesos').update({
      ultima_actuacion:    ultima.actuacion,
      fecha_ult_actuacion: ultima.fechaActuacion,
      sincronizado_en:     new Date().toISOString(),
      updated_at:          new Date().toISOString(),
    }).eq('id', proceso.id);

    return { ok: true, actuacionesNuevas: aNuevas.length };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[sync] Error proceso ${proceso.id}:`, msg);
    return { ok: false, actuacionesNuevas: 0 };
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const db = createSupabaseAdminClient();
  const { data: procesos, error } = await db
    .from('procesos')
    .select('id, radicado, id_rama_judicial')
    .in('estado', ['Activo', 'En trámite']);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  let procesosActualizados = 0;
  let actuacionesNuevas = 0;

  for (const p of procesos ?? []) {
    const result = await sincronizarUnProceso(db, p);
    if (result.ok) procesosActualizados++;
    actuacionesNuevas += result.actuacionesNuevas;
  }

  return NextResponse.json({ ok: true, procesosActualizados, actuacionesNuevas });
}
