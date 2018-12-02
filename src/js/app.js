import Smoothscroll from 'smoothscroll-polyfill';
import Controllers from './controllers/Controllers';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
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