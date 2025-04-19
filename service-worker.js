const CACHE_NAME = 'clicker-v6'; // Измените версию при обновлениях
const ASSETS = [
  '/', // Главная страница
  '/index.html',
  '/css/style.css',
  '/js/clicker.js',
  '/icons/NFC Clicker 1.0 (192x192).png',
  '/icons/NFC Clicker 1.0 (512x512).png',
  '/.nojekyll'
  '/manifest.json'
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
