export default function About({ about }) {
  return (
    <section id="about" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Who We Are</div>
          <h2 className="font-disp font-bold text-[30px] mb-3.5">About Qartibe</h2>
          <p className="text-inksoft text-[17px] leading-relaxed">{about.text}</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {about.stats.map((s, i) => (
              <div key={i} className="border-l-2 border-mango pl-3">
                <b className="font-mono text-2xl block">{s.value}</b>
                <span className="text-[13px] text-inksoft">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        {about.videoUrl && (
          <div className="rounded-2xl overflow-hidden border border-line aspect-video shadow-[0_24px_60px_-20px_rgba(20,33,61,0.18)]">
            <iframe
              className="w-full h-full border-0"
              src={about.videoUrl}
              title="Qartibe intro video"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
