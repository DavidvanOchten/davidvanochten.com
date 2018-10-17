import axios from 'axios';
import Controllers from '../controllers/Controllers';

import { appendView } from '../utils/appendView';
import { removeView } from '../utils/removeView';
import { handleFetchError } from '../utils/handleFetchError';

const Router = () => {
  const router = {};

  const _disableUserInput = (bool) => {
    if (bool === true) {
      router.isBusy = true;
      document.body.classList.add('u-is-loading');
    } else {
      router.isBusy = false;
      document.body.classList.remove('u-is-loading');
    }
  };

  const _activateNewView = (view) => {
    router.view = view;
    router.viewName = router.view.dataset.view;

    document.title = `${router.viewName.substr(0, 1).toUpperCase() + router.viewName.substr(1)} — David van Ochten`;
    window.history.pushState(null, null, router.targetUrl);

    if (window.getComputedStyle(router.view).width) {
      _setUpView();
    }

    _disableUserInput(false);
  };

  const _setNewView = () => {
    removeView(router.view, router.activeViewClass)
      .then(() => axios.get(router.targetUrl))
      .then(resp => appendView(resp.data, router.siteContent))
      .then(view => _activateNewView(view))
      .catch(err => {
        _disableUserInput(false);
        handleFetchError(err);
      });
  }

  const _onRouterLinkClick = (e) => {
    e.preventDefault();

    if (router.isBusy) {
      return;
    }

    router.clickedLink = e.currentTarget;
    router.targetUrl = router.clickedLink.href;

    _disableUserInput(true);
    _setNewView();
  };

  const _createRouterLinks = () => {
    router.links = [].slice.call(document.querySelectorAll('a:not([data-bypass])'));
    router.links.forEach(link => link.addEventListener('click', _onRouterLinkClick));
  };

  const _setUpView = () => {
    Controllers['app'].init();
    Controllers[router.viewName].init();

    router.activeViewClass = `view--${router.viewName}`;

    _createRouterLinks();

    router.view.classList.add(router.activeViewClass);
  };

  const construct = () => {
    router.siteContent = document.querySelector('[data-site-content]');
    router.view = router.siteContent.querySelector('[data-view]');
    router.viewName = router.view.dataset.view;

    _setUpView();

    window.addEventListener('popstate', () => {
      document.body.style.visibility = 'hidden';
      window.location = window.location.href;
    });
  };

  return {
    init: construct
  };
};

export default Router;