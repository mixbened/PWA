const cacheName = 'news-v1';

const staticAssets = [
'./images/icons/icon-128x128.png',
  './favicon.ico',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './index.html',
  './../src/App.js',
  './../src/App.css'
];

self.addEventListener('install', async function () {
    console.log("inside cache");
  const cache = await caches.open(cacheName);
  console.log("inside cache");
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('news-dynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}

