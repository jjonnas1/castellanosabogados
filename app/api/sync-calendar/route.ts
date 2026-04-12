import { SignJWT, importPKCS8 } from 'jose';
import { createClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';

// ─── Google Service Account JWT ───────────────────────────────────────────────

async function getGoogleAccessToken(): Promise<string> {
  const privateKeyPem = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
  const clientEmail   = process.env.GOOGLE_CLIENT_EMAIL!;
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';

  const privateKey = await importPKCS8(privateKeyPem, 'RS256');
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({ scope })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience('https://oauth2.googleapis.com/token')
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) throw new Error(`Google OAuth: ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

// ─── Fetch Google Calendar events ─────────────────────────────────────────────

interface GoogleEvent {
  id: string;
  summary?: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end:   { dateTime?: string; date?: string };
}

async function fetchCalendarEvents(accessToken: string): Promise<GoogleEvent[]> {
  const calId   = encodeURIComponent('jonatancastellanosabogado@gmail.com');
  const now     = new Date();
  const timeMin = now.toISOString();
  const timeMax = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(); // +90 days

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${calId}/events` +
    `?timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime&maxResults=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`Calendar API: ${await res.text()}`);
  const data = await res.json();
  return (data.items ?? []) as GoogleEvent[];
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Allow Vercel Cron (CRON_SECRET header) OR authenticated admin session
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  // If CRON_SECRET not configured, trust Vercel's own cron isolation.
  // If configured, require it to match.
  const isCron = !cronSecret || authHeader === `Bearer ${cronSecret}`;

  if (!isCron) {
    const admin = await requireAdmin(authHeader);
    if (!admin.ok) {
      return NextResponse.json({ error: admin.error }, { status: admin.status });
    }
  }

  try {
    const accessToken = await getGoogleAccessToken();
    const events      = await fetchCalendarEvents(accessToken);

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
