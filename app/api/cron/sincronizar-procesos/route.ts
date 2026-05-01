import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

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

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const db = createSupabaseAdminClient();
  const { data: procesos, error } = await db
    .from('procesos')
    .select('id, radicado, id_rama_judicial')
    .in('estado', ['Activo', 'En trámite']);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  let procesosActualizados = 0;
  let actuacionesNuevas = 0;

  for (const proceso of procesos ?? []) {
    try {
      let idRama = proceso.id_rama_judicial;

      if (!idRama) {
        const res = await fetchConTimeout(
          `${RAMA_BASE}/Procesos/Consulta?numero=${encodeURIComponent(proceso.radicado)}&codificacion=UNICO`,
        );
        if (!res.ok) continue;
        const json = await res.json();
        const found: Array<{ idProceso: number; despacho?: string }> = json.procesos ?? json ?? [];
        if (!found.length) {
          await db.from('procesos').update({ estado: 'No encontrado en Rama Judicial', updated_at: new Date().toISOString() }).eq('id', proceso.id);
          continue;
        }
        idRama = String(found[0].idProceso);
        await db.from('procesos').update({
          id_rama_judicial: idRama,
          despacho: found[0].despacho ?? undefined,
          updated_at: new Date().toISOString(),
        }).eq('id', proceso.id);
      }

      const actRes = await fetchConTimeout(`${RAMA_BASE}/Proceso/Actuaciones/${idRama}`);
      if (!actRes.ok) continue;
      const actJson = await actRes.json();
      const ramaActs: Array<{
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
        .eq('proceso_id', proceso.id);

      const existentesSet = new Set(
        (existentes ?? []).map((a) => `${new Date(a.fecha).toISOString().slice(0, 10)}|${a.tipo}`),
      );

      const aNuevas = ramaActs.filter((a) => {
        const key = `${new Date(a.fechaActuacion).toISOString().slice(0, 10)}|${a.actuacion}`;
        return !existentesSet.has(key);
      });

      if (aNuevas.length > 0) {
        await db.from('actuaciones').insert(
          aNuevas.map((a) => ({
            proceso_id:    proceso.id,
            fecha:         a.fechaActuacion,
            tipo:          a.actuacion,
            anotacion:     a.anotacion    ?? null,
            fecha_inicio:  a.fechaInicio  ?? null,
            fecha_fin:     a.fechaFin     ?? null,
            con_documento: a.conDocumento ?? false,
            nueva:         true,
          })),
        );
        actuacionesNuevas += aNuevas.length;
      }

      if (ramaActs.length > 0) {
        const ultima = ramaActs[0];
        await db.from('procesos').update({
          ultima_actuacion:    ultima.actuacion,
          fecha_ult_actuacion: ultima.fechaActuacion,
          sincronizado_en:     new Date().toISOString(),
          updated_at:          new Date().toISOString(),
        }).eq('id', proceso.id);
      }

      procesosActualizados++;
    } catch {
      // per-process errors don't fail the whole cron
    }
  }

  console.log(`[cron] sincronizar-procesos: ${procesosActualizados} procesos, ${actuacionesNuevas} actuaciones nuevas`);
  return NextResponse.json({ ok: true, procesosActualizados, actuacionesNuevas });
}
