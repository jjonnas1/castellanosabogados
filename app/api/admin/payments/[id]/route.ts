import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) {
      return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });
    }

    const { id } = await params;
    const body = await req.json();

    const paymentDate   = String(body.payment_date   ?? '').trim();
    const clientName    = String(body.client_name    ?? '').trim();
    const concept       = String(body.concept         ?? '').trim();
    const serviceArea   = String(body.service_area    ?? '').trim();
    const paymentMethod = String(body.payment_method  ?? '').trim();
    const status        = String(body.status          ?? 'Pagado').trim();
    const amount        = Number(body.amount);

    if (!paymentDate || !clientName || !concept || !serviceArea || !paymentMethod || isNaN(amount) || amount < 0) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const VALID_STATUSES = ['Pagado', 'Parcial', 'Pendiente'];
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ ok: false, error: 'Estado inválido' }, { status: 400 });
    }

    const totalAmount    = body.total_amount ? Number(body.total_amount) : null;
    const paymentDueDate = String(body.payment_due_date ?? '').trim() || null;
    const clientProfileId = String(body.client_profile_id ?? '').trim() || null;

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('firm_payments')
      .update({
        payment_date:      paymentDate,
        client_name:       clientName,
        client_email:      String(body.client_email ?? '').trim() || null,
        concept,
        service_area:      serviceArea,
        amount,
        payment_method:    paymentMethod,
        status,
        notes:             String(body.notes ?? '').trim() || null,
        client_profile_id: clientProfileId,
        total_amount:      totalAmount,
        payment_due_date:  paymentDueDate,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) {
      return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });
    }

    const { id } = await params;
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from('firm_payments').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 },
    );
  }
}
