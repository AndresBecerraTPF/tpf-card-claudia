const CACHE = "tpf-card-v1";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./foto_claudia.jpg",
    "./logo_tpf.png",
    "./Claudia_Ramirez.vcf",
    "./qr-contacto.png",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(FILES))
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );

});
