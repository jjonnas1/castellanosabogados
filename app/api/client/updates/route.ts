import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, hasServiceRole } from '@/lib/supabase-server';

function unauthorized(error = 'No autorizado') {
  return NextResponse.json({ ok: false, error }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!hasServiceRole()) {
    return NextResponse.json({ ok: false, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return unauthorized();

  const token = authHeader.slice('Bearer '.length);
  const supabaseAdmin = getSupabaseServer({ serviceRole: true });
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

  if (userError || !userData.user?.email) return unauthorized('Sesión inválida');

  const email = userData.user.email.trim().toLowerCase();
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('client_profiles')
    .select('id,auth_user_id,can_access_portal,full_name,email')
    .ilike('email', email)
    .order('can_access_portal', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ ok: false, error: profileError.message }, { status: 500 });
  }

  if (!profile) {
    return NextResponse.json({ ok: true, linked: false, updates: [] });
  }

  if (!profile.auth_user_id) {
    const { error: linkError } = await supabaseAdmin
      .from('client_profiles')
      .update({ auth_user_id: userData.user.id })
      .eq('id', profile.id);

    if (linkError) return NextResponse.json({ ok: false, error: linkError.message }, { status: 500 });
  }

  if (!profile.can_access_portal) {
    return NextResponse.json({ ok: true, linked: true, canAccessPortal: false, updates: [] });
  }

  const { data: updates, error: updatesError } = await supabaseAdmin
    .from('client_case_updates')
    .select('id,title,update_text,status,visible_to_client,created_at')
    .eq('client_profile_id', profile.id)
    .eq('visible_to_client', true)
    .order('created_at', { ascending: false });

  if (updatesError) {
    return NextResponse.json({ ok: false, error: updatesError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    linked: true,
    canAccessPortal: true,
    profile,
    updates: updates ?? [],
  });
}
