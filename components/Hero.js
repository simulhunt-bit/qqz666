import { goToSection } from '@/lib/scroll';

export default function Hero({ hero, contact }) {
  return (
    <section className="pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep flex items-center gap-2 mb-4">
            <span className="w-4.5 h-0.5 bg-mango inline-block" style={{ width: 18, height: 2 }}></span>
            {hero.eyebrow}
          </div>
          <h1 className="font-disp font-bold leading-[1.05] text-[34px] sm:text-[44px] lg:text-[58px] mb-5">
            {hero.titleBefore} <em className="not-italic text-tealdeep">{hero.titleEmphasis}</em>
          </h1>
          <p className="text-lg text-inksoft max-w-[480px] mb-8">{hero.lead}</p>
          <div className="flex gap-3.5 flex-wrap">
            <a
              href={contact.whatsappLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink bg-ink text-paper hover:-translate-y-0.5 transition"
            >
              Start Free Chat
            </a>
            <button
              type="button"
              onClick={() => goToSection('services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink text-ink hover:-translate-y-0.5 transition"
            >
              View Services
            </button>
          </div>
        </div>
        <div className="bg-papercard border border-line rounded-2xl p-6 shadow-[0_24px_60px_-20px_rgba(20,33,61,0.18)]">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-mono text-xs text-inksoft">{hero.statLabel}</span>
          </div>
          <div className="font-mono text-[34px] font-medium text-tealdeep">{hero.statValue}</div>
          <svg viewBox="0 0 300 110" width="100%" height="110">
            <path
              className="growth-path"
              d="M5,90 C40,95 60,70 90,72 C120,74 130,40 165,42 C195,44 205,20 235,18 C260,16 270,25 295,10"
            />
            <circle className="growth-dot" cx="295" cy="10" r="5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
