import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const db = createSupabaseAdminClient();

  const en7Dias = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: conNuevas }, { data: porVencer }] = await Promise.all([
    db
      .from('actuaciones')
      .select('proceso_id')
      .eq('nueva', true),
    db
      .from('procesos')
      .select('id, radicado, nombre_cliente, alerta_vencimiento, tipo_vencimiento')
      .not('alerta_vencimiento', 'is', null)
      .lte('alerta_vencimiento', en7Dias)
      .in('estado', ['Activo', 'En trámite']),
  ]);

  const procesosConNuevas = new Set((conNuevas ?? []).map((a) => a.proceso_id));

  return NextResponse.json({
    ok: true,
    actuacionesNuevas: procesosConNuevas.size,
    vencimientosProximos: (porVencer ?? []).length,
    vencimientos: porVencer ?? [],
  });
}
