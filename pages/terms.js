import fs from 'fs';
import path from 'path';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage({ content }) {
  const pageSeo = {
    ...content.seo,
    title: 'Terms of Service | Qartibe',
    description: 'The terms that govern use of Qartibe\u2019s website and services.',
    siteUrl: `${content.seo.siteUrl}/terms`,
  };

  return (
    <>
      <Seo seo={pageSeo} contact={content.contact} />
      <div className="bg-paper text-ink min-h-screen">
        <Header contact={content.contact} />
        <section className="py-20">
          <div className="max-w-[760px] mx-auto px-6">
            <h1 className="font-disp font-bold text-[32px] mb-6">Terms of Service</h1>
            <p className="text-inksoft leading-relaxed mb-4">
              By using this website and engaging our services, you agree to work with us on the
              terms outlined during onboarding, including scope, billing, and cancellation terms
              for your selected plan.
            </p>
            <p className="text-inksoft leading-relaxed mb-4">
              Questions about these terms can be sent to{' '}
              <a className="text-tealdeep font-semibold" href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </a>.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { content } };
}
