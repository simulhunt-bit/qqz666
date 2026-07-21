export default function Reviews({ reviews }) {
  return (
    <section id="reviews" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Client Reviews</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">What businesses say about working with us</h2>
        </div>
        <div className="flex flex-wrap items-center gap-6 bg-papercard border border-line rounded-2xl px-7 py-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[#00b67a] text-[22px] tracking-[2px]">★★★★★</span>
            <span className="font-mono text-xl">{reviews.score}</span>
          </div>
          <span className="text-[13px] text-inksoft font-mono">Trustpilot · {reviews.count}</span>
          <span className="ml-auto text-xs font-mono text-mangodeep border border-dashed border-mangodeep px-2.5 py-1.5 rounded-lg">
            Trustpilot widget placeholder, embed real script here
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.testimonials.map((t, i) => (
            <div key={i} className="bg-papercard border border-line rounded-2xl p-6 flex flex-col gap-3.5">
              <span className="text-[#00b67a] tracking-[2px]">★★★★★</span>
              <p className="text-[14.5px] text-inksoft flex-1">{t.quote}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-[38px] h-[38px] rounded-full bg-tealc text-white flex items-center justify-center font-mono text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <b className="text-[13.5px] block">{t.name}</b>
                  <span className="text-xs text-inksoft">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
