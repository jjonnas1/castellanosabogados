import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const { id } = await params;
  const db = createSupabaseAdminClient();

  const [{ data: proceso, error }, { data: actuaciones, error: actErr }] = await Promise.all([
    db.from('procesos').select('*').eq('id', id).single(),
    db.from('actuaciones').select('*').eq('proceso_id', id).order('fecha', { ascending: false }),
  ]);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: error.code === 'PGRST116' ? 404 : 500 });
  if (actErr) return NextResponse.json({ ok: false, error: actErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, proceso, actuaciones: actuaciones ?? [] });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const { id } = await params;
  const body = await req.json();
  const db = createSupabaseAdminClient();

  const { data, error } = await db
    .from('procesos')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, proceso: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const { id } = await params;
  const db = createSupabaseAdminClient();

  const { error } = await db.from('procesos').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
