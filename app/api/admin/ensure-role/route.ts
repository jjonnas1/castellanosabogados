import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, hasServiceRole } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  if (!hasServiceRole()) {
    return NextResponse.json({ ok: false, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const token = authHeader.slice('Bearer '.length);
  const supabaseServer = getSupabaseServer();

  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user?.id) {
    return NextResponse.json({ ok: false, error: 'Sesión inválida' }, { status: 401 });
  }

  const userEmail = (userData.user.email ?? '').toLowerCase();
  const ownerEmail = (process.env.ADMIN_OWNER_EMAIL ?? '').trim().toLowerCase();
  const fallbackOwner = 'jonatancastellanosabogado@gmail.com';
  const allowed = [ownerEmail, fallbackOwner].filter(Boolean);

  if (!userEmail || !allowed.includes(userEmail)) {
    return NextResponse.json({ ok: false, error: 'Este usuario no está en la lista de owner/admin' }, { status: 403 });
  }

  const { error: upsertError } = await supabaseServer.from('user_profiles').upsert({
    id: userData.user.id,
    email: userEmail,
    role: 'admin',
    full_name: userData.user.user_metadata?.full_name ?? null,
  });

  if (upsertError) {
    return NextResponse.json({ ok: false, error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ensured: true, email: userEmail });
}
