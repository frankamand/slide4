// Tilescraper service worker: keeps the game on the device so it opens instantly and works offline.
// The page itself is fetched fresh when online (so updates arrive on the next launch);
// everything else comes from the cache. Bump VERSION when fonts, icons or scripts change.
const VERSION = 'slide4-v4';
const ASSETS = [
  './', './index.html', './manifest.webmanifest', './js/samjs.min.js',
  './fonts/monoton-latin-400-normal.woff2', './fonts/chakra-petch-latin-400-normal.woff2',
  './fonts/chakra-petch-latin-600-normal.woff2', './fonts/chakra-petch-latin-700-normal.woff2',
  './fonts/jetbrains-mono-latin-500-normal.woff2', './fonts/jetbrains-mono-latin-700-normal.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Page: network first, cached copy when offline.
    // no-cache: always check with GitHub, never reuse a stale HTTP-cached page.
    e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  // Assets: cache first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(VERSION).then(c => c.put(req, copy));
    return res;
  })));
});
