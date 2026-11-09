// Tilescraper service worker: keeps the game on the device so it opens instantly and works offline.
// The page itself is fetched fresh when online (so updates arrive on the next launch);
// everything else comes from the cache. Bump VERSION when fonts, icons, scripts or sound clips change.
const VERSION = 'slide4-v5';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './fonts/monoton-latin-400-normal.woff2', './fonts/chakra-petch-latin-400-normal.woff2',
  './fonts/chakra-petch-latin-600-normal.woff2', './fonts/chakra-petch-latin-700-normal.woff2',
  './fonts/jetbrains-mono-latin-500-normal.woff2', './fonts/jetbrains-mono-latin-700-normal.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png',
  // the game's voice: SAM clips, one per phrase
  './audio/en/eight-colors.mp3',
  './audio/en/eleven-colors.mp3',
  './audio/en/fifteen-colors.mp3',
  './audio/en/five-colors.mp3',
  './audio/en/fourteen-colors.mp3',
  './audio/en/game-over.mp3',
  './audio/en/high-score.mp3',
  './audio/en/level-four.mp3',
  './audio/en/level-three.mp3',
  './audio/en/level-two.mp3',
  './audio/en/nine-colors.mp3',
  './audio/en/overtime.mp3',
  './audio/en/seven-colors.mp3',
  './audio/en/six-colors.mp3',
  './audio/en/ten-colors.mp3',
  './audio/en/thirteen-colors.mp3',
  './audio/en/three-color-survive.mp3',
  './audio/en/twelve-colors.mp3',
  './audio/en/well-done.mp3'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    // Only our own old caches: other games on this site (Star Dock) keep their caches in the same origin.
    .then(keys => Promise.all(keys.filter(k => k.startsWith('slide4-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Only the game's own page; other pages under this folder (test copies in try/) go straight to the network.
    const root = new URL('./', self.registration.scope).pathname, path = new URL(req.url).pathname;
    if (path !== root && path !== root + 'index.html') return;
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
