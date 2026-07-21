import { useEffect, useState, useCallback } from 'react';

const SESSION_KEY = 'qartibe_startup_popup_dismissed';
const SHOW_DELAY_MS = 5000;

export default function StartupOfferPopup({ offer, contact }) {
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {
      // sessionStorage unavailable (e.g. privacy mode); fail silently
    }
  }, []);

  useEffect(() => {
    if (!offer) return;

    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {
      alreadyDismissed = false;
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [offer]);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, close]);

  if (!offer || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(20,33,61,0.45)' }}
      role="dialog"
      aria-modal="true"
      aria-label={offer.title}
      onClick={close}
    >
      <div
        className="relative bg-papercard border border-line rounded-2xl p-7 sm:p-8 max-w-[440px] w-full shadow-[0_24px_60px_-20px_rgba(20,33,61,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-line text-inksoft hover:border-ink hover:text-ink transition"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap pr-8">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep">{offer.eyebrow}</span>
          {offer.badge && (
            <span className="bg-mango text-ink font-mono text-[11px] px-2.5 py-1 rounded-full font-semibold">
              {offer.badge}
            </span>
          )}
        </div>

        <h2 className="font-disp font-bold text-[22px] sm:text-[26px] mb-3">{offer.title}</h2>
        <p className="text-inksoft text-[14.5px] mb-5">{offer.lead}</p>

        {offer.features && offer.features.length > 0 && (
          <ul className="flex flex-col gap-2 mb-6">
            {offer.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-inksoft">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-tealc flex-shrink-0"></span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <a
          href={`${contact.whatsappLink}?text=${encodeURIComponent(offer.waText)}`}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink bg-ink text-paper hover:-translate-y-0.5 transition w-full sm:w-auto justify-center"
        >
          {offer.ctaText}
        </a>
      </div>
    </div>
  );
}
