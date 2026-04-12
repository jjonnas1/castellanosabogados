import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';
import {
  getGoogleAccessToken,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '@/lib/google-calendar';

type Entity = 'clients' | 'updates' | 'appointments' | 'consultations';

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

function entityTable(entity: Entity) {
  if (entity === 'clients')       return 'client_profiles';
  if (entity === 'updates')       return 'client_case_updates';
  if (entity === 'consultations') return 'consultations';
  return 'appointments';
}

// ─── Google Calendar helpers ───────────────────────────────────────────────────

async function syncAppointmentToGCal(
  payload: Record<string, unknown>
): Promise<string | null> {
  try {
    const token  = await getGoogleAccessToken();
    const event  = await createCalendarEvent(
      {
        title:       String(payload.title ?? '(Sin título)'),
        description: payload.description ? String(payload.description) : null,
        startAt:     String(payload.start_at),
        endAt:       String(payload.end_at),
      },
      token
    );
    return event.id;
  } catch (err) {
    console.error('[workspace] GCal createEvent failed (non-fatal):', (err as Error).message);
    return null;
  }
}

async function updateAppointmentInGCal(
  googleEventId: string,
  payload: Record<string, unknown>
): Promise<void> {
  try {
    const token = await getGoogleAccessToken();
    await updateCalendarEvent(
      googleEventId,
      {
        title:       payload.title       !== undefined ? String(payload.title)       : undefined,
        description: payload.description !== undefined ? String(payload.description ?? '') : undefined,
        startAt:     payload.start_at    !== undefined ? String(payload.start_at)    : undefined,
        endAt:       payload.end_at      !== undefined ? String(payload.end_at)      : undefined,
      },
      token
    );
  } catch (err) {
    console.error('[workspace] GCal updateEvent failed (non-fatal):', (err as Error).message);
  }
}

async function deleteAppointmentFromGCal(googleEventId: string): Promise<void> {
  try {
    const token = await getGoogleAccessToken();
    await deleteCalendarEvent(googleEventId, token);
  } catch (err) {
    console.error('[workspace] GCal deleteEvent failed (non-fatal):', (err as Error).message);
  }
}

// ─── Route handlers ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const supabaseServer = getSupabaseServer({ serviceRole: true });

  const [clients, updates, appointments, consultations] = await Promise.all([
    supabaseServer.from('client_profiles').select('*').order('created_at', { ascending: false }),
    supabaseServer.from('client_case_updates').select('*').order('created_at', { ascending: false }),
    supabaseServer.from('appointments').select('*').order('start_at', { ascending: true }),
    supabaseServer.from('consultations').select('*').order('created_at', { ascending: false }),
  ]);

  const error = clients.error ?? updates.error ?? appointments.error ?? consultations.error;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    clients:       clients.data       ?? [],
    updates:       updates.data       ?? [],
    appointments:  appointments.data  ?? [],
    consultations: consultations.data ?? [],
  });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = (await req.json().catch(() => null)) as {
    entity?:  Entity;
    payload?: Record<string, unknown>;
  } | null;
  if (!body?.entity || !body.payload) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);
  let insertPayload = { ...body.payload };

  // For appointments: create in Google Calendar first, then save google_event_id
  if (body.entity === 'appointments' && insertPayload.start_at && insertPayload.end_at) {
    const gcalId = await syncAppointmentToGCal(insertPayload);
    if (gcalId) insertPayload.google_event_id = gcalId;
  }

  const { data, error } = await supabaseServer
    .from(table)
    .insert(insertPayload)
    .select('*')
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = (await req.json().catch(() => null)) as {
    entity?:  Entity;
    id?:      string;
    payload?: Record<string, unknown>;
  } | null;
  if (!body?.entity || !body?.id || !body.payload) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);

  // For appointments: sync update to GCal if it has a google_event_id
  if (body.entity === 'appointments') {
    const { data: existing } = await supabaseServer
      .from('appointments')
      .select('google_event_id')
      .eq('id', body.id)
      .maybeSingle();

    if (existing?.google_event_id) {
      await updateAppointmentInGCal(existing.google_event_id, body.payload);
    }
  }

  const { data, error } = await supabaseServer
    .from(table)
    .update(body.payload)
    .eq('id', body.id)
    .select('*')
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = (await req.json().catch(() => null)) as {
    entity?: Entity;
    id?:     string;
  } | null;
  if (!body?.entity || !body?.id) return badRequest('Solicitud inválida');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);

  // For appointments: delete from GCal first
  if (body.entity === 'appointments') {
    const { data: existing } = await supabaseServer
      .from('appointments')
      .select('google_event_id')
      .eq('id', body.id)
      .maybeSingle();

    if (existing?.google_event_id) {
      await deleteAppointmentFromGCal(existing.google_event_id);
    }
  }

  const { error } = await supabaseServer.from(table).delete().eq('id', body.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
