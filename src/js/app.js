import Menu from './lib/Menu.js';
import Router from './lib/Router.js';
import Spinner from './lib/Spinner.js';

import { createServiceWorker } from './utils/createServiceWorker.js';


const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  window.addEventListener('load', () => {
    const menu = Menu();
    const router = Router();
    const spinner = Spinner();

    menu.init();
    router.init();
    spinner.init(); // Show spinner (add script header)
  });

})();