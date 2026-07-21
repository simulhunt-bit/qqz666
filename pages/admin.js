import { useEffect, useState } from 'react';
import Head from 'next/head';

const SECTION_FIELDS = [
  { key: 'services', label: 'Services' },
  { key: 'caseStudies', label: 'Case Studies / Work' },
  { key: 'reviews', label: 'Reviews (Trustpilot score + testimonials)' },
  { key: 'pricing', label: 'Pricing Plans' },
  { key: 'faq', label: 'FAQ' },
  { key: 'team', label: 'Team' },
];

export default function Admin() {
  const [content, setContent] = useState(null);
  const [jsonDrafts, setJsonDrafts] = useState({});
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        setContent(data);
        const drafts = {};
        SECTION_FIELDS.forEach((s) => {
          drafts[s.key] = JSON.stringify(data[s.key], null, 2);
        });
        setJsonDrafts(drafts);
      });
  }, []);

  function updateSimple(section, key, value) {
    setContent((c) => ({ ...c, [section]: { ...c[section], [key]: value } }));
  }

  function updateTicker(value) {
    setContent((c) => ({ ...c, ticker: value.split('\n').filter(Boolean) }));
  }

  async function saveAll() {
    setError('');
    setStatus('Saving…');

    // Merge JSON-textarea sections back into content before saving.
    let merged = { ...content };
    for (const s of SECTION_FIELDS) {
      try {
        merged[s.key] = JSON.parse(jsonDrafts[s.key]);
      } catch (e) {
        setError(`"${s.label}" is not valid JSON. Fix it before saving.`);
        setStatus('');
        return;
      }
    }

    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: merged }),
    });

    if (res.ok) {
      const body = await res.json();
      const saved = body.content || merged;
      setContent(saved);
      // Refresh the JSON textareas so auto-generated slugs / SEO fields
      // (e.g. on caseStudies) are visible right after saving.
      const drafts = {};
      SECTION_FIELDS.forEach((s) => {
        drafts[s.key] = JSON.stringify(saved[s.key], null, 2);
      });
      setJsonDrafts(drafts);
      setStatus('Saved! Reload the homepage to see changes.');
    } else {
      const body = await res.json();
      setError(body.error || 'Failed to save.');
      setStatus('');
    }
  }

  if (!content) {
    return <div className="p-10">Loading content…</div>;
  }

  return (
    <>
      <Head>
        <title>Qartibe Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-paper py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-2xl">Qartibe: Admin Editor</h1>
            <a href="/" className="text-sm underline">View site →</a>
          </div>

          {/* SEO */}
          <div className="bg-white border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">SEO</h2>
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Page title</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              value={content.seo.title}
              onChange={(e) => updateSimple('seo', 'title', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Meta description</label>
            <textarea
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              rows={2}
              value={content.seo.description}
              onChange={(e) => updateSimple('seo', 'description', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Site URL</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              value={content.seo.siteUrl}
              onChange={(e) => updateSimple('seo', 'siteUrl', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Keywords (one per line)</label>
            <textarea
              className="w-full border border-line rounded-lg px-3 py-2 text-sm font-mono"
              rows={6}
              value={content.seo.keywords.join('\n')}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  seo: { ...c.seo, keywords: e.target.value.split('\n').filter(Boolean) },
                }))
              }
            />
          </div>

          {/* HERO */}
          <div className="bg-white border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">Hero Section</h2>
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Eyebrow</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              value={content.hero.eyebrow}
              onChange={(e) => updateSimple('hero', 'eyebrow', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Title (before emphasis)</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              value={content.hero.titleBefore}
              onChange={(e) => updateSimple('hero', 'titleBefore', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Title (emphasized word)</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              value={content.hero.titleEmphasis}
              onChange={(e) => updateSimple('hero', 'titleEmphasis', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Lead paragraph</label>
            <textarea
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              rows={2}
              value={content.hero.lead}
              onChange={(e) => updateSimple('hero', 'lead', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Stat label</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.hero.statLabel}
                  onChange={(e) => updateSimple('hero', 'statLabel', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Stat value</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.hero.statValue}
                  onChange={(e) => updateSimple('hero', 'statValue', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* TICKER */}
          <div className="bg-white border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-2">Ticker (one item per line)</h2>
            <textarea
              className="w-full border border-line rounded-lg px-3 py-2 text-sm font-mono"
              rows={5}
              value={content.ticker.join('\n')}
              onChange={(e) => updateTicker(e.target.value)}
            />
          </div>

          {/* ABOUT */}
          <div className="bg-white border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">About</h2>
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">About text</label>
            <textarea
              className="w-full border border-line rounded-lg px-3 py-2 mb-3 text-sm"
              rows={3}
              value={content.about.text}
              onChange={(e) => updateSimple('about', 'text', e.target.value)}
            />
            <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Video embed URL</label>
            <input
              className="w-full border border-line rounded-lg px-3 py-2 text-sm"
              value={content.about.videoUrl}
              onChange={(e) => updateSimple('about', 'videoUrl', e.target.value)}
            />
          </div>

          {/* CONTACT */}
          <div className="bg-white border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">Contact Info</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">WhatsApp display</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.contact.whatsappDisplay}
                  onChange={(e) => updateSimple('contact', 'whatsappDisplay', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">WhatsApp link</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.contact.whatsappLink}
                  onChange={(e) => updateSimple('contact', 'whatsappLink', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Email</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.contact.email}
                  onChange={(e) => updateSimple('contact', 'email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Location</label>
                <input
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm"
                  value={content.contact.location}
                  onChange={(e) => updateSimple('contact', 'location', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* JSON-EDITED SECTIONS */}
          {SECTION_FIELDS.map((s) => (
            <div key={s.key} className="bg-white border border-line rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-lg mb-2">{s.label}</h2>
              <p className="text-xs text-gray-500 mb-2">Edit as JSON, keep the same structure (array of objects).</p>
              {s.key === 'caseStudies' && (
                <p className="text-xs text-tealdeep mb-2">
                  Each entry here gets its own live page at /work/&#123;slug&#125;. Add a new object with
                  "tag", "metric", "title", "desc", and optional "body" to publish a new page, no
                  "slug" needed. On save, a URL slug and SEO title/description are generated
                  automatically from the title, metric, and description. To add a page: copy an
                  existing object, edit the fields, and save.
                </p>
              )}
              <textarea
                className="w-full border border-line rounded-lg px-3 py-2 text-sm font-mono"
                rows={s.key === 'caseStudies' ? 16 : 10}
                value={jsonDrafts[s.key] || ''}
                onChange={(e) => setJsonDrafts((d) => ({ ...d, [s.key]: e.target.value }))}
              />
            </div>
          ))}

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          {status && <p className="text-tealdeep text-sm mb-3">{status}</p>}

          <button
            onClick={saveAll}
            className="bg-ink text-white rounded-full px-8 py-3 font-semibold text-sm sticky bottom-6"
          >
            Save all changes
          </button>
        </div>
      </div>
    </>
  );
}
