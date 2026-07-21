// Minimal service worker. It doesn't cache anything meaningfully yet,
// but its presence + a valid manifest is what makes Chrome/Android
// consider this site "installable" (fires beforeinstallprompt).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through network fetch. Extend this with real caching later
  // if offline support is needed.
  event.respondWith(fetch(event.request));
});
