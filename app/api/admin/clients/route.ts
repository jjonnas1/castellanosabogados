import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';

type CreateClientBody = {
  full_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  case_reference?: string;
  can_access_portal?: boolean;
};

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));

    if (!adminCheck.ok) {
      return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });
    }

    const body = (await req.json()) as CreateClientBody;

    const full_name = String(body.full_name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const case_reference = String(body.case_reference ?? '').trim();
    const can_access_portal = Boolean(body.can_access_portal ?? false);

    if (can_access_portal && !email) return badRequest('El correo es obligatorio para habilitar acceso al portal');
    if (can_access_portal && password.length < 8) {
      return badRequest('La contraseña debe tener al menos 8 caracteres para habilitar acceso al portal');
    }

    const supabaseAdmin = createSupabaseAdminClient();

    let authUserId: string | null = null;
    if (can_access_portal) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'client', full_name },
      });

      if (authError || !authData.user?.id) {
        return NextResponse.json({ ok: false, error: authError?.message ?? 'No se pudo crear el usuario de acceso' }, { status: 400 });
      }

      authUserId = authData.user.id;
    }

    const { data: clientData, error: clientError } = await supabaseAdmin
      .from('client_profiles')
      .insert({
        auth_user_id: authUserId,
        full_name: full_name || null,
        email: email || null,
        phone: phone || null,
        case_reference: case_reference || null,
        can_access_portal,
      })
      .select('*')
      .single();

    if (clientError) {
      if (authUserId) {
        await supabaseAdmin.auth.admin.deleteUser(authUserId);
      }
      return NextResponse.json({ ok: false, error: clientError.message }, { status: 400 });
    }

    if (authUserId) {
      const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
        id: authUserId,
        email,
        full_name,
        role: 'client',
      });

      if (profileError) {
        await supabaseAdmin.from('client_profiles').delete().eq('id', clientData.id);
        await supabaseAdmin.auth.admin.deleteUser(authUserId);
        return NextResponse.json({ ok: false, error: profileError.message }, { status: 400 });
      }
    }

    return NextResponse.json(
      {
        ok: true,
        data: clientData,
        auth_created: Boolean(authUserId),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
