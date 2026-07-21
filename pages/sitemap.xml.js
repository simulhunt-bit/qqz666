import fs from 'fs';
import path from 'path';

function generateSiteMap(siteUrl, caseStudies, services) {
  const lastmod = new Date().toISOString();

  // Add more entries here as real sub-pages (e.g. /privacy, /terms,
  // /blog/...) are added. Case study and service pages are pulled in
  // automatically from data/content.json, so new entries appear here
  // with no extra step.
  const urls = [
    { loc: siteUrl, priority: '1.0', changefreq: 'weekly' },
    { loc: `${siteUrl}/tools`, priority: '0.8', changefreq: 'monthly' },
    ...(services || [])
      .filter((s) => s.slug)
      .map((s) => ({
        loc: `${siteUrl}/services/${s.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
      })),
    ...(caseStudies || []).map((cs) => ({
      loc: `${siteUrl}/work/${cs.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export default function SiteMap() {
  // getServerSideProps handles the response; this component never renders.
  return null;
}

export async function getServerSideProps({ res }) {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const siteUrl = content.seo?.siteUrl || 'https://qartibe.space';

  const sitemap = generateSiteMap(siteUrl, content.caseStudies, content.services);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
