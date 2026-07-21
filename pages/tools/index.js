import fs from 'fs';
import path from 'path';
import { useState } from 'react';

import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ToolsPage({ content }) {
  const [tab, setTab] = useState('ad-copy');

  const pageSeo = {
    ...content.seo,
    title: 'Free Marketing Tools | AI Ad Copy & SEO Meta Generator | Qartibe',
    description:
      'Free AI-powered tools to generate ad copy variations and SEO meta tags. Built by Qartibe to show the kind of automation we build for clients.',
    siteUrl: `${content.seo.siteUrl}/tools`,
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

        <section className="py-16">
          <div className="max-w-[880px] mx-auto px-6">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep">Free Tools</span>
            <h1 className="font-disp font-bold text-[28px] sm:text-[38px] mt-2 mb-3">
              AI Marketing Tools
            </h1>
            <p className="text-inksoft text-[15px] mb-8 max-w-[560px]">
              Two free tools we built on the same kind of automation we set up for clients. Try
              them, then reach out if you want this running for your business day to day.
            </p>

            <div className="flex gap-2 mb-6">
              <TabButton active={tab === 'ad-copy'} onClick={() => setTab('ad-copy')}>
                Ad Copy Generator
              </TabButton>
              <TabButton active={tab === 'seo-meta'} onClick={() => setTab('seo-meta')}>
                SEO Meta Generator
              </TabButton>
            </div>

            {tab === 'ad-copy' ? <AdCopyTool /> : <SeoMetaTool />}

            <div className="mt-10 bg-ink text-paper rounded-2xl px-8 py-8 text-center">
              <h2 className="font-disp text-lg mb-2">Want this running for your business?</h2>
              <p className="text-[#B9C2D6] mb-5 text-sm">
                We build custom AI automation on top of your ads, SEO, and content workflow.
              </p>
              <a
                href={`${content.contact.whatsappLink}?text=${encodeURIComponent(
                  "Hi! I tried your AI tools and I'd like to talk about automation for my business."
                )}`}
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

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition ${
        active ? 'bg-ink text-paper border-ink' : 'bg-papercard text-ink border-line'
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  'border border-line rounded-lg px-3.5 py-2.5 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-tealc';

async function callApi(body) {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function AdCopyTool() {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('friendly');
  const [platform, setPlatform] = useState('meta');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [variations, setVariations] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVariations(null);
    try {
      const data = await callApi({ type: 'ad-copy', product, audience, tone, platform });
      setVariations(data.variations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-papercard border border-line rounded-2xl p-6"
      >
        <Field label="Product / Offer">
          <input
            className={inputClass}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Free Meta Ads audit for local shops"
            required
          />
        </Field>
        <Field label="Target Audience">
          <input
            className={inputClass}
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. small e-commerce owners"
            required
          />
        </Field>
        <Field label="Tone">
          <select className={inputClass} value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="friendly">Friendly</option>
            <option value="bold">Bold</option>
            <option value="luxury">Luxury</option>
            <option value="urgent">Urgent</option>
            <option value="professional">Professional</option>
          </select>
        </Field>
        <Field label="Platform">
          <select className={inputClass} value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="meta">Meta (Facebook/Instagram feed)</option>
            <option value="google">Google Ads</option>
            <option value="instagram">Instagram</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-ink text-paper font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Generate 5 Variations'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

      {variations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {variations.map((v, i) => (
            <div key={i} className="bg-papercard border border-line rounded-xl p-4">
              <p className="text-[11px] font-mono text-tealdeep mb-1">VARIATION {i + 1}</p>
              <p className="font-semibold text-sm mb-1">{v.headline}</p>
              <p className="text-sm text-inksoft mb-2">{v.body}</p>
              <p className="text-xs font-semibold text-mangodeep">{v.cta}</p>
              {v.warnings?.length > 0 && (
                <p className="text-[11px] text-red-600 mt-2">{v.warnings.join(' · ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SeoMetaTool() {
  const [pageContent, setPageContent] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMeta(null);
    try {
      const data = await callApi({ type: 'seo-meta', pageContent, keyword });
      setMeta(data.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-papercard border border-line rounded-2xl p-6">
        <Field label="Target Keyword">
          <input
            className={inputClass}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. SEO agency for small business"
            required
          />
        </Field>
        <Field label="Page Content">
          <textarea
            className={`${inputClass} min-h-[160px]`}
            value={pageContent}
            onChange={(e) => setPageContent(e.target.value)}
            placeholder="Paste the page's text content here"
            required
          />
        </Field>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-ink text-paper font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Generate Meta Tags'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

      {meta && (
        <div className="bg-papercard border border-line rounded-xl p-5 mt-6">
          <p className="text-[11px] font-mono text-tealdeep mb-1">TITLE ({meta.title?.length || 0} chars)</p>
          <p className="font-semibold text-sm mb-3">{meta.title}</p>

          <p className="text-[11px] font-mono text-tealdeep mb-1">
            DESCRIPTION ({meta.description?.length || 0} chars)
          </p>
          <p className="text-sm text-inksoft mb-3">{meta.description}</p>

          <p className="text-[11px] font-mono text-tealdeep mb-1">KEYWORDS</p>
          <div className="flex flex-wrap gap-1.5">
            {(meta.keywords || []).map((k, i) => (
              <span key={i} className="text-xs bg-paper border border-line rounded-full px-2.5 py-1">
                {k}
              </span>
            ))}
          </div>

          {meta.warnings?.length > 0 && (
            <p className="text-[11px] text-red-600 mt-3">{meta.warnings.join(' · ')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { content } };
}
