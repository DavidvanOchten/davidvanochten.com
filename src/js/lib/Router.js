import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';

import { showSpinner } from '../utils/showSpinner.js';
import { showNotification } from '../utils/showNotification.js';

const Router = () => {

  const ROUTER = {
    VIEW_SELECTOR: '[data-view]',
    VIEW_PARENT: document.querySelector('[data-main]'),
    ACTIVE_VIEW_CLASS: 'page--isVisible'
  };

  const MENU = {
    ACTIVE_LINK_CLASS: 'menu__link--isActive'
  }

  const _appendView = (data) => {
    const PARSER = new DOMParser();
    const DOC = PARSER.parseFromString(data, 'text/html');
    const CONTENT = DOC.querySelector(ROUTER.VIEW_SELECTOR);
    return ROUTER.VIEW_PARENT.appendChild(CONTENT);
  };

  const _removeView = () => {
    return new Promise((resolve, reject) => {
      let removableElm = document.querySelector(ROUTER.VIEW_SELECTOR);
      removableElm.classList.remove(ROUTER.ACTIVE_VIEW_CLASS);

      // Fallback used, transitionend solution behaves inconsistently
      setTimeout(() => {
        ROUTER.VIEW_PARENT.removeChild(removableElm);
        removableElm = null;
        resolve();
      }, 500);
    });
  };

  const _disableRouterLinks = (status) => {
    ROUTER.LINKS.map(item => {
      status === true
        ? item.classList.add('u-isUnclickable')
        : item.classList.remove('u-isUnclickable');
    });
  };

  const _switchViews = (e) => {
    e.preventDefault();

    // (e.currentTarget === window)
    //   ? ROUTER.TARGET_URL = e.currentTarget.location.href
    //   : ROUTER.TARGET_URL = e.currentTarget.href;

    ROUTER.TARGET_URL = e.currentTarget.href;

    if (ROUTER.TARGET_URL === window.location.href) {
      Scroller({ id: 'top' }).scroll();
      return;
    } // "Scroll to top" functionality kicks in if the user is already on the requested page

    showSpinner(true);
    _disableRouterLinks(true);

    window.history.pushState(null, null, ROUTER.TARGET_URL); // Set this before _removeView

    _removeView()
      .then(() => axios.get(ROUTER.TARGET_URL))
      .then(resp => _appendView(resp.data))
      .then(view => {
        ROUTER.VIEW = view;

        const VIEW_NAME = ROUTER.VIEW.dataset.view;
        document.title = `${VIEW_NAME.substr(0, 1).toUpperCase() + VIEW_NAME.substr(1)} | David van Ochten`;

        document.documentElement.scrollTop = 0; // Desktop
        document.body.scrollTop = 0; // Safari mobile

        showSpinner(false);
        _setUpView();
        _disableRouterLinks(false);
      })
      .catch(err => {
        console.log(err);

        showSpinner(false);
        showNotification('error');
        _disableRouterLinks(false);
      });
  };

  const _createRouterLinks = () => {
    ROUTER.LINKS = [].slice.call(document.querySelectorAll('a:not([data-bypass])'));
    ROUTER.LINKS.map(link => link.addEventListener('click', _switchViews));
  };

  const _setActiveNavLink = () => {
    if (ROUTER.VIEW.dataset.view === 'offline' || ROUTER.VIEW.dataset.view === 'error') {
      return;
    }

    MENU.LINKS.map(link => {
      if (link.classList.contains(MENU.ACTIVE_LINK_CLASS)) {
        link.classList.remove(MENU.ACTIVE_LINK_CLASS);
      }
    });

    const TARGET_LINK = MENU.LINKS.filter(link => {
      return link.pathname.split('/')[1] === window.location.pathname.split('/')[1];
    })[0];

    TARGET_LINK.classList.add(MENU.ACTIVE_LINK_CLASS);
  };

  const _setUpView = () => {
    Controllers['base'].init(); // Intializes base functions required for all views
    Controllers[ROUTER.VIEW.dataset.view].init(); // Intializes view-specific functions

    _createRouterLinks();
    _setActiveNavLink();

    ROUTER.VIEW.classList.add(ROUTER.ACTIVE_VIEW_CLASS); // Show view to user
  };

  const construct = () => {
    ROUTER.VIEW = document.querySelector(ROUTER.VIEW_SELECTOR);
    MENU.LINKS = [].slice.call(document.querySelectorAll('[data-menu="link"]'));

    _setUpView();

    // window.addEventListener('popstate', _switchViews);

    window.addEventListener('popstate', e => {
      document.body.style.visibility = 'hidden';
      window.location = window.location.href;
    }); // Use normal page loading whenever the user uses the back/forward buttons
  };

  return {
    init: construct
  };
};

export default Router;