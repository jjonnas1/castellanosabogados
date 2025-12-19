import { NextRequest, NextResponse } from "next/server";
import { badRequest, checkRateLimit, contactSchema, rateLimited, sendContactEmail } from "../_lib/contact-utils";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req)) return rateLimited();

  const json = await req.json().catch(() => null);
  if (!json) return badRequest("Solicitud inválida");
  if (json.honeypot) return badRequest("Bloqueado");

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return badRequest("Datos incompletos");
  }

  const result = await sendContactEmail(parsed.data, "empresas");
  if (!result.sent) {
    return NextResponse.json({ ok: true, warning: result.reason ?? "queued" });
  }

  return NextResponse.json({ ok: true });
}
