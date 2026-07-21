import { goToSection } from '@/lib/scroll';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper pt-14 pb-7">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-8 pb-8 border-b border-white/15">
          <div>
            <h4 className="font-disp text-xl mb-2">
              Qartibe<span className="text-mango">.</span>
            </h4>
            <p className="text-sm text-[#B9C2D6] max-w-[280px]">
              Digital Marketing & Growth Agency. Empowering businesses worldwide through digital innovation.
            </p>
          </div>
          <div className="flex gap-10 flex-wrap">
            <div className="flex flex-col gap-2.5 text-sm">
              <b className="font-mono text-[11px] text-mango uppercase tracking-wider mb-0.5">Company</b>
              <button type="button" onClick={() => goToSection('about')} className="text-left">About</button>
              <button type="button" onClick={() => goToSection('work')} className="text-left">Work</button>
              <button type="button" onClick={() => goToSection('team')} className="text-left">Team</button>
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <b className="font-mono text-[11px] text-mango uppercase tracking-wider mb-0.5">Services</b>
              <a href="/services/meta-ads">Meta Ads</a>
              <a href="/services/seo">SEO</a>
              <a href="/services/social-media">Social Media</a>
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <b className="font-mono text-[11px] text-mango uppercase tracking-wider mb-0.5">Legal</b>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2 pt-5 text-[12.5px] text-[#8894AC]">
          <span>© 2026 Qartibe. All rights reserved.</span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
