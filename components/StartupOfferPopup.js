import { useEffect, useState, useCallback } from 'react';

const SESSION_KEY = 'qartibe_startup_popup_dismissed';
const SHOW_DELAY_MS = 5000;

export default function StartupOfferPopup({ offer, contact }) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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

    const openPopup = () => setVisible(true);
    window.addEventListener('startup-offer:open', openPopup);

    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {
      alreadyDismissed = false;
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => {
      window.removeEventListener('startup-offer:open', openPopup);
      clearTimeout(timer);
    };
  }, [offer]);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, close]);

  useEffect(() => {
    if (!visible) {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }
  }, [visible]);

  if (!offer || !visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        className="relative bg-papercard border border-line rounded-[24px] p-6 sm:p-8 max-w-[620px] w-full shadow-[0_30px_80px_-25px_rgba(20,33,61,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-tealdeep via-mango to-tealc" />

        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full border border-line bg-paper text-inksoft hover:border-ink hover:text-ink transition"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap pr-10">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep">{offer.eyebrow}</span>
          {offer.badge && (
            <span className="bg-mango text-ink font-mono text-[11px] px-2.5 py-1 rounded-full font-semibold">
              {offer.badge}
            </span>
          )}
        </div>

        <h2 className="font-disp font-bold text-[22px] sm:text-[28px] mb-3 leading-tight">{offer.title}</h2>
        <p className="text-inksoft text-[14.5px] sm:text-[15px] mb-5 leading-6">{offer.lead}</p>

        {offer.features && offer.features.length > 0 && (
          <ul className="flex flex-col gap-2.5 mb-6 rounded-2xl border border-line bg-paper/70 p-4">
            {offer.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-inksoft">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-tealc flex-shrink-0"></span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-6">
          <div>
            <label className="text-xs font-mono text-inksoft uppercase tracking-wide">Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-1 px-3.5 py-3 border border-line rounded-xl bg-paper text-sm text-ink focus:border-tealdeep focus:outline-none focus:ring-2 focus:ring-tealdeep/20"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-inksoft uppercase tracking-wide">Email</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 px-3.5 py-3 border border-line rounded-xl bg-paper text-sm text-ink focus:border-tealdeep focus:outline-none focus:ring-2 focus:ring-tealdeep/20"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-inksoft uppercase tracking-wide">What do you want to claim?</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full mt-1 px-3.5 py-3 border border-line rounded-xl bg-paper text-sm text-ink min-h-[110px] focus:border-tealdeep focus:outline-none focus:ring-2 focus:ring-tealdeep/20"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink bg-ink text-paper hover:-translate-y-0.5 transition"
          >
            Claim offer
          </button>
          {submitted && (
            <p className="text-[13px] text-tealdeep rounded-xl bg-mango/20 px-3 py-2">Thanks! We’ll reach out shortly with your free offer details.</p>
          )}
        </form>

        {contact?.whatsappLink && (
          <a
            href={contact.whatsappLink}
            className="inline-flex items-center gap-2 mt-2 text-[14px] text-tealdeep hover:text-ink transition"
          >
            Or message us on WhatsApp instead
          </a>
        )}
      </div>
    </div>
  );
}
