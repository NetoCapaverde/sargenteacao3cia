const CACHE_NAME = 'sargenteacao-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação: guarda arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativação (limpar caches antigos futuramente, se quiser)
self.addEventListener('activate', event => {
  event.waitUntil(Promise.resolve());
});

// Intercepta requisições para servir do cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
