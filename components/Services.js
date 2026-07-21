export default function Services({ services, contact }) {
  return (
    <section id="services" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Our Expertise</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">Everything your business needs to scale online</h2>
          <p className="text-inksoft mt-3">Six services, one connected strategy, each with a short explainer so you know exactly what you're getting.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.num} className="bg-papercard border border-line rounded-2xl p-7 flex flex-col gap-3 hover:-translate-y-1 hover:border-tealc transition">
              <span className="font-mono text-xs text-mangodeep">{s.num}</span>
              <h3 className="font-disp text-[19px]">{s.title}</h3>
              <p className="text-inksoft text-[14.5px] flex-1">{s.desc}</p>
              {s.videoUrl && (
                <div className="rounded-lg overflow-hidden border border-line aspect-video">
                  <iframe className="w-full h-full border-0" src={s.videoUrl} title={`${s.title} explainer`} allowFullScreen />
                </div>
              )}
              <div className="flex items-center gap-4">
                {s.slug && (
                  <a className="text-[13px] font-semibold" href={`/services/${s.slug}`}>
                    Learn more →
                  </a>
                )}
                <a
                  className="text-[13px] font-semibold text-tealdeep"
                  href={`${contact.whatsappLink}?text=${encodeURIComponent(s.waText)}`}
                >
                  Chat now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
