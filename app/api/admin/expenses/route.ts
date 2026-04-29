import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';

const VALID_CATEGORIES = ['Publicidad','Software/IA','Movilidad','Gestoría','Viáticos','Seguridad Social','Otro'];
const VALID_CURRENCIES  = ['COP','USD','EUR'];

export async function GET(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('firm_expenses')
      .select('*')
      .order('expense_date', { ascending: false })
      .order('created_at',   { ascending: false });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req.headers.get('authorization'));
    if (!adminCheck.ok) return NextResponse.json({ ok: false, error: adminCheck.error }, { status: adminCheck.status });

    const body = await req.json();

    const expenseDate  = String(body.expense_date  ?? '').trim();
    const category     = String(body.category       ?? '').trim();
    const description  = String(body.description    ?? '').trim();
    const amount       = Number(body.amount);
    const currency     = String(body.currency       ?? 'COP').trim();
    const exchangeRate = Number(body.exchange_rate  ?? 1);

    if (!expenseDate || !category || !description || isNaN(amount) || amount <= 0)
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    if (!VALID_CATEGORIES.includes(category))
      return NextResponse.json({ ok: false, error: 'Categoría inválida' }, { status: 400 });
    if (!VALID_CURRENCIES.includes(currency))
      return NextResponse.json({ ok: false, error: 'Moneda inválida' }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('firm_expenses')
      .insert({
        expense_date:        expenseDate,
        category,
        description,
        vendor_name:         String(body.vendor_name         ?? '').trim() || null,
        vendor_country:      String(body.vendor_country      ?? 'Colombia').trim(),
        vendor_tax_id:       String(body.vendor_tax_id       ?? '').trim() || null,
        amount,
        currency,
        exchange_rate:       exchangeRate,
        is_deductible:       Boolean(body.is_deductible ?? true),
        payment_method:      String(body.payment_method ?? 'Transferencia').trim(),
        evidence_url:        String(body.evidence_url         ?? '').trim() || null,
        related_client_name: String(body.related_client_name ?? '').trim() || null,
        related_client_id:   String(body.related_client_id   ?? '').trim() || null,
        notes:               String(body.notes               ?? '').trim() || null,
        created_by:          adminCheck.user.id,
      })
      .select('*')
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Error interno' }, { status: 500 });
  }
}
