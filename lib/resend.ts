// lib/resend.ts
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
if (!key) {
  throw new Error('Falta la variable de entorno RESEND_API_KEY en Vercel.');
}

export const resend = new Resend(key);

/**
 * Envía el correo del formulario de contacto.
 * - Cambia `to` al correo donde quieres recibir los mensajes.
 * - Cambia `from` a tu dominio verificado en Resend cuando lo tengas.
 */
export async function sendContactEmail(params: {
  name?: string;
  email: string;
  message: string;
}) {
  const { name = 'Sin nombre', email, message } = params;

  return await resend.emails.send({
    // Cuando verifiques tu dominio en Resend, usa algo como:
    // from: 'Castellanos Abogados <notificaciones@tudominio.com>'
    from: 'Castellanos Abogados <onboarding@resend.dev>',
    to: ['jonatancastellanosabogado@gmail.com'], // 👈 reemplaza por tu correo de destino
    subject: `Nuevo contacto: ${name}`,
    reply_to: email,
    html: `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial">
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      </div>
    `,
  });
}

// Utilidad simple para evitar HTML injection
function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
