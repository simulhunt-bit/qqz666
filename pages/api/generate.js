import { generateObject } from 'ai';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import {
  buildAdCopyPrompt,
  buildSeoMetaPrompt,
  validateAdCopy,
  validateSeoMeta,
  adCopySchema,
  seoMetaSchema,
} from '@/lib/prompts';
import { logGeneration } from '@/lib/log';

// Uses Vercel AI Gateway (AI_GATEWAY_API_KEY, set automatically by
// `vercel env pull` after `vercel link`) instead of a raw OpenAI key.
const MODEL = 'openai/gpt-5.4';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional lightweight access gate (not real auth — a speed bump for a
  // no-login internal tool). Skipped entirely if ACCESS_PIN isn't set.
  if (process.env.ACCESS_PIN) {
    const providedPin = req.headers['x-access-pin'];
    if (providedPin !== process.env.ACCESS_PIN) {
      return res.status(401).json({ error: 'Invalid or missing access PIN' });
    }
  }

  const ip = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  }

  const { type } = req.body || {};

  try {
    if (type === 'ad-copy') {
      return await handleAdCopy(req, res, remaining);
    }
    if (type === 'seo-meta') {
      return await handleSeoMeta(req, res, remaining);
    }
    return res.status(400).json({ error: 'Unknown type. Use "ad-copy" or "seo-meta".' });
  } catch (err) {
    console.error('Generation error:', err);
    return res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
}

async function handleAdCopy(req, res, remaining) {
  const { product, audience, tone, platform } = req.body || {};

  if (!product || !audience) {
    return res.status(400).json({ error: 'product and audience are required' });
  }

  const safePlatform = platform || 'meta';
  const safeTone = tone || 'friendly';

  const { system, user } = buildAdCopyPrompt({
    product,
    audience,
    tone: safeTone,
    platform: safePlatform,
  });

  const { object } = await generateObject({
    model: MODEL,
    schema: adCopySchema,
    system,
    prompt: user,
  });

  const variations = validateAdCopy(object.variations, safePlatform);

  logGeneration({
    type: 'ad-copy',
    input: { product, audience, tone: safeTone, platform: safePlatform },
    output: variations,
  });

  return res.status(200).json({ variations, rateLimitRemaining: remaining });
}

async function handleSeoMeta(req, res, remaining) {
  const { pageContent, keyword } = req.body || {};

  if (!pageContent || !keyword) {
    return res.status(400).json({ error: 'pageContent and keyword are required' });
  }

  const { system, user } = buildSeoMetaPrompt({ pageContent, keyword });

  const { object } = await generateObject({
    model: MODEL,
    schema: seoMetaSchema,
    system,
    prompt: user,
  });

  const meta = validateSeoMeta(object);

  logGeneration({
    type: 'seo-meta',
    input: { keyword, pageContentPreview: pageContent.slice(0, 200) },
    output: meta,
  });

  return res.status(200).json({ meta, rateLimitRemaining: remaining });
}
