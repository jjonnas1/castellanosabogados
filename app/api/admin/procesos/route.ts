import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const db = createSupabaseAdminClient();

  const { data: procesos, error } = await db
    .from('procesos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const ids = (procesos ?? []).map((p) => p.id);
  let countsByProceso: Record<string, number> = {};

  if (ids.length > 0) {
    const { data: nuevas } = await db
      .from('actuaciones')
      .select('proceso_id')
      .eq('nueva', true)
      .in('proceso_id', ids);

    (nuevas ?? []).forEach((a) => {
      countsByProceso[a.proceso_id] = (countsByProceso[a.proceso_id] ?? 0) + 1;
    });
  }

  const result = (procesos ?? []).map((p) => ({
    ...p,
    actuaciones_nuevas: countsByProceso[p.id] ?? 0,
  }));

  return NextResponse.json({ ok: true, procesos: result });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = await req.json();
  const { radicado, nombre_cliente, contraparte, cliente_id, despacho, ciudad, tipo, estado, notas, alerta_vencimiento, tipo_vencimiento, id_rama_judicial } = body;

  if (!radicado) {
    return NextResponse.json({ ok: false, error: 'El radicado es obligatorio' }, { status: 400 });
  }

  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from('procesos')
    .insert({
      radicado: radicado.trim(),
      nombre_cliente: (nombre_cliente || 'Sin definir').trim(),
      contraparte:       contraparte       || null,
      cliente_id:        cliente_id        || null,
      id_rama_judicial:  id_rama_judicial  || null,
      despacho:          despacho          || null,
      ciudad:            ciudad            || null,
      tipo:              tipo              || null,
      estado:            estado            || 'Activo',
      notas:             notas             || null,
      alerta_vencimiento: alerta_vencimiento || null,
      tipo_vencimiento:  tipo_vencimiento  || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, proceso: data }, { status: 201 });
}
