import Menu from './lib/Menu.js';
import Router from './lib/Router.js';
import { createServiceWorker } from './utils/createServiceWorker.js';

const App = (() => {
  console.log('[App] Service Worker disabled > JS/CSS still disabled');
  // Check if I want animations still and make the Service Worker 100% again
  // i.e. with indexedDB support. If so, change lazy load strategy to an infinite loader situation
  // Load the first 3 images of the pages and lazyload the rest dynamically?

  // Or only use it to store static files, like CSS, JS and fonts.
  // Maybe also still use the offline page.
  createServiceWorker();

  window.addEventListener('DOMContentLoaded', e => document.body.classList.add('u-isUnscrollable'));
  window.addEventListener('load', () => {
    const SPLASH = document.querySelector('[data-splash]');
    SPLASH.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));

    setTimeout(() => {
      SPLASH.classList.remove('splash--isVisible');
      document.body.classList.remove('u-isUnscrollable');
      console.log('[App] Init Router and Menu after splash');
      Router.init();
      Menu.init();
    }, 1500);

    // Router.init();
    // Menu.init();
  });

})();