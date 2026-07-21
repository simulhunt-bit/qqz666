import fs from 'fs';
import path from 'path';
import { useEffect } from 'react';

import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import StartupOffer from '@/components/StartupOffer';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Reviews from '@/components/Reviews';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { consumePendingScroll } from '@/lib/scroll';

export default function Home({ content }) {
  useEffect(() => {
    consumePendingScroll();
  }, []);

  return (
    <>
      <Seo seo={content.seo} contact={content.contact} />

      <div
        className="bg-paper text-ink"
        style={{
          backgroundImage:
            'linear-gradient(#D6DCE4 1px, transparent 1px), linear-gradient(90deg, #D6DCE4 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '-1px -1px',
        }}
      >
        <Header contact={content.contact} />
        <Hero hero={content.hero} contact={content.contact} />
        <Ticker items={content.ticker} />
        <StartupOffer offer={content.startupOffer} contact={content.contact} />
        <About about={content.about} />
        <Services services={content.services} contact={content.contact} />
        <Work caseStudies={content.caseStudies} />
        <Reviews reviews={content.reviews} />
        <Pricing pricing={content.pricing} contact={content.contact} />
        <Faq faq={content.faq} />
        <Team team={content.team} />
        <Contact contact={content.contact} />
        <Footer />
      </div>
    </>
  );
}

// Read content fresh on every request so admin edits show up without a rebuild.
export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { content } };
}
