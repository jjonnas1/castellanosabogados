import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';

type CreateClientBody = {
  full_name?: string;
  email?: string;
  phone?: string;
  case_reference?: string;
  can_access_portal?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin();

    if (!adminCheck.ok) {
      return NextResponse.json(
        { ok: false, error: adminCheck.error },
        { status: adminCheck.status }
      );
    }

    const body = (await req.json()) as CreateClientBody;

    const full_name = String(body.full_name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const phone = String(body.phone ?? '').trim();
    const case_reference = String(body.case_reference ?? '').trim();
    const can_access_portal = Boolean(body.can_access_portal ?? false);

    if (!full_name || !email) {
      return NextResponse.json(
        { ok: false, error: 'Nombre y correo son obligatorios' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();

    const { data, error } = await supabaseAdmin
      .from('client_profiles')
      .insert({
        full_name,
        email,
        phone: phone || null,
        case_reference: case_reference || null,
        can_access_portal,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
