const CACHE_NAME = "tpf-card-claudia-v2";
const APP_FILES = [
  "./", "./index.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png",
  "./logo_tpf.png", "./foto_claudia.jpg",
  "./qr-contacto.png", "./Claudia_Ramirez.vcf"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy=response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request,copy));
    return response;
  }).catch(() => caches.match(event.request).then(r => r || (event.request.mode === "navigate" ? caches.match("./index.html") : undefined))));
});
