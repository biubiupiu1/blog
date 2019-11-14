this.addEventListener('install', function (event) {
    this.skipWaiting();
    console.log('install');
    // event.waitUntil(
    //     caches.open('sw_demo').then(function (cache) {
    //         return cache.addAll([
    //             './index.css',
    //             './setTimeout.js',
    //         ])
    //     })
    // );
});

// sw.js
this.addEventListener('activate', function (event) {
    console.log('Service Worker activate');
});

this.addEventListener('fetch', function (event) {
    // if (/\.png$/.test(event.request.url)) {
    //     console.log(event.request.url);
    //     event.respondWith(fetch('./taoci.png'));
    // }
    console.log(event.request)
    event.respondWith(
        caches.match(event.request).then(res => {
            return res ||
                fetch(event.request)
                    .then(responese => {
                        const responeseClone = responese.clone();
                        caches.open('sw_demo').then(cache => {
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
