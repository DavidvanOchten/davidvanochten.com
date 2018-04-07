import axios from 'axios';
import Controllers from '../controllers/Controllers.js';
import Scroller from '../lib/Scroller.js';
import { afterViewRemoval } from '../utils/afterViewRemoval.js';
import { setSpinner } from '../utils/setSpinner.js';
import { showNotification } from '../utils/showNotification.js';

const Router = (() => {
  // Router constants
  const LINK_ACTIVE_CLASS = 'menu__link--isActive';
  const VIEW_ACTIVE_CLASS = 'page--isVisible';
  const VIEW_SELECTOR = '[data-view]';
  const VIEW_PARENT_SELECTOR = 'main';


  /**
   * 8) Creates the new view and adds it to the DOM
   * @param {*} data The view source
   */
  const _appendView = (data) => {
    const PARSER = new DOMParser();
    const DOC = PARSER.parseFromString(data, 'text/html');
    const CONTENT = DOC.querySelector(VIEW_SELECTOR);
    return document.querySelector(VIEW_PARENT_SELECTOR).appendChild(CONTENT);
  };

  /**
   * 7) Resolves promise when the view has been removed from the DOM
   * TODO: Figure out why the transitionend doesn't work as expected
   */
  const _removeView = () => {
    return new Promise((resolve, reject) => {
      let removableElm = document.querySelector(VIEW_SELECTOR);

      // removableElm.addEventListener('transitionend', (e) => {
      //   console.log('[Router] Wait for transition to end before doing anything');
      //   document.querySelector(VIEW_PARENT_SELECTOR).removeChild(removableElm);
      //   removableElm = null;
      //   console.log(removableElm);
      //   resolve();
      // });
      
      removableElm.classList.remove(VIEW_ACTIVE_CLASS);

      // Fallback used
      setTimeout(() => {
        document.querySelector(VIEW_PARENT_SELECTOR).removeChild(removableElm);
        removableElm = null;
        resolve();
      }, 500);
    });
  };

  /**
   * 6) Toggles the interactiveness of the router links
   * @param {*} status Boolean whether the links should be disabled or not
   */
  const _disableRouterLinks = (status) => {
    const ROUTER_LINKS = [...document.querySelectorAll('a:not([data-bypass])')];

    ROUTER_LINKS.map((item) => {
      status === true
        ? item.classList.add('u-isUnclickable')
        : item.classList.remove('u-isUnclickable');
    })
  };

  /**
   * 5) Handles the page transitions
   * @param {*} e Event object from the clicked router link
   */
  const _switchViews = (e) => {
    e.preventDefault();

    const LINK = e.currentTarget;
    const URL = LINK.href;

    if (URL === window.location.href) {
      Scroller.init({ target: document.body });
      return;
    } // "Scroll to top" functionality kicks in if the user is already on the requested page

    setSpinner(true); // Import
    _disableRouterLinks(true); // 6

    let newView = null;
    window.history.pushState(null, null, URL); // Set this before _removeView

    _removeView() // 7
      .then(() => {
        return axios.get(URL);
      })
      .then((resp) => {
        newView = resp.data;
        return _appendView(newView); // 8
      })
      .then((view) => {
        const VIEW_NAME = view.dataset.view;

        document.title = `${VIEW_NAME.substr(0, 1).toUpperCase() + VIEW_NAME.substr(1)} | David van Ochten`;
        document.documentElement.scrollTop = 0; // Desktop
        document.body.scrollTop = 0; // Safari mobile

        setSpinner(false);
        _setUpView(view);
        _disableRouterLinks(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        _disableRouterLinks(false);
        showNotification('error'); // Import
      });
  };

  /**
   * 4) Creates links that trigger the page transitions
   */
  const _createRouterLinks = () => {
    const ROUTER_LINKS = [...document.querySelectorAll('a:not([data-bypass])')];
    ROUTER_LINKS.map(link => link.addEventListener('click', _switchViews)); // 5
  };

  /**
   * 3) Highlights the link for the current view
   */
  const _setActiveNavLink = () => {
    const MENU_LINKS = [...document.querySelectorAll('[data-menu="link"]')];
    const TARGET_LINK = MENU_LINKS.filter(link => {
      return link.pathname.split('/')[1] === window.location.pathname.split('/')[1];
    })[0]; // Filters out the link for the current view by comparing pathnames

    MENU_LINKS.map((link) => {
      if (link.classList.contains(LINK_ACTIVE_CLASS)) {
        link.classList.remove(LINK_ACTIVE_CLASS);
      }
    }); // Resets all links first
    
    TARGET_LINK.classList.add(LINK_ACTIVE_CLASS); // Shows active link
  };

  /**
   * 2) Sets up the view
   * @param {*} view 
   */
  const _setUpView = (view) => {
    _setActiveNavLink(); // 3
    _createRouterLinks(); // 4

    Controllers['base'].init(); // Intializes general functions
    Controllers[view.dataset.view].init(); // Intializes view-specific functions

    view.classList.add(VIEW_ACTIVE_CLASS); // Show view to user
  };

  /**
   * 1) Constructs the Router
   */
  const _construct = () => {
    const VIEW = document.querySelector(VIEW_SELECTOR);
    _setUpView(VIEW); // 2

    window.addEventListener('popstate', (e) => {
      document.body.style.visibility = 'hidden';
      window.location = window.location.href;
    }); // Use normal page loading whenever the user uses the back/forward buttons
  };

  /**
   * Defines methods for the Router.
   */
  return {
    init: _construct
  };
})();

export default Router;