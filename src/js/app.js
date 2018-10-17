import Router from './lib/Router.js';
import Smoothscroll from 'smoothscroll-polyfill';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  console.log('[App] Check JSON-LD, canonical links and inline fonts');

  createServiceWorker();

  window.addEventListener('load', () => {
    const router = Router();
    router.init();

    Smoothscroll.polyfill();
  });

})();