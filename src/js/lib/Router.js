import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';
import { afterViewRemoval } from '../utils/afterViewRemoval.js';
import { appendContent } from '../utils/appendContent.js';
import { removeContent } from '../utils/removeContent.js';
import { setSpinner } from '../utils/setSpinner.js';
import { showNotification } from '../utils/showNotification.js';

const Router = (() => {
  const LINK_ACTIVE_CLASS = 'menu__link--isActive';
  const VIEW_ACTIVE_CLASS = 'is-active';
  const VIEW_SELECTOR = '[data-view]';
  const VIEW_PARENT_SELECTOR = 'main';
  const VIEW_UPDATE_OPTIONS = {
    targetNode: VIEW_SELECTOR,
    parentNode: VIEW_PARENT_SELECTOR,
    activeClass: VIEW_ACTIVE_CLASS
  };

  const _appendView = (data) => {
    const { targetNode, parentNode } = VIEW_UPDATE_OPTIONS;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const content = doc.querySelector(targetNode);
    console.log('[Router] 4');
    return document.querySelector(parentNode).appendChild(content);
  };

  const _removeView = () => {
    return new Promise((resolve, reject) => {
      const { targetNode, parentNode, activeClass } = VIEW_UPDATE_OPTIONS;
      const removableElement = document.querySelector(targetNode);
      removableElement.addEventListener('transitionend', (e) => {
        console.log('[Router] 2');
        document.querySelector(parentNode).removeChild(removableElement);
        resolve();
      });
  
      removableElement.classList.remove(activeClass);
    });
  };

  const _disableRouterLinks = (status) => {
    const ROUTER_LINKS = [...document.querySelectorAll('a:not([data-bypass])')];

    ROUTER_LINKS.map((item) => {
      status === true
        ? item.classList.add('u-isUnclickable')
        : item.classList.remove('u-isUnclickable');
    })
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

    setSpinner(true);
    _disableRouterLinks(true);

    let newView = null;

    axios.get(URL)
      .then((resp) => {
        console.log('[Router] 1');
        newView = resp.data;
        window.history.pushState(null, null, URL);
        return _removeView();
      })
      .then(() => {
        console.log('[Router] 3');
        return _appendView(newView);
      })
      .then((view) => {
        const VIEW_NAME = view.dataset.view;
        // window.history.pushState(null, null, URL);
        document.title = `${VIEW_NAME.substr(0, 1).toUpperCase() + VIEW_NAME.substr(1)} | David van Ochten`;

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log('[Router] 5');
        view.classList.add(VIEW_ACTIVE_CLASS);
        _setUpView(VIEW_NAME);
        setSpinner(false);
        _disableRouterLinks(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        _disableRouterLinks(false);
        showNotification('error');
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

    window.addEventListener('popstate', e => {
      document.body.style.visibility = 'hidden';
      window.location = window.location.href;
    });
  };

  return {
    init: _construct
  };
})();

export default Router;