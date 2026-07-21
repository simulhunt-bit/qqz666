import fs from 'fs';
import path from 'path';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage({ content }) {
  const pageSeo = {
    ...content.seo,
    title: 'Privacy Policy | Qartibe',
    description: 'How Qartibe collects, uses, and protects your information.',
    siteUrl: `${content.seo.siteUrl}/privacy`,
  };

  return (
    <>
      <Seo seo={pageSeo} contact={content.contact} />
      <div className="bg-paper text-ink min-h-screen">
        <Header contact={content.contact} />
        <section className="py-20">
          <div className="max-w-[760px] mx-auto px-6">
            <h1 className="font-disp font-bold text-[32px] mb-6">Privacy Policy</h1>
            <p className="text-inksoft leading-relaxed mb-4">
              We collect only the information you provide directly to us, such as through our
              contact form or WhatsApp, in order to respond to your inquiry and provide our services.
              We do not sell your personal information to third parties.
            </p>
            <p className="text-inksoft leading-relaxed mb-4">
              If you have questions about how your data is handled, contact us at{' '}
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
