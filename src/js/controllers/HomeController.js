import Slider from '../lib/Slider.js';

const HomeController = (() => {
  const _createStickyColumn = () => {
    const COL_1 = document.querySelector('[data-grid-column="1"]');
    // const COL_2 = document.querySelector('[data-grid-column="2"]');

    // Compare COLs. Check which container is the smallest
    // Set that element to position: sticky and with a top offset

    COL_1.style.top = `-${COL_1.offsetHeight - window.innerHeight}px`;
  };


  let ticking = false;
  const SITE_HEADER = document.querySelector('[data-site-header]');
  // Pick better names for these units
  const TOGGLE_LOGO = document.querySelector('[data-toggle-display="logo"]');
  const TOGGLE_MENU = document.querySelector('[data-toggle-display="menu"]');
  const SITE_HEADER_TOGGLE_CLASS = 'siteHeader__logo--isInvisible';
  const MENU_BURGER_TOGGLE_CLASS = 'menu__burger--isInvisible';

  // Make global function / import
  const requestTick = (cb) => {
    if (!ticking) {
      requestAnimationFrame(cb);
    }
    ticking = true
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

  const toggleElements = (e) => {
    requestTick(_eventsCB);
  };

  const _toggleDisplay = () => {
    // use Intersection Observer as well
    window.addEventListener('scroll', toggleElements);
    window.addEventListener('resize', toggleElements);
    toggleElements();

    const _cb = (mutationsList) => {
      if (mutationsList[0].removedNodes.length > 0) {
        if (window.location.pathname === '/') {
          _handleToggleClasses('add');
        } else {
          window.removeEventListener('scroll', toggleElements);
          window.removeEventListener('resize', toggleElements);
          _handleToggleClasses('remove');
        }
      }
    };

    const MO = new MutationObserver(_cb);
    // Observe a different element/change selector
    MO.observe(document.querySelector('main'), { childList: true });
  };

  const construct = () => {
    _createStickyColumn();
    // Improve this crappy naming
    _toggleDisplay();
    Slider.init();
  };

  return {
    init: construct
  };
})();

export default HomeController;