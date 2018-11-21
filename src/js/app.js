import Smoothscroll from 'smoothscroll-polyfill';
import Controllers from './controllers/Controllers';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  console.log('[App] Check JSON-LD, canonical links and inline fonts');

  const isChrome = !!window.chrome && !!window.chrome.webstore;
  const isFirefox = typeof InstallTrigger !== 'undefined';

  if (isChrome || isFirefox) {
    createServiceWorker();
  }

  window.addEventListener('load', () => {
    Smoothscroll.polyfill();

    Controllers['app'].init();
    Controllers['index'].init();
  });

})();