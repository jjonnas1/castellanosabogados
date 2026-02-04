import { NextRequest, NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let name = "";
    let email = "";
    let message = "";
    let area = "";
    let source = "";
    let subject = "";
    let intent = "";

    if (contentType.includes("application/json")) {
      const payload = await req.json();
      name = String(payload?.name ?? "");
      email = String(payload?.email ?? "");
      message = String(payload?.message ?? "");
      area = String(payload?.area ?? "");
      source = String(payload?.source ?? "");
      subject = String(payload?.subject ?? "");
      intent = String(payload?.intent ?? "");
    } else {
      const data = await req.formData();
      name = String(data.get("name") ?? "");
      email = String(data.get("email") ?? "");
      const reason = String(data.get("reason") ?? "");
      const context = String(data.get("message") ?? "");
      area = String(data.get("area") ?? "");
      source = String(data.get("source") ?? "");
      subject = String(data.get("subject") ?? "");
      intent = String(data.get("intent") ?? "");
      message = [reason ? `Motivo: ${reason}` : "", context]
        .filter(Boolean)
        .join("\n");
    }

    const resolvedArea = area || "Contacto general";
    const resolvedSource = source || "Sitio web";
    const messageWithContext = [
      message,
      "",
      `Área/servicio: ${resolvedArea}`,
      `Origen: ${resolvedSource}`,
      intent ? `Intento: ${intent}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos para enviar el mensaje." },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name,
      email,
      message: messageWithContext,
      subject: subject || `Solicitud de contacto – ${resolvedArea}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "fail" },
      { status: 500 }
    );
  }
}
