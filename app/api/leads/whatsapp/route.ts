import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendLeadNotificationEmail } from '@/lib/resend';

const schema = z.object({
  nombre:   z.string().min(2).max(100),
  telefono: z.string().min(6).max(25),
  wa_url:   z.string().max(600).optional(),
  source_path: z.string().max(300).optional(),
  link_text: z.string().max(200).optional(),
  service_interest: z.string().max(120).optional(),
  language: z.string().max(12).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const { nombre, telefono, wa_url, source_path, link_text, service_interest, language } = parsed.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const leadPayload = {
    nombre,
    telefono,
    wa_url: wa_url ?? null,
    source_path: source_path ?? null,
    link_text: link_text ?? null,
    service_interest: service_interest ?? null,
    language: language ?? null,
  };

  async function insertLead() {
    const enriched = await supabase.from('whatsapp_leads').insert(leadPayload);
    if (!enriched.error) return enriched;
    // Fallback temporal para proyectos donde la migración aún no se haya aplicado.
    if (/column .* does not exist|schema cache|Could not find/i.test(enriched.error.message)) {
      return supabase.from('whatsapp_leads').insert({ nombre, telefono, wa_url: wa_url ?? null });
    }
    return enriched;
  }

  // Guardar en Supabase y enviar correo en paralelo
  const [dbResult, emailResult] = await Promise.allSettled([
    insertLead(),
    sendLeadNotificationEmail({ nombre, telefono, wa_url, source_path, link_text, service_interest, language }),
  ]);

  // El error de DB es crítico — lo devolvemos
  if (dbResult.status === 'rejected' || dbResult.value?.error != null) {
    const msg = dbResult.status === 'rejected'
      ? dbResult.reason?.message
      : dbResult.value?.error?.message;
    console.error('[leads/whatsapp] DB error:', msg);
    return NextResponse.json({ error: 'No se pudo registrar el lead' }, { status: 500 });
  }

  // El error de correo no bloquea al usuario, solo lo loggeamos
  if (emailResult.status === 'rejected') {
    console.error('[leads/whatsapp] Email error:', emailResult.reason?.message);
  }

  return NextResponse.json({ ok: true });
}
