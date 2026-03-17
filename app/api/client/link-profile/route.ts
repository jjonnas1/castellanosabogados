import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });

  const token = authHeader.slice('Bearer '.length);
  const { data: userData, error: userError } = await getSupabaseServer().auth.getUser(token);
  if (userError || !userData.user?.email) return NextResponse.json({ ok: false, error: 'Sesión inválida' }, { status: 401 });

  const email = userData.user.email.toLowerCase();

  const { data: profile, error: profileError } = await getSupabaseServer()
    .from('client_profiles')
    .select('id,auth_user_id,can_access_portal')
    .eq('email', email)
    .maybeSingle();

  if (profileError || !profile) return NextResponse.json({ ok: true, linked: false });

  if (!profile.auth_user_id) {
    const { error: updateError } = await getSupabaseServer()
      .from('client_profiles')
      .update({ auth_user_id: userData.user.id })
      .eq('id', profile.id);

    if (updateError) return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, linked: true });
}
