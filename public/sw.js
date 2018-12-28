const DYNAMIC_CACHE = 'dynamic';
const STATIC_CACHE = 'static';
const STATIC_FILES = [
  '/offline',
  '/app.bundle.css',
  '/app.bundle.js',
  '/static/fonts/neue-haas-unica-regular.woff2',
  '/static/fonts/neue-haas-unica-regular.woff',
  '/static/fonts/neue-haas-unica-medium.woff2',
  '/static/fonts/neue-haas-unica-medium.woff'
];

self.addEventListener('install', e => {
  // console.log('[Service Worker] Installing Service Worker...', e);
  e.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      // console.log('[Service Worker] Precaching App Shell');
      cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener('activate', e => {
  // console.log('[Service Worker] Activating Service Worker...', e);
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            // console.log('[Service Worker] Removing old cache...', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Removes Chrome error (bug?)
  // https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // console.log('[Service Worker] Fetched content');
        return resp;
      })
      .catch(err => {
        console.log('[Service Worker] Error: ', err);

        return caches.open(STATIC_CACHE).then(cache => {
          if (e.request.headers.get('accept').includes('text/html')) {
            return cache.match('/offline');
          }

          if (e.request.url.indexOf('bundle.css') > 0) {
            return cache.match('/app.bundle.css');
          }

          if (e.request.url.indexOf('bundle.js') > 0) {
            return cache.match('/app.bundle.js');
          }

          if (e.request.url.indexOf('neue-haas-unica-regular.woff2') > 0) {
            return cache.match('/static/fonts/neue-haas-unica-regular.woff2');
          }

          if (e.request.url.indexOf('neue-haas-unica-medium.woff2') > 0) {
            return cache.match('/static/fonts/neue-haas-unica-medium.woff2');
          }
        });
      })
  );
});
