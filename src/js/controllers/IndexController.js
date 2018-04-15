import Scroller from '../lib/Scroller.js';
import Slider from '../lib/Slider.js';
import { afterViewRemoval } from '../utils/afterViewRemoval.js';

const IndexController = (() => {
  let minScreenSize = window.innerWidth >= 600;
  let stickyColumn = null;
  let ticking = false;

  // IMPROVE THIS TOGGLE NAMING STUFF
  const SITE_HEADER = document.querySelector('[data-toggle-display="header"]');
  const SITE_HEADER_TOGGLE_CLASS = 'siteHeader--isInvisible';

  const _removeCreateStickyColumn = () => {
    if (stickyColumn) {
      stickyColumn.style.top = '';
    }
  };


  // IMPROVE THIS TOGGLE NAMING STUFF
  const _removeToggleDisplay = () => {
    window.removeEventListener('scroll', _toggleElements);
    window.removeEventListener('resize', _toggleElements);
    _handleToggleClasses('remove');
  };

  const _handleToggleClasses = (action) => {
    if (action === 'add') {
      SITE_HEADER.classList.add(SITE_HEADER_TOGGLE_CLASS);
    }

    if (action === 'remove') {
      SITE_HEADER.classList.remove(SITE_HEADER_TOGGLE_CLASS);
    }
  };

  const _eventsCB = () => {
    ticking = false;
    const TOGGLE_TRIGGER = document.querySelector('[data-toggle-display="trigger"]');

    if (TOGGLE_TRIGGER.getBoundingClientRect().bottom <= SITE_HEADER.offsetHeight) {
      // if (!SITE_HEADER.classList.contains(SITE_HEADER_TOGGLE_CLASS)) {
      //   return;
      // }
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
    const COL_1 = document.querySelector('[data-index-column="1"]');
    const COL_2 = document.querySelector('[data-index-column="2"]');

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
    
    const scrollTopBtn = document.querySelector('[data-scroller="top"]');
    scrollTopBtn.addEventListener('click', (e) => {
      Scroller.init({ target: document.body });
    });
  };

  return {
    init: construct
  };
})();

export default IndexController;