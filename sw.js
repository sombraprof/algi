// Config do Service Worker
try { importScripts('./js/sw-config.js'); } catch(e) {}
const CACHE_NAME = (self.APP_CACHE_PREFIX || 'spa-starter') + '-' + (self.APP_CACHE_VERSION || 'v1');
const CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './aulas/aulas.json',
  './listas/listas.json',
  './offline.html'
];

// Mensagens do cliente (permitir SKIP_WAITING programático)
self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg && msg.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Navegações (HTML principal): network-first -> cache -> offline
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        } catch {
          return (await caches.match(req)) || (await caches.match('./index.html')) || (await caches.match('./offline.html'));
        }
      })()
    );
    return;
  }
  // Arquivos de conteúdo dinâmico da SPA (partials HTML/JSON/CSS/JS): network-first
  if (/\.(?:html|json|css|js)(\?|#|$)/i.test(url.pathname)) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        } catch {
          return await caches.match(req);
        }
      })()
    );
    return;
  }

  // Demais requisições (imagens, ícones, fontes, etc.): stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return networkRes;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
