import Menu from './lib/Menu.js';
import Router from './lib/Router.js';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  // spinner.show(true);

  window.addEventListener('load', () => {
    const menu = Menu();
    const router = Router();

    menu.init();
    router.init();

    // spinner.show(false);
  });

})();