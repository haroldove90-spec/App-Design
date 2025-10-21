const CACHE_NAME = 'invoice-generator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/types.ts',
  '/App.tsx',
  '/components/History.tsx',
  '/components/InvoiceForm.tsx',
  '/components/ItemsTable.tsx',
  '/components/PrintableInvoice.tsx',
  '/components/InstallPwaPrompt.tsx',
  '/icon.svg'
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have a match in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request).then(
          networkResponse => {
            // We are not adding new network responses to the cache here to keep it simple,
            // the cache is only populated on install.
            return networkResponse;
          }
        ).catch(error => {
          // fetch failed, probably offline
          console.log('Fetch failed; app is running in offline mode from cache.', error);
        });
      })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});