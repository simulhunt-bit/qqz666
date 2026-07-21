import { z } from 'zod';

// Platform character limits used for validation before showing output.
export const PLATFORM_LIMITS = {
  meta: { headline: 40, body: 125 },
  google: { headline: 30, body: 90 },
  instagram: { headline: 40, body: 125 },
};

export const adCopySchema = z.object({
  variations: z
    .array(
      z.object({
        headline: z.string(),
        body: z.string(),
        cta: z.string(),
      })
    )
    .length(5),
});

export const seoMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).min(5).max(8),
});

export function buildAdCopyPrompt({ product, audience, tone, platform }) {
  const limits = PLATFORM_LIMITS[platform] || PLATFORM_LIMITS.meta;

  const system = `You are a senior direct-response copywriter. You write ad copy that follows
platform character limits exactly, never makes false or unverifiable claims, and always
includes a clear call to action.`;

  const user = `Write ad copy for this offer.

Product/offer: ${product}
Target audience: ${audience}
Tone: ${tone}
Platform: ${platform}
Hard limits: headline <= ${limits.headline} characters, body <= ${limits.body} characters.

Write exactly 5 distinct variations, each with a headline, body, and CTA.
Vary the angle across the 5 (e.g. pain point, social proof, urgency, benefit-led, curiosity).`;

  return { system, user };
}

export function buildSeoMetaPrompt({ pageContent, keyword }) {
  const system = `You are an SEO specialist. You write meta titles and descriptions that follow
Google's practical length guidance, include the target keyword naturally (never stuffed),
and accurately reflect the page content.`;

  const user = `Generate SEO meta data for this page.

Target keyword: ${keyword}
Page content:
"""
${pageContent}
"""

Rules:
- title: <= 60 characters, include the keyword naturally, no clickbait
- description: <= 155 characters, include the keyword naturally, end with an implicit reason to click
- keywords: 5-8 relevant keyword phrases related to the page content`;

  return { system, user };
}

export function validateAdCopy(variations, platform) {
  const limits = PLATFORM_LIMITS[platform] || PLATFORM_LIMITS.meta;
  return variations.map((v) => ({
    ...v,
    warnings: [
      v.headline && v.headline.length > limits.headline
        ? `Headline is ${v.headline.length} chars, over the ${limits.headline} limit`
        : null,
      v.body && v.body.length > limits.body
        ? `Body is ${v.body.length} chars, over the ${limits.body} limit`
        : null,
    ].filter(Boolean),
  }));
}

export function validateSeoMeta(meta) {
  const warnings = [];
  if (meta.title && meta.title.length > 60) {
    warnings.push(`Title is ${meta.title.length} chars, over the 60 char guideline`);
  }
  if (meta.description && meta.description.length > 155) {
    warnings.push(`Description is ${meta.description.length} chars, over the 155 char guideline`);
  }
  return { ...meta, warnings };
}
