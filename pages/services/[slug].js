import fs from 'fs';
import path from 'path';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { goToSection } from '@/lib/scroll';

export default function ServicePage({ content, service }) {
  if (!service) return null;

  const pageSeo = {
    ...content.seo,
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    siteUrl: `${content.seo.siteUrl}/services/${service.slug}`,
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
              onClick={() => goToSection('services')}
              className="text-sm font-semibold text-tealdeep"
            >
              ← Back to Services
            </button>

            <span className="inline-block mt-6 font-mono text-xs text-mangodeep">{service.num}</span>

            <h1 className="font-disp font-bold text-[28px] sm:text-[38px] mt-2 mb-4">{service.title}</h1>

            <p className="text-inksoft text-[17px] leading-relaxed mb-4">{service.desc}</p>

            {service.seoDescription && (
              <p className="text-inksoft text-[16px] leading-relaxed">{service.seoDescription}</p>
            )}

            {service.videoUrl && (
              <div className="rounded-lg overflow-hidden border border-line aspect-video mt-6">
                <iframe
                  className="w-full h-full border-0"
                  src={service.videoUrl}
                  title={`${service.title} explainer`}
                  allowFullScreen
                />
              </div>
            )}

            <div className="mt-10 bg-ink text-paper rounded-2xl px-8 py-10 text-center">
              <h2 className="font-disp text-xl mb-2">Interested in {service.title}?</h2>
              <p className="text-[#B9C2D6] mb-5 text-sm">Let's talk about your goals.</p>
              <a
                href={`${content.contact.whatsappLink}?text=${encodeURIComponent(service.waText)}`}
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
  const service = (content.services || []).find((s) => s.slug === params.slug);

  if (!service) {
    res.statusCode = 404;
    return { notFound: true };
  }

  return { props: { content, service } };
}
