import Menu from './lib/Menu.js';
import Router from './lib/Router.js';
import Spinner from './lib/Spinner.js';

import { createServiceWorker } from './utils/createServiceWorker.js';


const App = (() => {
  console.log('[App] Service Worker enabled > JS/CSS still disabled');
  createServiceWorker();

  const _detectIE = () => {
    const UA = window.navigator.userAgent;

    if (UA.indexOf('MSIE ') > 0 || UA.indexOf('Trident/') > 0) {
      return true;
    }
  };

  window.addEventListener('load', e => {

    // Show 'change browser' text if using IE
    // Move this to inline script? First thing the user sees.
    // If not IE, set spinner and cool splash stuff in same script.
    // Write ES5 code for this.
    _detectIE()
      ? console.log('[App] Is IE')
      : console.log('[App] Is not IE');

    const MENU = Menu();
    const ROUTER = Router();
    const SPINNER = Spinner();

    // Add LOADING letter sequentially. Change tot LOADED on load.
    // Show spinner
    const SPLASH = document.querySelector('[data-splash]');
    SPLASH.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));

    setTimeout(() => {
      MENU.init();
      ROUTER.init();
      SPINNER.init();
      SPLASH.classList.remove('splash--isVisible');
      document.body.removeAttribute('style');
    }, 1500);
  });

})();