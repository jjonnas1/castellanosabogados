import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase.from('whatsapp_leads').insert({
    nombre:   parsed.data.nombre,
    telefono: parsed.data.telefono,
    wa_url:   parsed.data.wa_url ?? null,
  });

  if (error) {
    console.error('[leads/whatsapp]', error.message);
    return NextResponse.json({ error: 'No se pudo registrar el lead' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
