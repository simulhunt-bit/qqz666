// Shared helpers that auto-generate slugs and SEO metadata for content
// that gets its own page (currently: case studies under /work/[slug]).
// Called server-side whenever content is saved from /admin, so editors
// never have to type meta titles/descriptions by hand.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function truncate(str, max) {
  if (!str) return str;
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '…';
}

// Ensures every case study has a unique slug, and (re)computes seoTitle /
// seoDescription from its title, tag, and metric unless the editor has
// manually overridden them (an "seoLocked" flag, set by the admin UI).
export function autoSeoCaseStudies(caseStudies, brandName = 'Qartibe') {
  const usedSlugs = new Set();

  return caseStudies.map((cs) => {
    let slug = cs.slug ? slugify(cs.slug) : slugify(cs.title || 'case-study');
    if (!slug) slug = 'case-study';

    let candidate = slug;
    let i = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${slug}-${i}`;
      i += 1;
    }
    usedSlugs.add(candidate);

    const autoTitle = `${cs.title} Case Study | ${brandName}`;
    const autoDescription = truncate(
      `${cs.metric ? cs.metric + '. ' : ''}${cs.desc || ''}`.trim(),
      160
    );

    return {
      ...cs,
      slug: candidate,
      seoTitle: cs.seoLocked && cs.seoTitle ? cs.seoTitle : autoTitle,
      seoDescription: cs.seoLocked && cs.seoDescription ? cs.seoDescription : autoDescription,
    };
  });
}
