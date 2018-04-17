import Menu from './lib/Menu.js';
import Router from './lib/Router.js';

import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  // window.addEventListener('DOMContentLoaded', e => document.body.classList.add('u-isUnscrollable'));

  window.addEventListener('load', e => {
    const MENU = Menu();
    const ROUTER = Router();
    const SPLASH = document.querySelector('[data-splash]');

    SPLASH.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));

    setTimeout(() => {
      MENU.init();
      ROUTER.init();
      SPLASH.classList.remove('splash--isVisible');
      document.body.removeAttribute('style');
    }, 1500);
  });

})();