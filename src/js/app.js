import Smoothscroll from 'smoothscroll-polyfill';
import Controllers from './controllers/Controllers';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  // const isChrome = !!window.chrome && !!window.chrome.webstore;
  // const isFirefox = typeof InstallTrigger !== 'undefined';
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  console.log(isSafari);

  if (!isSafari) {
    console.log('Service worker init');
    createServiceWorker();
  }

  window.addEventListener('load', () => {
    Smoothscroll.polyfill();

    Controllers['app'].init();
    Controllers['index'].init();
  });

})();