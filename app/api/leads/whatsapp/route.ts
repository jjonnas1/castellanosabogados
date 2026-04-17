import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendLeadNotificationEmail } from '@/lib/resend';

const schema = z.object({
  nombre:   z.string().min(2).max(100),
  telefono: z.string().min(6).max(25),
  wa_url:   z.string().max(600).optional(),
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

  const { nombre, telefono, wa_url } = parsed.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Guardar en Supabase y enviar correo en paralelo
  const [dbResult, emailResult] = await Promise.allSettled([
    supabase.from('whatsapp_leads').insert({
      nombre,
      telefono,
      wa_url: wa_url ?? null,
    }),
    sendLeadNotificationEmail({ nombre, telefono, wa_url }),
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
