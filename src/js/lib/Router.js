import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';

import { showNotification } from '../utils/showNotification.js';

const Router = () => {

  const router = {
    viewSelector: '[data-view]',
    viewParent: document.querySelector('[data-main]'),
    activeViewClass: 'page--isVisible'
  };

  const menu = {
    activeLinkClass: 'menu__link--isActive'
  };

  const _appendView = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const content = doc.querySelector(router.viewSelector);
    return router.viewParent.appendChild(content);
  };

  const _removeView = () => {
    return new Promise((resolve, reject) => {
      let removableElm = document.querySelector(router.viewSelector);
      removableElm.classList.remove(router.activeViewClass);

      removableElm.addEventListener('transitionend', e => {
        if (e.target === removableElm) {
          router.viewParent.removeChild(removableElm);
          removableElm = null;
          resolve();
        }
      });
    });
  };

  const _switchViews = (e) => {
    e.preventDefault();

    // (e.currentTarget === window)
    //   ? router.targetUrl = e.currentTarget.location.href
    //   : router.targetUrl = e.currentTarget.href;

    router.targetUrl = e.currentTarget.href;

    if (router.targetUrl === window.location.href) {
      Scroller({ id: 'top' }).scroll();
      return;
    }

    spinner.show(true);

    window.history.pushState(null, null, router.targetUrl); // Set this before _removeView

    _removeView()
      .then(() => axios.get(router.targetUrl))
      .then(resp => _appendView(resp.data))
      .then(view => {
        router.view = view;

        const viewName = router.view.dataset.view;
        document.title = `${viewName.substr(0, 1).toUpperCase() + viewName.substr(1)} | David van Ochten`;

        document.documentElement.scrollTop = 0; // Desktop
        document.body.scrollTop = 0; // Safari mobile

        spinner.show(false);
        _setUpView();
      })
      .catch(err => {
        console.log(err);
        spinner.show(false);
        showNotification('error');
      });
  };

  const _createRouterLinks = () => {
    router.links = [].slice.call(document.querySelectorAll('a:not([data-bypass])'));
    router.links.map(link => link.addEventListener('click', _switchViews));
  };

  const _setActiveNavLink = () => {
    if (router.view.dataset.view === 'offline' || router.view.dataset.view === 'error') {
      return;
    }

    menu.links.map(link => {
      if (link.classList.contains(menu.activeLinkClass)) {
        link.classList.remove(menu.activeLinkClass);
      }
    });

    const targetLink = menu.links.filter(link => {
      return link.pathname.split('/')[1] === window.location.pathname.split('/')[1];
    })[0];

    targetLink.classList.add(menu.activeLinkClass);
  };

  const _setUpView = () => {
    Controllers['base'].init();
    Controllers[router.view.dataset.view].init();

    _createRouterLinks();
    _setActiveNavLink();

    router.view.classList.add(router.activeViewClass);
  };

  const construct = () => {
    router.view = document.querySelector(router.viewSelector);
    menu.links = [].slice.call(document.querySelectorAll('[data-menu="link"]'));

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