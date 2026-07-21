import fs from 'fs';
import path from 'path';
import { autoSeoCaseStudies } from '@/lib/autoSeo';

const filePath = path.join(process.cwd(), 'data', 'content.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return res.status(200).json(content);
  }

  if (req.method === 'POST') {
    const { content } = req.body || {};

    try {
      // Validate it's real JSON / a plain object before writing to disk.
      JSON.parse(JSON.stringify(content));

      // Auto-generate slugs + SEO title/description for any case study
      // that's new or was edited, so every "Work" page stays indexable
      // without the editor typing meta tags by hand.
      if (Array.isArray(content.caseStudies)) {
        content.caseStudies = autoSeoCaseStudies(content.caseStudies);
      }

      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      return res.status(200).json({ ok: true, content });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid content payload.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
