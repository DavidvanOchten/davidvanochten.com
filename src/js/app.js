import Menu from './lib/Menu.js';
import Router from './lib/Router.js';
import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  window.addEventListener('DOMContentLoaded', e => document.body.classList.add('u-isUnscrollable'));

  window.addEventListener('load', () => {
    // Add splash screen directly inline.
    const SPLASH = document.querySelector('[data-splash]');
    SPLASH.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));

    setTimeout(() => {
      SPLASH.classList.remove('splash--isVisible');
      document.body.classList.remove('u-isUnscrollable');

      Router.init();
      Menu.init();
    }, 1500);
  });

})();