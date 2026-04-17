// lib/resend.ts
import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
const resend = key ? new Resend(key) : null;

/**
 * Envía el correo del formulario de contacto.
 * - `to`: correo donde recibes los mensajes.
 * - `from`: cámbialo cuando verifiques tu dominio en Resend.
 */
export async function sendContactEmail(params: {
  name?: string;
  email: string;
  message: string;
  subject?: string;
}) {
  if (!resend) {
    throw new Error("Falta la variable de entorno RESEND_API_KEY en Vercel.");
  }

  const { name = "Sin nombre", email, message, subject } = params;

  return await resend.emails.send({
    from: "Castellanos Abogados <onboarding@resend.dev>",
    to: ["jonatancastellanosabogado@gmail.com"],
    subject: subject ?? `Nuevo contacto: ${name}`,
    reply_to: email,
    html: `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial">
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap; margin:0">${escapeHtml(message)}</pre>
      </div>
    `,
  });
}

/**
 * Notificación inmediata cuando entra un lead del modal de WhatsApp.
 * Se envía a ambos correos del abogado.
 */
export async function sendLeadNotificationEmail(params: {
  nombre: string;
  telefono: string;
  wa_url?: string | null;
}) {
  if (!resend) {
    throw new Error("Falta la variable de entorno RESEND_API_KEY en Vercel.");
  }

  const { nombre, telefono, wa_url } = params;
  const now = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const waLink = wa_url
    ? `<a href="${escapeHtml(wa_url)}" style="color:#25D366;font-weight:600;">Abrir WhatsApp con este cliente</a>`
    : '';

  return await resend.emails.send({
    from: 'Castellanos Abogados <onboarding@resend.dev>',
    to: ['jonatancastellanosabogado@gmail.com'],
    subject: `🟢 Nuevo lead: ${escapeHtml(nombre)} — ${escapeHtml(telefono)}`,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;max-width:480px;margin:0 auto;padding:32px 24px;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <div style="width:12px;height:12px;border-radius:50%;background:#25D366;flex-shrink:0;"></div>
          <span style="font-size:13px;font-weight:600;color:#4b5568;letter-spacing:0.05em;text-transform:uppercase;">Nuevo lead · WhatsApp</span>
        </div>

        <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#0d1528;line-height:1.3;">
          ${escapeHtml(nombre)}
        </h1>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:12px 16px;background:#f4f6fb;border-radius:8px 8px 0 0;border-bottom:1px solid #e2e8f0;">
              <span style="font-size:11px;font-weight:600;color:#4b5568;text-transform:uppercase;letter-spacing:0.08em;">Nombre</span><br/>
              <span style="font-size:16px;font-weight:600;color:#0d1528;">${escapeHtml(nombre)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;background:#f4f6fb;border-radius:0 0 8px 8px;">
              <span style="font-size:11px;font-weight:600;color:#4b5568;text-transform:uppercase;letter-spacing:0.08em;">Teléfono</span><br/>
              <span style="font-size:16px;font-weight:600;color:#0d1528;">${escapeHtml(telefono)}</span>
            </td>
          </tr>
        </table>

        ${waLink ? `<div style="margin-bottom:24px;">${waLink}</div>` : ''}

        <p style="margin:0;font-size:12px;color:#a0aec0;">${now} · Hora Colombia</p>
      </div>
    `,
  });
}

// Utilidad simple para evitar HTML injection
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
