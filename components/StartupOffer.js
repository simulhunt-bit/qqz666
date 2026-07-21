export default function StartupOffer({ offer, contact }) {
  if (!offer) return null;

  return (
    <section id="startup-offer" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="bg-papercard border border-line rounded-2xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-8 items-center shadow-[0_24px_60px_-20px_rgba(20,33,61,0.18)]">
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep">{offer.eyebrow}</span>
              {offer.badge && (
                <span className="bg-mango text-ink font-mono text-[11px] px-2.5 py-1 rounded-full font-semibold">
                  {offer.badge}
                </span>
              )}
            </div>
            <h2 className="font-disp font-bold text-[26px] sm:text-[34px] mb-3">{offer.title}</h2>
            <p className="text-inksoft text-[15px] mb-6 max-w-[480px]">{offer.lead}</p>
            <a
              href={`${contact.whatsappLink}?text=${encodeURIComponent(offer.waText)}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink bg-ink text-paper hover:-translate-y-0.5 transition"
            >
              {offer.ctaText}
            </a>
          </div>

          {offer.features && offer.features.length > 0 && (
            <ul className="flex flex-col gap-3">
              {offer.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-inksoft">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-tealc flex-shrink-0"></span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
