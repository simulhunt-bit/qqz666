export default function Pricing({ pricing, contact }) {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Simple Pricing</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">Pick a plan, or chat and we'll customize one</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricing.map((p, i) => (
            <div
              key={i}
              className={`relative bg-papercard border rounded-2xl p-7 flex flex-col gap-4 ${
                p.featured ? 'border-tealc shadow-[0_24px_50px_-24px_rgba(31,158,137,0.4)]' : 'border-line'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 bg-tealc text-white text-[11px] font-mono px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-disp text-lg">{p.name}</h3>
              <div className="font-mono text-[32px]">
                {p.price}
                <span className="text-[13px] text-inksoft"> {p.period}</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-inksoft">
                {p.features.map((f, j) => (
                  <li key={j}>
                    <span className="text-tealdeep font-bold">✓ </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent(`Hi! I'm interested in the ${p.name} plan.`)}`}
                className={`mt-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink w-full text-center ${
                  p.featured ? 'bg-ink text-paper' : 'text-ink'
                }`}
              >
                Chat to customize
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
