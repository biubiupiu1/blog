this.addEventListener('install', function (event) {
    this.skipWaiting();
});

// sw.js
this.addEventListener('activate', function (event) {
    var cacheWhitelist = ['sw_demo2'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('Service Worker activate');
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res ||
                fetch(event.request)
                    .then(responese => {
                        const responeseClone = responese.clone();
                        caches.open('sw_demo2').then(cache => {
                            cache.put(event.request, responeseClone);
                        })
                        return responese;
                    })
                    .catch(err => {
                        console.log(err);
                    });
        })
    )
});
