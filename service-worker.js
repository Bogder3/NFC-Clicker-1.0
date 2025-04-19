const CACHE_NAME = 'clicker-v4'; // Измените версию при обновлениях
const ASSETS = [
  '/NFC-Clicker-1.0/', // Главная страница
  '/NFC-Clicker-1.0/index.html',
  '/NFC-Clicker-1.0/css/style.css',
  '/NFC-Clicker-1.0/js/clicker.js',
  '/NFC-Clicker-1.0/icons/NFC Clicker 1.0 (192x192).png',
  '/NFC-Clicker-1.0/icons/NFC Clicker 1.0 (512x512).png',
  '/NFC-Clicker-1.0/manifest.json'
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
