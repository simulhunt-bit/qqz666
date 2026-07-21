import fs from 'fs';
import path from 'path';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { goToSection } from '@/lib/scroll';

export default function CaseStudyPage({ content, caseStudy }) {
  if (!caseStudy) return null;

  // Build a per-page Seo object: same shape as content.seo, but with this
  // case study's auto-generated title/description and a canonical URL
  // that points at this specific page (not the homepage).
  const pageSeo = {
    ...content.seo,
    title: caseStudy.seoTitle,
    description: caseStudy.seoDescription,
    siteUrl: `${content.seo.siteUrl}/work/${caseStudy.slug}`,
  };

  return (
    <>
      <Seo seo={pageSeo} contact={content.contact} />

      <div
        className="bg-paper text-ink min-h-screen"
        style={{
          backgroundImage:
            'linear-gradient(#D6DCE4 1px, transparent 1px), linear-gradient(90deg, #D6DCE4 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '-1px -1px',
        }}
      >
        <Header contact={content.contact} />

        <section className="py-20">
          <div className="max-w-[760px] mx-auto px-6">
            <button
              type="button"
              onClick={() => goToSection('work')}
              className="text-sm font-semibold text-tealdeep"
            >
              ← Back to Our Work
            </button>

            <span className="inline-block mt-6 bg-mango text-ink font-mono text-[11px] px-2.5 py-1 rounded-full font-semibold">
              {caseStudy.tag}
            </span>

            <h1 className="font-disp font-bold text-[28px] sm:text-[38px] mt-4 mb-2">
              {caseStudy.title}
            </h1>

            {caseStudy.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl border border-line mb-6"
              />
            )}

            <div className="font-mono text-[26px] text-tealdeep mb-6">{caseStudy.metric}</div>

            <p className="text-inksoft text-[17px] leading-relaxed mb-4">{caseStudy.desc}</p>

            {caseStudy.body && (
              <p className="text-inksoft text-[16px] leading-relaxed">{caseStudy.body}</p>
            )}

            <div className="mt-10 bg-ink text-paper rounded-2xl px-8 py-10 text-center">
              <h2 className="font-disp text-xl mb-2">Want results like this?</h2>
              <p className="text-[#B9C2D6] mb-5 text-sm">Let's talk about your business.</p>
              <a
                href={content.contact.whatsappLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-mango bg-mango text-ink"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params, res }) {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const caseStudy = (content.caseStudies || []).find((c) => c.slug === params.slug);

  if (!caseStudy) {
    res.statusCode = 404;
    return { notFound: true };
  }

  return { props: { content, caseStudy } };
}
