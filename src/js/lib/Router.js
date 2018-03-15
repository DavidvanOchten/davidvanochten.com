import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';
import { afterViewRemoval } from '../utils/afterViewRemoval.js';
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

  const _switchViews = (e) => {
    e.preventDefault();

    const LINK = e.currentTarget;
    const URL = LINK.href;

    if (URL === window.location.href) {
      Scroller.init({ target: document.body });
      return;
    }

    _setLoader(true);
    // Pointer event none for all links. Change cursor
    // Reset this in the catch.
    // E.g. _disableLinks(true) and _disableLinks(false)

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
        const VIEW_NAME = view.dataset.view
        window.history.pushState(null, null, URL);

        afterViewRemoval(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          view.classList.add(VIEW_ACTIVE_CLASS);
        });

        _setUpView(VIEW_NAME);
        document.title = `${VIEW_NAME.substr(0, 1).toUpperCase() + VIEW_NAME.substr(1)} | David van Ochten`;
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

  const _construct = () => {
    const VIEW = document.querySelector(VIEW_SELECTOR);
    VIEW.classList.add(VIEW_ACTIVE_CLASS);
    _setUpView(VIEW.dataset.view);

    window.addEventListener('popstate', e => window.location = window.location.href);
  };

  return {
    init: _construct
  };
})();

export default Router;