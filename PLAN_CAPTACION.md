# Captación de Castellanos Abogados — noviembre de 2026

Base de trabajo: producción Vercel `dpl_FLCgSArFnJF8QaHEGd3YD86jKq98`, comprobada el 4 de noviembre. Se conserva la programación de los artículos PARD (6 de noviembre, 08:00 Colombia) y divorcio (13 de noviembre, 08:00 Colombia).

## Cambios realizados en la web

- La pulsación de WhatsApp emite `whatsapp_click`; el contacto guardado emite `generate_lead` y la conversión Ads con el UUID devuelto por el servidor como `transaction_id`. El cliente evita doble envío simultáneo y la función de medición deduplica el identificador en la página. No se afirma haber recibido el mensaje de WhatsApp: se mide un registro guardado.
- No se envían nombres, teléfonos ni relato del asunto a Analytics. Se mantienen inactivas las etiquetas provisionales de llamadas y formulario. Queda pendiente revisar la configuración de eventos clave y etiquetas de GTM en las cuentas de Google para comprobar que no haya reglas adicionales que dupliquen conversiones.
- El administrador permite revisar contactos por servicio, origen y período y exportar un resumen agregado. Usa hasta 200 registros cargados; muestra esa limitación. La contratación se marca manualmente y conserva compatibilidad con el estado histórico `convertido`. No certifica contratos ni pagos.
- Se corrigen la clasificación de penal, ejecución de penas, PARD, divorcio, migratorio y traducción; y el enlace de contacto del administrador, que debe dirigirse al teléfono del interesado. El modal público no intercepta enlaces en las rutas privadas de administración y cliente.
- La página de familia incorpora representación en PARD y explica el trabajo profesional asumido. No se sustituyen páginas indexadas por duplicados locales.
- La nueva página `/seguimiento-del-caso` explica novedades registradas por el despacho, documentos compartidos y citas; enlaza el portal y la contratación, sin mostrar expedientes ni datos de clientes.

## Trabajo con datos externos

Windsor.ai se encuentra conectado, pero la única propiedad confirmada de Search Console es `https://castellanosjonatan.com/` (web de idiomas). No corresponde a la firma. No se han usado sus estadísticas para priorizar servicios legales.

Para completar la auditoría se necesita conectar la propiedad de `jonatancastellanosabogado.com`, su propiedad GA4, su cuenta Google Ads y su Perfil de Negocio. No se han cambiado presupuestos, campañas, reseñas o publicaciones en Google.

Una vez disponibles:

1. Comparar los últimos 28 días completos con los 28 anteriores en Search Console: consulta, página, clics, impresiones, CTR y posición. Priorizar asuntos atendidos por la firma con impresiones y potencial de contratación; evitar decisiones basadas solo en búsquedas de marca.
2. Revisar en GA4 y Google Ads que el clic, el contacto guardado y la contratación tengan significados separados; comprobar las conversiones primarias, reglas de GTM, coste por registro y campañas de procedencia. El UUID facilita deduplicación; no sustituye la validación de las etiquetas de la cuenta.
3. Revisar datos, categorías, servicios, fotografías y reseñas reales en el Perfil de Negocio. Preparar cambios concretos antes de modificar la ficha.
4. Relacionar las consultas recibidas con propuestas de honorarios y contrataciones marcadas en el administrador. El porcentaje del informe usa registros, no visitantes ni personas únicas. Los ingresos y rentabilidad necesitan datos de honorarios efectivamente recibidos y costes.

## Ciclo de cuatro semanas

- Semana 1: mejoras de medición implementadas; validación de las cuentas externas pendiente de conexión.
- Semana 2: página de familia y explicación del seguimiento mejoradas. La prioridad definitiva de servicios queda sujeta a datos de búsquedas y consultas, sin afirmar que PARD sea la búsqueda de mayor volumen.
- Semana 3: artículos jurídicos programados y relacionados con la representación de la firma. La distribución en canales externos se prepara con contenido adaptado, sin enviar mensajes ni publicar en cuentas externas por anticipado.
- Semana 4: comparar registros, gestión y contratación por servicio y origen; revisar calidad de consultas y ajustar la siguiente tanda de páginas y artículos.

## Validación

`node scripts/test-acquisition.mjs` verifica la separación de eventos, deduplicación, respuesta de API y compatibilidad de esquema, formulario real con envío simultáneo y reintento, rutas privadas, clasificación y resumen agregado, sin crear contactos ni enviar correos reales. `node scripts/test-blog-publication.mjs` comprueba fechas y visibilidad de las publicaciones. También se ejecutan TypeScript, compilación de producción y comprobaciones HTTP de las páginas públicas y de la protección del administrador.

Referencias técnicas: [IDs de transacción en Google Ads](https://support.google.com/google-ads/answer/6386790?hl=es), [factores de posicionamiento local](https://support.google.com/business/answer/7091?hl=es). No se garantizan posiciones ni aumentos de contratación.
