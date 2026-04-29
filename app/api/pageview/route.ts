import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const visitor_key      = typeof body?.visitor_key      === 'string' ? body.visitor_key.slice(0, 100)  : null;
    const path             = typeof body?.path             === 'string' ? body.path.slice(0, 500)          : null;
    const raw_duration     = body?.duration_seconds;
    const duration_seconds = typeof raw_duration === 'number' && raw_duration >= 0
      ? Math.round(raw_duration)
      : null;
    const visit_id         = typeof body?.visit_id === 'string' ? body.visit_id : null;

    if (!visitor_key || !path) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = getSupabaseServer({ serviceRole: true });
    await supabase.from('site_page_views').insert({ visitor_key, path, duration_seconds, visit_id });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
