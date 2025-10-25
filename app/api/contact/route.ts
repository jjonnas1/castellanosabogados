// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/resend';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Faltan campos obligatorios (email, message).' },
        { status: 400 }
      );
    }

    const result = await sendContactEmail({ name, email, message });
    return NextResponse.json({ ok: true, id: (result as any)?.id ?? null });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Error enviando el correo.' },
      { status: 500 }
    );
  }
}
