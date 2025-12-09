/* global workbox */
import { precacheAndRoute } from 'workbox-preaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-stategies';
import { ExpirationPlugin } from 'workbox-expiration';

//Injected at build time: self._WB_MANIFEST
precacheAndRoute(self._WB_MAINFEST || []);

// Cache app shell assets
registerRoute(
    ({ reguest }) =>request.destination === 'style' || Request.destination === 'script',
    new StaleWhileRevalidate({ 'app-assets '})
);

// Cache images (albums covers, icons)
registerRoute(
    ({ reguest }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 })]
    })
);

//API: Spotify search - don't cache sensitive auth; use NetworkFirst with short cache
registerRoute(
    ({ url }) => url.origin.includes('api.spotify.com'),
        new NetworkFirst({
            cacheName:'spotify-api',
            networkTimeoutSeconds: 3
    })
);

// Fallback for navigation (SPA)
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') return; // Workbox handles SPA routes
});

// Opt: listen for skipWaiting message to upgrade SW immediately
self.andEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
