import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';

type Entity = 'clients' | 'updates' | 'appointments';

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

function entityTable(entity: Entity) {
  if (entity === 'clients') return 'client_profiles';
  if (entity === 'updates') return 'client_case_updates';
  return 'appointments';
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 403 });

  const supabaseServer = getSupabaseServer();

  const [clients, updates, appointments] = await Promise.all([
    supabaseServer.from('client_profiles').select('*').order('created_at', { ascending: false }),
    supabaseServer.from('client_case_updates').select('*').order('created_at', { ascending: false }),
    supabaseServer.from('appointments').select('*').order('start_at', { ascending: true }),
  ]);

  const error = clients.error ?? updates.error ?? appointments.error;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    clients: clients.data ?? [],
    updates: updates.data ?? [],
    appointments: appointments.data ?? [],
  });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 403 });

  const body = (await req.json().catch(() => null)) as { entity?: Entity; payload?: Record<string, unknown> } | null;
  if (!body?.entity || !body.payload) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer();
  const table = entityTable(body.entity);
  const { data, error } = await supabaseServer.from(table).insert(body.payload).select('*').maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, item: data });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 403 });

  const body = (await req.json().catch(() => null)) as { entity?: Entity; id?: string; payload?: Record<string, unknown> } | null;
  if (!body?.entity || !body?.id || !body.payload) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer();
  const table = entityTable(body.entity);
  const { data, error } = await supabaseServer.from(table).update(body.payload).eq('id', body.id).select('*').maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 403 });

  const body = (await req.json().catch(() => null)) as { entity?: Entity; id?: string } | null;
  if (!body?.entity || !body?.id) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer();
  const table = entityTable(body.entity);
  const { error } = await supabaseServer.from(table).delete().eq('id', body.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
