export const createServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('[Service Worker] Registered');
      })
      .catch((err) => {
        console.log('[Service Worker] Error: ', err);
      });
  }
};