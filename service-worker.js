const CACHE_NAME = "inventory-cache-v1";
const urlsToCache = [
  "/", // URL de la page d'accueil
  "/manifest.json",
  "/icon.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
