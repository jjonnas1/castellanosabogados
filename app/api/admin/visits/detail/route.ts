import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';

const WINDOW_MS = 4 * 60 * 60 * 1000; // 4 h — same TTL as session

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const url         = new URL(req.url);
  const visitor_key = url.searchParams.get('visitor_key');
  const since       = url.searchParams.get('since'); // visited_at ISO of the parent visit

  if (!visitor_key) return NextResponse.json({ ok: false, error: 'visitor_key requerido' }, { status: 400 });

  const supabase = getSupabaseServer({ serviceRole: true });

  const until = since
    ? new Date(new Date(since).getTime() + WINDOW_MS).toISOString()
    : null;

  const [{ data: pageViews }, { data: contactClicks }] = await Promise.all([
    supabase
      .from('site_page_views')
      .select('id, path, duration_seconds, entered_at')
      .eq('visitor_key', visitor_key)
      .gte('entered_at', since ?? '1970-01-01')
      .lte('entered_at', until ?? new Date().toISOString())
      .order('entered_at', { ascending: true }),

    supabase
      .from('site_contact_clicks')
      .select('id, type, occurred_at')
      .eq('visitor_key', visitor_key)
      .gte('occurred_at', since ?? '1970-01-01')
      .lte('occurred_at', until ?? new Date().toISOString())
      .order('occurred_at', { ascending: true }),
  ]);

  return NextResponse.json({ ok: true, page_views: pageViews ?? [], contact_clicks: contactClicks ?? [] });
}
