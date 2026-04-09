import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) {
    return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });
  }

  const url = new URL(req.url);
  const limit  = Math.min(parseInt(url.searchParams.get('limit')  ?? '100'), 500);
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0'),   0);
  const path   = url.searchParams.get('path') ?? null;
  const from   = url.searchParams.get('from') ?? null;
  const to     = url.searchParams.get('to')   ?? null;
  const noAdmin = url.searchParams.get('no_admin') === '1';

  const supabase = getSupabaseServer({ serviceRole: true });

  let query = supabase
    .from('site_visits')
    .select('*', { count: 'exact' })
    .order('visited_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (path)    query = query.ilike('path', `%${path}%`);
  if (from)    query = query.gte('visited_at', from);
  if (to)      query = query.lte('visited_at', to);
  if (noAdmin) query = query.eq('is_admin_visit', false);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Contadores rápidos (sin filtros de la query principal)
  const now        = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart  = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: todayCount }, { count: weekCount }, { count: totalCount }] = await Promise.all([
    supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('visited_at', todayStart),
    supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('visited_at', weekStart),
    supabase.from('site_visits').select('*', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    ok: true,
    visits:  data    ?? [],
    count:   count   ?? 0,
    today:   todayCount ?? 0,
    week:    weekCount  ?? 0,
    total:   totalCount ?? 0,
  });
}
