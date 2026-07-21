// Smoothly scrolls to a section by id, without ever touching the URL
// (no hash fragment). If called from a different page (e.g. a service
// or case-study detail page), it stores the target in sessionStorage,
// navigates home, and the homepage picks it up on mount and scrolls.

const SCROLL_KEY = 'qartibe_scroll_target';

export function goToSection(id) {
  if (typeof window === 'undefined') return;

  const isHome = window.location.pathname === '/';

  if (isHome) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else {
    try {
      sessionStorage.setItem(SCROLL_KEY, id);
    } catch (e) {
      // sessionStorage unavailable; fall back to a plain navigation
    }
    window.location.href = '/';
  }
}

export function consumePendingScroll() {
  if (typeof window === 'undefined') return;

  let id = null;
  try {
    id = sessionStorage.getItem(SCROLL_KEY);
    if (id) sessionStorage.removeItem(SCROLL_KEY);
  } catch (e) {
    id = null;
  }

  if (!id) return;

  // Wait a tick for layout/fonts to settle before measuring position.
  requestAnimationFrame(() => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  });
}
