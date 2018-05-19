import Menu from './lib/Menu.js';
import Router from './lib/Router.js';
import Spinner from './lib/Spinner.js';

import { createServiceWorker } from './utils/createServiceWorker.js';


const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  window.addEventListener('load', e => {
    const menu = Menu();
    const router = Router();
    const spinner = Spinner();

    // Add LOADING letter sequentially. Change tot LOADED on load.
    // Show spinner
    const splash = document.querySelector('[data-splash]');
    // splash.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));

    setTimeout(() => {
      menu.init();
      router.init();
      spinner.init();
      splash.classList.remove('splash--isVisible');
      document.body.removeAttribute('style');
      document.body.removeAttribute('class');
    }, 1500);
  });

})();