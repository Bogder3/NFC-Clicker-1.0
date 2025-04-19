const CACHE_NAME = 'nfc clicker 1.0';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/game.js',
  '/icons/NFC Clicker 1.0 (192x192).png',
  '/icons/NFC Clicker 1.0 (512x512).png'
];

// Установка и кэширование ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Отдача ресурсов из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});