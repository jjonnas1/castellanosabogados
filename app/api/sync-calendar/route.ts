import { createClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';
import { getGoogleAccessToken, fetchUpcomingEvents } from '@/lib/google-calendar';

export async function GET(request: NextRequest) {
  // Allow Vercel cron (CRON_SECRET) OR an authenticated admin session
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isCron     = !cronSecret || authHeader === `Bearer ${cronSecret}`;

  if (!isCron) {
    const admin = await requireAdmin(authHeader);
    if (!admin.ok) {
      return NextResponse.json({ error: admin.error }, { status: admin.status });
    }
  }

  try {
    const token  = await getGoogleAccessToken();
    const events = await fetchUpcomingEvents(token);

    const rows = events
      .filter((e) => e.start.dateTime || e.start.date)
      .map((e) => ({
        google_event_id: e.id,
        titulo:          e.summary ?? '(Sin título)',
        inicio:          e.start.dateTime ?? `${e.start.date}T00:00:00-05:00`,
        fin:             e.end.dateTime   ?? `${e.end.date}T23:59:59-05:00`,
        descripcion:     e.description ?? null,
        synced_at:       new Date().toISOString(),
      }));

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (rows.length > 0) {
      const { error } = await supabase
        .from('citas_google')
        .upsert(rows, { onConflict: 'google_event_id' });

      if (error) throw new Error(`Supabase upsert: ${error.message}`);
    }

    return NextResponse.json({ synced: rows.length, ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[sync-calendar]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
