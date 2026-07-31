import { useMemo, useState } from 'react';

function buildWhatsAppLink(baseLink, text) {
  const safeText = text || 'Hi! I need help.';
  const encodedText = encodeURIComponent(safeText);

  if (!baseLink) {
    return `https://wa.me/?text=${encodedText}`;
  }

  try {
    const url = new URL(baseLink);
    url.searchParams.set('text', safeText);
    return url.toString();
  } catch (e) {
    const separator = baseLink.includes('?') ? '&' : '?';
    return `${baseLink}${separator}text=${encodedText}`;
  }
}

export default function MobileWhatsAppAssistant({ contact, services = [], faq = [] }) {
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    const serviceOptions = (services || []).map((service) => ({
      label: `I need help with ${service.title}`,
      message: service.waText || `Hi! I’m interested in your ${service.title} service.`,
    }));

    const commonOptions = [
      {
        label: 'I need help choosing the right service',
        message: "Hi! I'm not sure which service is best for my business. Can you recommend the right option?",
      },
      {
        label: 'How much do your services cost?',
        message: 'Hi! I’d like to know about your pricing and available packages.',
      },
      {
        label: 'How quickly can you get started?',
        message: 'Hi! I’d like to know how quickly you can start working on my project.',
      },
      ...(faq || []).slice(0, 2).map((item) => ({
        label: item.q,
        message: `Hi! I have a question about: ${item.q}`,
      })),
    ];

    return [...serviceOptions, ...commonOptions];
  }, [services, faq]);

  return (
    <div className="fixed bottom-3 right-3 z-[120] sm:bottom-4 sm:right-4">
      <div className="relative flex flex-col items-end gap-2 sm:gap-2.5">
        <div className="relative mr-1 sm:mr-1.5">
          <span className="inline-flex items-center rounded-full border border-line bg-paper/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-tealdeep shadow-sm sm:text-[11px]">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-tealdeep animate-pulse" />
            Need Help
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-tealdeep/20 blur-xl" />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open WhatsApp assistant"
            className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full border border-line bg-gradient-to-br from-paper to-[#f6f8fb] p-1 shadow-[0_18px_45px_-20px_rgba(20,33,61,0.45)] transition hover:-translate-y-0.5 sm:h-[68px] sm:w-[68px]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full animate-pulse [animation-duration:3s] bg-tealdeep/10" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-line/70 bg-paper">
              <img src="/logo.png" alt="Qartibe logo" className="relative h-9 w-9 object-contain sm:h-10 sm:w-10" />
            </div>
          </button>
        </div>

        {open && (
          <div className="absolute bottom-[76px] right-0 mt-3 w-[92vw] max-w-[340px] rounded-[22px] border border-line bg-papercard p-3 shadow-[0_24px_60px_-20px_rgba(20,33,61,0.35)] sm:bottom-[88px] sm:right-0">
            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tealdeep">Quick help</p>
                <p className="font-disp text-sm font-semibold text-ink">Pick a question</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper text-inksoft transition hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="flex max-h-[62vh] flex-col gap-2 overflow-auto pr-1 sm:max-h-[58vh]">
              {options.map((option, index) => (
                <a
                  key={`${option.label}-${index}`}
                  href={buildWhatsAppLink(contact?.whatsappLink, option.message)}
                  className="rounded-xl border border-line bg-paper px-3 py-2.5 text-left transition hover:border-tealdeep hover:bg-paper/90"
                >
                  <span className="block text-[13px] font-semibold text-ink">{option.label}</span>
                  <span className="mt-0.5 block text-[11.5px] text-inksoft">Open WhatsApp and send this</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
