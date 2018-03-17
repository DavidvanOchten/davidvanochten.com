importScripts('/idb/core.js');
importScripts('/idb/utils.js');

const DYNAMIC_CACHE = 'dynamic_01';
const STATIC_CACHE = 'static_01';
const STATIC_FILES = [
  // '/',
  // '/work',
  // '/offline',
  // '/app.bundle.css',
  // '/app.bundle.js',
  // 'https://www.gstatic.com/firebasejs/4.11.0/firebase.js', // Fix CORS error
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


/**
 *  Use older videos from Udemy to use all the static files from the cache if offline
 */
// self.addEventListener('fetch', (e) => {
//   e.respondWith(
//     fetch(e.request)
//       .then((resp) => {
//         console.log('Fetched stuff');
//         return resp;
//       })
//       .catch((err) => {
//         return caches.open(STATIC_CACHE)
//           .then((cache) => {
//             // Make below better
//             if (e.request.headers.get('accept').includes('text/html')) {
//               return cache.match('/offline');
//             }
//             if (e.request.headers.get('accept').includes('text/css')) {
//               return cache.match('/app.bundle.css');
//             }
//             // JS file from cache doesn't work.
//             if (e.request.headers.get('accept').includes('application/javascript')) {
//               return cache.match('/app.bundle.js');
//             }
//         })
//       })
//   );
// });

// self.addEventListener('fetch', (e) => {
//   const url = 'https://vue-admin.firebaseio.com/';

//   if (e.request.url.indexOf(url) > -1) {
//     e.respondWith(
//       fetch(e.request)
//         .then((resp) => {
//           const respClone = resp.clone();
//           clearAllData('work')
//             .then(() => respClone.json())
//             .then((data) => {
//               for (const key in data) {
//                 writeData('work', data[key]);
//               }
//             });
//           return resp;
//         })
//     );
//   } else {
//     e.respondWith(
//       caches.match(e.request)
//         .then((resp) => {
//           if (resp) {
//             return resp;
//           } else {
//             return fetch(e.request)
//               .then((res) => {
//                 return caches.open(DYNAMIC_CACHE)
//                   .then((cache) => {
//                     cache.put(e.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch((err) => {
//                 return caches.open(STATIC_CACHE)
//                   .then((cache) => {
//                     if (e.request.headers.get('accept').includes('text/html')) {
//                       return cache.match('/offline');
//                     }
//                   })
//               });
//           }
//         })
//     );
//   }
// });