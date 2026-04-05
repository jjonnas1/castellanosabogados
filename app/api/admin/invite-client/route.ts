import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, hasServiceRole, requireAdmin } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  if (!hasServiceRole()) return NextResponse.json({ ok: false, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' }, { status: 500 });

  const body = await req.json();
  const email = (body?.email ?? '').trim().toLowerCase();
  if (!email) return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 });

  const { data, error } = await getSupabaseServer({ serviceRole: true }).auth.admin.inviteUserByEmail(email, {
    redirectTo: `${req.nextUrl.origin}/cliente/registro?invited=true`,
  });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, invited: data.user?.email ?? email });
}
