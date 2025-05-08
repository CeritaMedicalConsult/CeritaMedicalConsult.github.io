const CACHE_NAME = "cerita-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./contact.html",
  "./drug.html",
  "./drugstore.html",
  "./thanks.html",
  "./contents/style.css",
  "./contents/script.js",
  "./contents/images/Icon.png",
  "./contents/data/drug.json",
  "./contents/data/drugstore.json",
  "./ontents/fonts/Gandom.eot",
  "./ontents/fonts/Gandom.svg",
  "./ontents/fonts/Gandom.ttf",
  "./ontents/fonts/Gandom.woff"
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

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});