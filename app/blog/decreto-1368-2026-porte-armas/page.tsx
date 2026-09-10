import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { buildWhatsAppUrl } from "@/lib/contactLinks";

const slug = "decreto-1368-2026-porte-armas";
const url = `https://jonatancastellanosabogado.com/blog/${slug}`;
const title =
  "Decreto 1368 de 2026: qué cambia en el porte de armas en Colombia";
const description =
  "Permisos vigentes, autorización especial, tenencia y restricciones: explicamos el Decreto 1368 de 2026 y cuándo conviene revisar su situación jurídica.";
const cover = "/og-image.jpg";
const officialPdf =
  "https://dapre.presidencia.gov.co/normativa/normativa/DECRETO%20No.%201368%20DEL%208%20DE%20SEPTIEMBRE%20DE%202026.pdf";
const contact = buildWhatsAppUrl({
  area: "Decreto 1368 de 2026 · Porte de armas",
  source: `/blog/${slug}`,
  message:
    "Hola, leí la guía del Decreto 1368 de 2026. Quisiera revisar mi situación jurídica.",
});

export const metadata: Metadata = {
  title:
    "Decreto 1368 de 2026: porte de armas y restricciones | Castellanos Abogados",
  description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    publishedTime: "2026-09-09T17:00:00-05:00",
    authors: ["Jonatan Castellanos"],
    images: [
      {
        url: cover,
        width: 1200,
        height: 630,
        alt: "Decreto 1368 de 2026: porte de armas, permisos y restricciones",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description, images: [cover] },
};

const questions = [
  {
    question: "¿El Decreto 1368 autoriza el libre porte de armas?",
    answer:
      "No. Su artículo 2 conserva los requisitos, condiciones, restricciones y controles legales. La medida se refiere a permisos de porte vigentes cuyo ejercicio no esté impedido por otra circunstancia jurídica.",
  },
  {
    question: "¿Un permiso de tenencia permite portar el arma?",
    answer:
      "No. El artículo 6, literal f, excluye expresamente los permisos que autorizan únicamente la tenencia. El decreto no los convierte en permisos de porte.",
  },
  {
    question: "¿Se renueva automáticamente un permiso vencido?",
    answer:
      "No. El artículo 6 excluye los permisos vencidos. El decreto no reemplaza la revalidación ni elimina los requisitos del régimen de permisos.",
  },
  {
    question: "¿Cuándo empieza a regir el decreto?",
    answer:
      "El artículo 9 establece que rige desde el día siguiente a la fecha de su publicación en el Diario Oficial. La fecha de firma, por sí sola, no es la regla de entrada en vigencia.",
  },
  {
    question: "¿La Policía conserva sus facultades de control?",
    answer:
      "Sí. Los artículos 7 y 8 mantienen las competencias de control, verificación, incautación y decomiso de las autoridades competentes, según corresponda.",
  },
];

function Source({ articles }: { articles: string }) {
  return (
    <p className="!text-xs text-muted mt-4">
      <a
        href={officialPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4"
      >
        Fuente: Decreto 1368 de 2026, {articles}.
      </a>
    </p>
  );
}

export default function Decreto1368Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: "2026-09-09T17:00:00-05:00",
    dateModified: "2026-09-09T17:00:00-05:00",
    image: `https://jonatancastellanosabogado.com${cover}`,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: "Jonatan Castellanos",
      url: "https://jonatancastellanosabogado.com/nosotros",
    },
    publisher: {
      "@type": "Organization",
      name: "Castellanos Abogados",
      url: "https://jonatancastellanosabogado.com",
    },
    citation: officialPdf,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  return (
    <main className="motion-public motion-inner motion-article min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <SiteHeader />
      <article className="section-shell">
        <div className="container !max-w-5xl space-y-8">
          <header className="space-y-5">
            <Link
              href="/blog"
              className="text-sm text-muted underline underline-offset-4"
            >
              ← Volver al blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="pill">Actualidad penal</span>
              <time dateTime="2026-09-09">9 de septiembre de 2026</time>
              <span>Por Jonatan Castellanos</span>
            </div>
            <h1 className="!text-[clamp(2.25rem,5vw,3.8rem)] !leading-[1.08]">
              {title}
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              La suspensión general se levanta, pero la situación de cada
              permiso sigue siendo determinante. Estas son las reglas que
              conviene entender antes de asumir que un arma puede portarse
              legalmente.
            </p>
          </header>
          <div className="rounded-lg border border-border bg-surface p-6 md:p-8 space-y-3">
            <p className="text-xs tracking-widest uppercase text-muted">
              La clave en 30 segundos
            </p>
            <p className="text-lg leading-relaxed">
              El Decreto 1368 del 8 de septiembre de 2026 ordena restablecer la
              eficacia de los permisos individuales de <strong>porte</strong>{" "}
              vigentes y sin impedimentos jurídicos. Elimina la autorización
              especial adicional que se exigía por la suspensión general.{" "}
              <strong>
                No establece el libre porte, no renueva permisos vencidos y no
                convierte la tenencia en porte.
              </strong>
            </p>
            <Source articles="arts. 1, 2, 4 y 6" />
          </div>
          <div className="space-y-10 text-[17px] leading-[1.85]">
            <section className="space-y-4">
              <h2 className="!text-3xl">
                1. Qué cambia para quien tiene permiso de porte
              </h2>
              <p>
                El artículo 1 ordena a las autoridades militares adoptar las
                medidas necesarias para levantar la suspensión general en todo
                el territorio nacional. Su efecto se concentra en los permisos
                individuales que están vigentes y cuyo ejercicio no está
                impedido por una suspensión individual, cancelación,
                revocatoria, vencimiento, prohibición u otra circunstancia
                jurídica.
              </p>
              <p>
                Por eso, tener un documento guardado no basta para concluir que
                se está amparado. Es necesario distinguir qué autoriza, si
                conserva su vigencia y qué restricciones afectan a su titular o
                al arma. El decreto mantiene esa revisión individual.
              </p>
              <Source articles="arts. 1, 4 y 5" />
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">
                2. Se elimina una autorización adicional específica
              </h2>
              <p>
                Los titulares de permisos de porte vigentes dejan de necesitar
                la autorización especial adicional derivada de la suspensión
                general. La eliminación se refiere a ese trámite: no sustituye
                el permiso de porte ni elimina los requisitos legales para
                expedirlo, revalidarlo o controlarlo.
              </p>
              <p>
                El propio artículo 2 aclara que la medida no crea nuevos
                derechos ni autoriza el libre porte. Quien carece de permiso no
                queda habilitado por la sola expedición del decreto.
              </p>
              <Source articles="art. 2" />
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">
                3. Tenencia y porte siguen siendo distintos
              </h2>
              <p>
                Uno de los errores más importantes sería interpretar que
                cualquier permiso relacionado con un arma permite llevarla
                consigo. El artículo 6, literal f, excluye expresamente los
                permisos que autorizan exclusivamente la tenencia.
              </p>
              <p>
                En términos prácticos, un permiso de tenencia no se transforma
                en permiso de porte por esta medida. Además, el permiso de porte
                solo ampara el arma o las armas identificadas en él y bajo sus
                condiciones.
              </p>
              <Source articles="arts. 4, 5 y 6, literal f" />
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">
                4. En qué casos el levantamiento no habilita el porte
              </h2>
              <p>
                El artículo 6 mantiene fuera del alcance de la medida los
                siguientes supuestos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Permiso vencido.</li>
                <li>Permiso suspendido individualmente.</li>
                <li>Permiso cancelado o revocado.</li>
                <li>
                  Arma objeto de decomiso o de una medida judicial o
                  administrativa que impida su porte.
                </li>
                <li>Prohibición legal o judicial para portar el arma.</li>
                <li>Permiso que solo autoriza tenencia.</li>
                <li>
                  Cualquier otra circunstancia constitucional o legal que impida
                  legítimamente el porte.
                </li>
              </ul>
              <p>
                El decreto, por tanto, no borra una restricción particular ni
                dispone la devolución automática de un arma. Si existe una
                actuación administrativa o judicial, hay que estudiar sus
                motivos, su estado y las decisiones aplicables.
              </p>
              <Source articles="art. 6" />
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">
                5. Los controles y registros continúan
              </h2>
              <p>
                Las autoridades mantienen sus competencias para verificar
                permisos y ejercer control, inspección, vigilancia, incautación
                y decomiso, según corresponda. También conservan las facultades
                para expedir, revalidar, suspender, cancelar o revocar permisos.
              </p>
              <p>
                El Ministerio de Defensa debe impartir directrices
                administrativas, técnicas y operativas para implementar la
                medida y actualizar los registros. Estos deben permitir
                diferenciar los permisos vigentes de los vencidos o sometidos a
                restricciones. La norma también preserva los sistemas de
                trazabilidad, auditoría y seguimiento.
              </p>
              <Source articles="arts. 3, 7 y 8" />
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">
                6. Qué dispone sobre su entrada en vigencia
              </h2>
              <p>
                El artículo 9 fija la entrada en vigencia desde el día siguiente
                a la fecha de publicación en el Diario Oficial. La fecha de
                firma del documento, por sí sola, no reemplaza esa regla.
              </p>
              <p>
                La misma disposición deroga los Decretos 2362 de 2018 y 1482 de
                2025 y las normas que le sean contrarias. Esto no elimina las
                demás restricciones legales aplicables ni impide que las
                autoridades adopten posteriormente medidas de suspensión dentro
                de sus competencias.
              </p>
              <Source articles="art. 9 y consideraciones sobre las facultades de suspensión" />
            </section>
            <section className="space-y-4 border-l-2 border-amber-600 pl-6">
              <h2 className="!text-3xl">Cuándo conviene revisar su caso</h2>
              <p>
                La revisión jurídica resulta especialmente útil si no tiene
                claro qué modalidad autoriza su permiso, si aparece una
                restricción en los registros, si hubo una incautación o si
                recibió una citación relacionada con el arma. El primer paso es
                identificar el problema concreto y la autoridad que debe
                resolverlo.
              </p>
              <p>
                Para estudiar el asunto pueden resultar relevantes el permiso,
                las decisiones notificadas y las actas del procedimiento.{" "}
                <strong>
                  Para contactarnos no necesita llenar un formulario extenso:
                </strong>{" "}
                puede escribirnos por WhatsApp y explicarnos brevemente qué
                ocurrió. La documentación se revisa después, según lo que exija
                el caso.
              </p>
              <a href={contact} className="btn-primary inline-flex">
                Consultar mi situación por WhatsApp ↗
              </a>
            </section>
            <section className="space-y-4">
              <h2 className="!text-3xl">Preguntas frecuentes</h2>
              {questions.map((q) => (
                <details
                  key={q.question}
                  className="border-b border-border py-4"
                >
                  <summary className="cursor-pointer font-semibold leading-normal">
                    {q.question}
                  </summary>
                  <p className="pt-4 text-muted">{q.answer}</p>
                </details>
              ))}
            </section>
            <section className="space-y-3 text-sm text-muted">
              <h2 className="!text-2xl text-ink">
                Fuentes y alcance de esta guía
              </h2>
              <p>
                El análisis se basa en el texto del Decreto 1368 de 2026,
                contrastado con el registro normativo de Presidencia. Se
                consultaron también el portal del Diario Oficial y la
                información pública sobre su expedición. Corte de revisión: 9 de
                septiembre de 2026.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a
                    href={officialPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Decreto 1368 de 2026: PDF oficial de Presidencia
                  </a>{" "}
                  ·{" "}
                  <a
                    href="/blog/decreto-1368-2026/decreto-1368-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    copia de consulta
                  </a>
                  .
                </li>
                <li>
                  <a
                    href="https://dapre.presidencia.gov.co/normativa/Paginas/decretos-septiembre-2026.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Registro de decretos de septiembre de 2026, Presidencia
                  </a>
                  .
                </li>
                <li>
                  <a
                    href="https://svrpubindc.imprenta.gov.co/diario/index.xhtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Consulta del Diario Oficial, Imprenta Nacional
                  </a>
                  .
                </li>
              </ul>
              <p>
                Esta guía es informativa. La aplicación a una persona depende
                del permiso, las restricciones y las decisiones vigentes en su
                caso.
              </p>
            </section>
          </div>
          <aside className="rounded-lg bg-[#151b28] !text-white p-7 md:p-10 space-y-4">
            <p className="text-xs tracking-widest uppercase text-white/65">
              Castellanos Abogados
            </p>
            <h2 className="!text-3xl !text-white">
              Una noticia general. Una situación jurídica particular.
            </h2>
            <p className="text-white/80">
              Revisamos su situación y le explicamos la ruta jurídica. Atención
              en Pereira, el Eje Cafetero y modalidad virtual.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={contact} className="btn-primary">
                WhatsApp · 314 830 9306
              </a>
              <Link
                href="/servicios/penal-personas"
                className="btn-secondary !text-white !border-white/30"
              >
                Conocer el área penal
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
