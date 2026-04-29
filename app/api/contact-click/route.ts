import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

const VALID_TYPES = new Set(['whatsapp', 'email', 'phone']);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const visitor_key = typeof body?.visitor_key === 'string' ? body.visitor_key.slice(0, 100) : null;
    const type        = typeof body?.type        === 'string' ? body.type                       : null;
    const visit_id    = typeof body?.visit_id    === 'string' ? body.visit_id                   : null;

    if (!visitor_key || !type || !VALID_TYPES.has(type)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = getSupabaseServer({ serviceRole: true });
    await supabase.from('site_contact_clicks').insert({ visitor_key, type, visit_id });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
