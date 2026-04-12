/**
 * Google Calendar API utilities using Service Account JWT.
 * Scope: https://www.googleapis.com/auth/calendar (full read/write)
 * Calendar ID: jonatancastellanosabogado@gmail.com
 */

import { SignJWT, importPKCS8 } from 'jose';

const CALENDAR_ID = 'jonatancastellanosabogado@gmail.com';
const SCOPE = 'https://www.googleapis.com/auth/calendar';

// ─── Auth ──────────────────────────────────────────────────────────────────────

export async function getGoogleAccessToken(): Promise<string> {
  const privateKeyPem = (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');
  const clientEmail   = process.env.GOOGLE_CLIENT_EMAIL ?? '';

  if (!privateKeyPem || !clientEmail) {
    throw new Error('Faltan GOOGLE_PRIVATE_KEY o GOOGLE_CLIENT_EMAIL en las variables de entorno.');
  }

  const privateKey = await importPKCS8(privateKeyPem, 'RS256');
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({ scope: SCOPE })
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

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google OAuth error: ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ─── Event shapes ──────────────────────────────────────────────────────────────

export interface GCalEventInput {
  title:       string;
  description: string | null;
  startAt:     string; // ISO string (with TZ)
  endAt:       string; // ISO string (with TZ)
}

export interface GCalEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime: string; timeZone: string };
  end:   { dateTime: string; timeZone: string };
}

// ─── CRUD ──────────────────────────────────────────────────────────────────────

export async function createCalendarEvent(
  input: GCalEventInput,
  accessToken?: string
): Promise<GCalEvent> {
  const token = accessToken ?? (await getGoogleAccessToken());

  const body = {
    summary:     input.title,
    description: input.description ?? '',
    start: { dateTime: input.startAt, timeZone: 'America/Bogota' },
    end:   { dateTime: input.endAt,   timeZone: 'America/Bogota' },
  };

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
    {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GCal createEvent failed: ${text}`);
  }

  return res.json() as Promise<GCalEvent>;
}

export async function updateCalendarEvent(
  googleEventId: string,
  input: Partial<GCalEventInput>,
  accessToken?: string
): Promise<GCalEvent> {
  const token = accessToken ?? (await getGoogleAccessToken());

  const body: Record<string, unknown> = {};
  if (input.title       !== undefined) body.summary     = input.title;
  if (input.description !== undefined) body.description = input.description ?? '';
  if (input.startAt     !== undefined) body.start = { dateTime: input.startAt, timeZone: 'America/Bogota' };
  if (input.endAt       !== undefined) body.end   = { dateTime: input.endAt,   timeZone: 'America/Bogota' };

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${googleEventId}`,
    {
      method:  'PATCH',
      headers: {
        Authorization:  `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GCal updateEvent failed: ${text}`);
  }

  return res.json() as Promise<GCalEvent>;
}

export async function deleteCalendarEvent(
  googleEventId: string,
  accessToken?: string
): Promise<void> {
  const token = accessToken ?? (await getGoogleAccessToken());

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${googleEventId}`,
    {
      method:  'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // 204 = success, 410 = already deleted — both acceptable
  if (!res.ok && res.status !== 410) {
    const text = await res.text();
    throw new Error(`GCal deleteEvent failed: ${text}`);
  }
}

// ─── Sync pull (for /api/sync-calendar) ───────────────────────────────────────

export interface GCalEventRaw {
  id: string;
  summary?: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end:   { dateTime?: string; date?: string };
}

export async function fetchUpcomingEvents(
  accessToken?: string,
  daysAhead = 90
): Promise<GCalEventRaw[]> {
  const token   = accessToken ?? (await getGoogleAccessToken());
  const timeMin = new Date().toISOString();
  const timeMax = new Date(Date.now() + daysAhead * 86400_000).toISOString();

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events` +
    `?timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime&maxResults=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GCal listEvents failed: ${text}`);
  }

  const data = await res.json();
  return (data.items ?? []) as GCalEventRaw[];
}
