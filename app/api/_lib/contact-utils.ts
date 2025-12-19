import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rateStore = new Map<string, { count: number; expires: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  phone: z.string().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  honeypot: z.string().optional(),
});

function clientIp(req: NextRequest) {
  const header = req.headers.get("x-forwarded-for");
  if (header) return header.split(",")[0]?.trim();
  // @ts-expect-error: ip is available on Vercel edge/runtime
  return req.ip ?? "unknown";
}

export function checkRateLimit(req: NextRequest) {
  const ip = clientIp(req);
  const now = Date.now();
  const entry = rateStore.get(ip);
  if (!entry || entry.expires < now) {
    rateStore.set(ip, { count: 1, expires: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  rateStore.set(ip, entry);
  return true;
}

export async function sendContactEmail(data: z.infer<typeof contactSchema>, channel: "general" | "empresas") {
  const body = {
    channel,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: data.role,
    company: data.company,
    message: data.message,
  };

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { sent: false, reason: "missing-key", body };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "noreply@example.com",
        to: [process.env.CONTACT_TO ?? "contacto@example.com"],
        subject: channel === "empresas" ? "Contacto Penal Empresas" : "Contacto General",
        text: JSON.stringify(body, null, 2),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { sent: false, reason: text };
    }
    return { sent: true };
  } catch (err: any) {
    return { sent: false, reason: err?.message };
  }
}

export function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export function rateLimited() {
  return NextResponse.json({ ok: false, error: "Demasiados intentos. Intenta en un minuto." }, { status: 429 });
}
