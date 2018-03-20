import Slider from '../lib/Slider.js';
import { afterViewRemoval } from '../utils/afterViewRemoval.js';

const IndexController = (() => {
  let minScreenSize = window.innerWidth >= 600;
  let stickyColumn = null;
  let ticking = false;

  const SITE_HEADER = document.querySelector('[data-site-header]');
  const TOGGLE_LOGO = document.querySelector('[data-toggle-display="logo"]');
  const TOGGLE_MENU = document.querySelector('[data-toggle-display="menu"]');
  const SITE_HEADER_TOGGLE_CLASS = 'siteHeader__logo--isInvisible';
  const MENU_BURGER_TOGGLE_CLASS = 'menu__burger--isInvisible';

  const _removeCreateStickyColumn = () => {
    if (stickyColumn) {
      stickyColumn.style.top = '';
    }
  };

  const _removeToggleDisplay = () => {
    window.removeEventListener('scroll', _toggleElements);
    window.removeEventListener('resize', _toggleElements);
    _handleToggleClasses('remove');
  };

  const _handleToggleClasses = (action) => {
    if (action === 'add') {
      TOGGLE_LOGO.classList.add(SITE_HEADER_TOGGLE_CLASS);
      TOGGLE_MENU.classList.add(MENU_BURGER_TOGGLE_CLASS);
    }

    if (action === 'remove') {
      TOGGLE_LOGO.classList.remove(SITE_HEADER_TOGGLE_CLASS);
      TOGGLE_MENU.classList.remove(MENU_BURGER_TOGGLE_CLASS);
    }
  };

  const _eventsCB = () => {
    ticking = false;
    const TOGGLE_TRIGGER = document.querySelector('[data-toggle-display="trigger"]');

    if (TOGGLE_TRIGGER.getBoundingClientRect().bottom <= SITE_HEADER.offsetHeight) {
      if (!TOGGLE_MENU.classList.contains(MENU_BURGER_TOGGLE_CLASS)) {
        return;
      }
      _handleToggleClasses('remove');
    } else {
      _handleToggleClasses('add');
    }
  };

  const _requestTick = (cb) => {
    if (!ticking) {
      requestAnimationFrame(cb);
    }
    ticking = true
  };

  const _toggleElements = (e) => {
    _requestTick(_eventsCB);
  };

  const _toggleDisplay = () => {
    // Use Intersection Observer as well
    window.addEventListener('scroll', _toggleElements);
    window.addEventListener('resize', _toggleElements);
    _toggleElements();
  };

  const _createStickyColumn = () => {
    const COL_1 = document.querySelector('[data-grid-column="1"]');
    const COL_2 = document.querySelector('[data-grid-column="2"]');

    COL_1.offsetHeight < COL_2.offsetHeight
      ? stickyColumn = COL_1
      : stickyColumn = COL_2

    stickyColumn.style.top = `-${stickyColumn.offsetHeight - window.innerHeight}px`;
  };

  const _constructForMinSize = () => {
    minScreenSize = window.innerWidth >= 600;

    if (minScreenSize) {
      _createStickyColumn();
      _toggleDisplay();
    } else {
      _removeCreateStickyColumn();
      _removeToggleDisplay();
    }

    afterViewRemoval(() => {
      console.log('test');
      if (minScreenSize) {
        if (window.location.pathname === '/') {
          _handleToggleClasses('add');
        } else {
          _removeToggleDisplay();
          window.removeEventListener('resize', _constructForMinSize);
        }
      }
    });
  };

  const construct = () => {
    _constructForMinSize();
    window.addEventListener('resize', _constructForMinSize);
    Slider.init();
  };

  return {
    init: construct
  };
})();

export default IndexController;