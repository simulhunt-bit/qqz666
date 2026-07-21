import Head from 'next/head';

export default function Seo({ seo, contact }) {
  const siteUrl = seo.siteUrl || 'https://qartibe.space';
  const ogImage = seo.ogImage?.startsWith('http') ? seo.ogImage : `${siteUrl}${seo.ogImage || '/logo.png'}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Qartibe',
    description: seo.description,
    url: siteUrl,
    image: ogImage,
    logo: `${siteUrl}/logo.png`,
    email: contact.email,
    sameAs: [contact.whatsappLink],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Search Engine Optimization' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facebook Business Setup' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Migration' } },
    ],
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={(seo.keywords || []).join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={siteUrl} />

      {/* PWA / installability */}
      <meta name="theme-color" content="#14213D" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Qartibe" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Qartibe" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon - uses the brand logo */}
      <link rel="icon" href="/icon-192.png" type="image/png" />
      <link rel="shortcut icon" href="/icon-192.png" type="image/png" />
      <link rel="apple-touch-icon" href="/icon-192.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
