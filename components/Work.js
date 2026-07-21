const GRADIENTS = [
  'linear-gradient(135deg,#1F9E89 0%,#14213D 100%)',
  'linear-gradient(135deg,#F2A93B 0%,#14213D 100%)',
  'linear-gradient(135deg,#1F9E89 0%,#14213D 100%)',
];

export default function Work({ caseStudies }) {
  return (
    <section id="work" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Our Work</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">Case studies from real Bangladeshi businesses</h2>
          <p className="text-inksoft mt-3">Placeholder results below. Swap in your real client metrics and photos.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {caseStudies.map((c, i) => (
            <div key={i} className="bg-papercard border border-line rounded-2xl overflow-hidden flex flex-col">
              <div
                className="aspect-[4/3] relative"
                style={!c.image ? { background: GRADIENTS[i % GRADIENTS.length] } : undefined}
              >
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-3 left-3 bg-mango text-ink font-mono text-[11px] px-2.5 py-1 rounded-full font-semibold">
                  {c.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="font-mono text-[22px] text-tealdeep">{c.metric}</div>
                <h3 className="text-[16px] font-disp">{c.title}</h3>
                <p className="text-[13.5px] text-inksoft flex-1">{c.desc}</p>
                <a className="text-[13px] font-semibold" href={`/work/${c.slug}`}>Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
