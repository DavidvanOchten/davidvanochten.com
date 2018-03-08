import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';
import { appendContent } from '../utils/appendContent.js';
import { removeContent } from '../utils/removeContent.js';
import { showError } from '../utils/showError.js';

const Router = (() => {
  const LINK_ACTIVE_CLASS = 'menu__link--isActive';
  const VIEW_ACTIVE_CLASS = 'is-active';
  const VIEW_SELECTOR = '[data-view]';
  const VIEW_PARENT_SELECTOR = 'main';

  const _setLoader = (loadState) => {
    const LOADER = document.querySelector('[data-loader]');

    loadState === true
      ? LOADER.classList.add('loader--isActive')
      : LOADER.classList.remove('loader--isActive');
  };

  const _createRouterLinks = () => {
    const ROUTER_LINKS = [...document.querySelectorAll('a:not([data-bypass])')];
    ROUTER_LINKS.map(link => link.addEventListener('click', _switchViews));
  };

  const _setActiveNavLink = () => {
    const MENU_LINKS = [...document.querySelectorAll('[data-menu="link"]')];
    const TARGET_LINK = MENU_LINKS.filter(link => {
      return link.pathname.split('/')[1] === window.location.pathname.split('/')[1];
    })[0];

    MENU_LINKS.map((link) => {
      if (link.classList.contains(LINK_ACTIVE_CLASS)) {
        link.classList.remove(LINK_ACTIVE_CLASS);
      }
    });
    
    TARGET_LINK.classList.add(LINK_ACTIVE_CLASS);
  };

  const _setActiveView = (view) => {
    const _onRemovedView = (mutationsList) => {
      if (mutationsList[0].removedNodes.length > 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        view.classList.add(VIEW_ACTIVE_CLASS);
      }
    };

    const MO = new MutationObserver(_onRemovedView);
    MO.observe(view.parentNode, {childList: true});
  };

  const _switchViews = (e) => {
    e.preventDefault();

    const LINK = e.currentTarget;
    const URL = LINK.href;

    if (URL === window.location.href) {
      Scroller.init({ target: document.body });
      return;
    }

    _setLoader(true);

    axios.get(URL)
      .then((resp) => {
        const DOM_DATA = {
          targetNode: VIEW_SELECTOR,
          parentNode: VIEW_PARENT_SELECTOR,
          activeClass: VIEW_ACTIVE_CLASS
        };

        removeContent(DOM_DATA);
        return appendContent(resp.data, DOM_DATA);
      })
      .then((view) => {
        window.history.pushState(null, null, URL);
        // Set a default title?
        _setActiveView(view);
        _setUpView(view.dataset.view);
        _setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        _setLoader(false);
        showError(err);
      });
  };

  const _setUpView = (view) => {
    _setActiveNavLink();
    _createRouterLinks();

    Controllers['base'].init();
    Controllers[view].init();
  };

  const construct = () => {
    const VIEW = document.querySelector(VIEW_SELECTOR);
    VIEW.classList.add(VIEW_ACTIVE_CLASS);
    _setUpView(VIEW.dataset.view);

    window.addEventListener('popstate', (e) => {
      const _setWindowLocation = () => {
        _setLoader(false);
        window.location = window.location.href;
      };

      const DOM_DATA = {
        targetNode: VIEW_SELECTOR,
        parentNode: VIEW_PARENT_SELECTOR,
        activeClass: VIEW_ACTIVE_CLASS,
        cb: _setWindowLocation
      };

      _setLoader(true);
      removeContent(DOM_DATA);
      // TODO: Fix back/forward button error (especially Firefox)
    });
  };

  return {
    init: construct
  };
})();

export default Router;