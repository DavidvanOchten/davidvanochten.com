const DYNAMIC_CACHE = 'dynamic_01';
const STATIC_CACHE = 'static_01';
const STATIC_FILES = [
  '/offline',
  '/app.bundle.css',
  '/app.bundle.js',
  '/static/fonts/1491978/b681571f-aab2-4935-a99c-6ee1063ce638.woff',
  '/static/fonts/1491978/e5716290-d41e-4c97-a27c-7a20a46ddf45.woff2',
  '/static/fonts/1491988/27645c8a-608b-4abf-a2f1-c4407b576723.woff',
  '/static/fonts/1491988/e0d80810-f7e3-4fea-8c57-ef8116f0465d.woff2'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing Service Worker...', e);
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(STATIC_FILES);
      })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activating Service Worker...', e);
  e.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Removing old cache...', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        console.log('[Service Worker] Fetched content');
        return resp;
      })
      .catch((err) => {
        return caches.open(STATIC_CACHE)
          .then((cache) => {

            if (e.request.headers.get('accept').includes('text/html')) {
              return cache.match('/offline');
            }
            // if (e.request.headers.get('accept').includes('text/css')) {
            //   return cache.match('/app.bundle.css');
            // }
            // // TODO: JS file from cache doesn't work with 'application/javascript'.
            // if (e.request.headers.get('accept').includes('/')) {
            //   return cache.match('/app.bundle.js');
            // }

            if (e.request.url.indexOf('bundle.css') > 0) {
              return cache.match('/app.bundle.css');
            }

            if (e.request.url.indexOf('bundle.js') > 0) {
              return cache.match('/app.bundle.js');
            }

            if (e.request.url.indexOf('6ee1063ce638.woff') > 0) {
              return cache.match('/static/fonts/1491978/b681571f-aab2-4935-a99c-6ee1063ce638.woff');
            }

            if (e.request.url.indexOf('c4407b576723.woff') > 0) {
              return cache.match('/static/fonts/1491988/27645c8a-608b-4abf-a2f1-c4407b576723.woff');
            }
        })
      })
  );
});