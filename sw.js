/* 離線快取：改版時把 VERSION 加一，使用者下次開啟就會拿到新檔 */
const VERSION = 'pd-v12';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 先給快取（桌邊要能完全離線），背景再更新 */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const net = fetch(e.request)
        .then(res => {
          caches.open(VERSION).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
