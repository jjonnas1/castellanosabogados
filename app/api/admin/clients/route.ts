import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const token = authHeader.slice('Bearer '.length);

  let supabase;
  try {
    supabase = getAdminSupabase();
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user?.id) {
    return NextResponse.json({ ok: false, error: 'Sesión inválida' }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== 'admin') {
    return NextResponse.json({ ok: false, error: 'Permisos insuficientes' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as {
    full_name?: string;
    email?: string;
    phone?: string | null;
    case_reference?: string | null;
    can_access_portal?: boolean;
  } | null;

  if (!body?.full_name || !body?.email) {
    return NextResponse.json({ ok: false, error: 'Nombre y correo son requeridos' }, { status: 400 });
  }

  const payload = {
    full_name: body.full_name,
    email: body.email.toLowerCase(),
    phone: body.phone ?? null,
    case_reference: body.case_reference ?? null,
    can_access_portal: body.can_access_portal ?? true,
  };

  const { data, error } = await supabase
    .from('client_profiles')
    .insert(payload)
    .select('*')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, client: data });
}
