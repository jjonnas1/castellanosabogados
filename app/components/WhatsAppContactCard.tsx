import WaIcon from '@/app/components/WaIcon';
import { buildWhatsAppUrl, contactConfig } from '@/lib/contactLinks';
import type { WhatsAppCtaContent } from '@/lib/whatsappCtaContent';

type Props = {
  content: WhatsAppCtaContent;
  source: string;
  closing?: boolean;
};

export default function WhatsAppContactCard({ content, source, closing = false }: Props) {
  const href = buildWhatsAppUrl({
    area: content.area,
    source,
    message: content.message,
  });

  return (
    <aside
      className="relative isolate overflow-hidden rounded-[28px] border border-[#275c43] bg-[#10241d] p-6 text-white shadow-[0_18px_42px_rgba(16,36,29,0.18)] sm:p-8"
      aria-label={`Consultar por WhatsApp sobre ${content.area.toLowerCase()}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#25d366]/20 blur-3xl" aria-hidden />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#92eab3]">
            <span className="h-2 w-2 rounded-full bg-[#25d366]" aria-hidden />
            {content.eyebrow}
          </p>
          <h3 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
            {closing ? content.closingHeadline ?? 'Revisemos su situación concreta' : content.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#d9e8df]">
            {closing ? content.closingDescription ?? content.description : content.description}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-[#10241d] shadow-[0_10px_26px_rgba(37,211,102,0.22)] transition hover:-translate-y-0.5 hover:bg-[#53e386] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] sm:w-auto"
        >
          <WaIcon size={21} />
          Consultar por WhatsApp
          <span aria-hidden>↗</span>
        </a>
      </div>
      <p className="relative mt-5 border-t border-white/15 pt-4 text-xs text-[#b6d1bf]">
        Contacto directo · {contactConfig.whatsappDisplay.replace('+57 ', '')} · {content.coverage ?? 'Pereira y Manizales'}
      </p>
    </aside>
  );
}
