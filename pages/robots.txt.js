import fs from 'fs';
import path from 'path';

export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const siteUrl = content.seo?.siteUrl || 'https://qartibe.space';

  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();

  return { props: {} };
}
