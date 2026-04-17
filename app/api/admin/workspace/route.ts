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

async function syncAppointmentToGCal(payload: Record<string, unknown>): Promise<string | null> {
  try {
    const token = await getGoogleAccessToken();
    const event = await createCalendarEvent({
        title: String(payload.title ?? '(Sin título)'),
        description: payload.description ? String(payload.description) : null,
        startAt: String(payload.start_at),
        endAt: String(payload.end_at),
      }, token);
    return event.id;
  } catch (err) {
    console.error('[workspace] GCal error:', (err as Error).message);
    return null;
  }
}

// ─── Route handlers ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Validamos admin de forma simplificada
  const authHeader = req.headers.get('authorization');
  const admin = await requireAdmin(authHeader);
  
  if (!admin.ok) {
    return NextResponse.json({ ok: false, error: "Sesión administrativa inválida o expirada." }, { status: 401 });
  }

  const supabaseServer = getSupabaseServer({ serviceRole: true });

  try {
    // Ejecución paralela para máxima velocidad
    const [clients, updates, appointments, consultations] = await Promise.all([
      supabaseServer.from('client_profiles').select('*').order('created_at', { ascending: false }),
      supabaseServer.from('client_case_updates').select('*').order('created_at', { ascending: false }),
      supabaseServer.from('appointments').select('*').order('start_at', { ascending: true }),
      supabaseServer.from('consultations').select('*').order('created_at', { ascending: false }),
    ]);

    // Verificamos si alguna consulta falló
    if (clients.error) throw clients.error;
    if (updates.error) throw updates.error;
    if (appointments.error) throw appointments.error;
    if (consultations.error) throw consultations.error;

    return NextResponse.json({
      ok: true,
      clients: clients.data ?? [],
      updates: updates.data ?? [],
      appointments: appointments.data ?? [],
      consultations: consultations.data ?? [],
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: "Error en base de datos: " + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.entity || !body.payload) return badRequest('Solicitud incompleta');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);
  let insertPayload = { ...body.payload };

  if (body.entity === 'appointments' && insertPayload.start_at && insertPayload.end_at) {
    const gcalId = await syncAppointmentToGCal(insertPayload);
    if (gcalId) insertPayload.google_event_id = gcalId;
  }

  const { data, error } = await supabaseServer.from(table).insert(insertPayload).select('*').maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.id || !body?.payload) return badRequest('ID o Payload faltante');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);

  const { data, error } = await supabaseServer.from(table).update(body.payload).eq('id', body.id).select('*').maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.id || !body?.entity) return badRequest('Faltan parámetros para eliminar');

  const supabaseServer = getSupabaseServer({ serviceRole: true });
  const table = entityTable(body.entity);

  const { error } = await supabaseServer.from(table).delete().eq('id', body.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
