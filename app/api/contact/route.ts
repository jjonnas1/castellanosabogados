import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { contactSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Aquí procesas el email con Resend/Supabase/etc
    // Ejemplo: await sendEmail(validatedData)
    void validatedData

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.errors[0].message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { ok: false, error: 'Error interno' },
      { status: 500 },
    )
  }
}
