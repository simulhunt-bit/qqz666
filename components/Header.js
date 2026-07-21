import { useState } from 'react';
import { goToSection } from '@/lib/scroll';
import { usePwaInstall } from '@/lib/usePwaInstall';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'team', label: 'Team' },
  { href: '/tools', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ contact }) {
  const [open, setOpen] = useState(false);
  const { canInstall, isIos, promptInstall } = usePwaInstall();

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur bg-paper/85 border-b border-line">
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex max-w-[1160px] mx-auto items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="font-disp font-bold text-xl hover:text-tealdeep">
              Qartibe<span className="text-tealc">.</span>
            </a>
            <div className="flex gap-7 text-sm font-medium">
              {LINKS.slice(1).map((l) =>
                l.href ? (
                  <a key={l.label} href={l.href} className="hover:text-tealdeep">
                    {l.label}
                  </a>
                ) : (
                  <button key={l.id} type="button" onClick={() => goToSection(l.id)} className="hover:text-tealdeep">
                    {l.label}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={contact.whatsappLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-ink bg-ink text-paper hover:-translate-y-0.5 transition"
            >
              Chat on WhatsApp
            </a>
            <img src="/logo.png" alt="Qartibe logo" className="h-9 w-9 object-contain" />
          </div>
        </nav>

        {/* MOBILE NAV */}
        <nav className="flex md:hidden items-center justify-between px-5 py-3.5">
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex flex-col justify-center gap-1.5 w-9 h-9 border border-line rounded-lg bg-papercard px-2"
          >
            <span className="block w-full h-0.5 bg-ink rounded"></span>
            <span className="block w-full h-0.5 bg-ink rounded"></span>
            <span className="block w-full h-0.5 bg-ink rounded"></span>
          </button>
          <a href="/" className="font-disp font-bold text-lg hover:text-tealdeep">
            Qartibe<span className="text-tealc">.</span>
          </a>
          <img src="/logo.png" alt="Qartibe logo" className="h-8 w-8 object-contain" />
        </nav>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/45 z-[90] transition-opacity duration-250 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-papercard border-r border-line z-[95] flex flex-col p-6 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Section menu"
      >
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Qartibe logo" className="h-7 w-7 object-contain" />
            <div className="font-disp font-bold text-xl">
              Qartibe<span className="text-mango">.</span>
            </div>
          </div>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-2xl leading-none">
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {LINKS.map((l, i) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-3 rounded-lg font-disp font-semibold text-base hover:bg-paper hover:text-tealdeep"
              >
                <span className="font-mono text-[11px] text-mangodeep w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
              </a>
            ) : (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  goToSection(l.id);
                }}
                className="flex items-center gap-2.5 px-2.5 py-3 rounded-lg font-disp font-semibold text-base hover:bg-paper hover:text-tealdeep text-left"
              >
                <span className="font-mono text-[11px] text-mangodeep w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
              </button>
            )
          )}
        </nav>
        <div className="mt-auto pt-5 border-t border-line flex flex-col gap-3">
          {canInstall && (
            <div className="bg-paper border border-line rounded-xl p-3.5 flex items-center gap-3">
              <img src="/icon-192.png" alt="Qartibe app icon" className="h-9 w-9 rounded-lg object-contain flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold leading-tight">Install this site as an app</p>
                {isIos ? (
                  <p className="text-[11.5px] text-inksoft leading-snug mt-0.5">
                    Tap <span className="font-semibold">Share</span> → <span className="font-semibold">Add to Home Screen</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={promptInstall}
                    className="text-[11.5px] font-semibold text-tealdeep mt-0.5"
                  >
                    Tap to install →
                  </button>
                )}
              </div>
            </div>
          )}
          <a
            href={contact.whatsappLink}
            className="flex justify-center items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-ink bg-ink text-paper w-full"
          >
            Chat on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
