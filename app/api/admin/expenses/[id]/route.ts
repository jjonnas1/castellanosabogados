import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

const VALID_CATEGORIES = ['Publicidad','Software/IA','Movilidad','Gestoría','Viáticos','Seguridad Social','Otro'];
const VALID_CURRENCIES  = ['COP','USD','EUR'];

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });

    const { id }   = await params;
    const body     = await req.json();
    const category = String(body.category ?? '').trim();
    const currency = String(body.currency ?? 'COP').trim();
    const amount   = Number(body.amount);

    if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ ok: false, error: 'Categoría inválida' }, { status: 400 });
    if (!VALID_CURRENCIES.includes(currency))  return NextResponse.json({ ok: false, error: 'Moneda inválida' },    { status: 400 });
    if (isNaN(amount) || amount <= 0)          return NextResponse.json({ ok: false, error: 'Monto inválido' },     { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('firm_expenses')
      .update({
        expense_date:        String(body.expense_date ?? '').trim(),
        category,
        description:         String(body.description ?? '').trim(),
        vendor_name:         String(body.vendor_name         ?? '').trim() || null,
        vendor_country:      String(body.vendor_country      ?? 'Colombia').trim(),
        vendor_tax_id:       String(body.vendor_tax_id       ?? '').trim() || null,
        amount,
        currency,
        exchange_rate:       Number(body.exchange_rate ?? 1),
        is_deductible:       Boolean(body.is_deductible ?? true),
        payment_method:      String(body.payment_method ?? 'Transferencia').trim(),
        evidence_url:        String(body.evidence_url         ?? '').trim() || null,
        related_client_name: String(body.related_client_name ?? '').trim() || null,
        related_client_id:   String(body.related_client_id   ?? '').trim() || null,
        notes:               String(body.notes ?? '').trim() || null,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });

    const { id }   = await params;
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from('firm_expenses').delete().eq('id', id);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Error interno' }, { status: 500 });
  }
}
