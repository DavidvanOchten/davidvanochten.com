// import Scroller from '../lib/Scroller.js';
import ScrollMotion from '../lib/ScrollMotion.js';
import Slider from '../lib/Slider.js';
import IntersectionTracker from '../lib/IntersectionTracker.js';

import { beforeViewChange } from '../utils/beforeViewChange.js';





const IndexController = (() => {

  const INDEX = {};

  const BROWSER = {
    MIN_SCREEN_SIZE: 600,
    ticking: false
  };

  const _disableStickyColumns = () => {
    if (INDEX.STICKY_COLUMN !== null) {
      INDEX.STICKY_COLUMN.style.top = '';
    }
  };

  const _disableScrollMotion = () => {
    INDEX.HEADER_ANIMATION.terminate();
  };

  const _createStickyColumn = () => {
    INDEX.COL_1.offsetHeight < INDEX.COL_2.offsetHeight
      ? INDEX.STICKY_COLUMN = INDEX.COL_1
      : INDEX.STICKY_COLUMN = INDEX.COL_2

    INDEX.STICKY_COLUMN_OFFSET = INDEX.STICKY_COLUMN.offsetHeight - window.innerHeight
    INDEX.STICKY_COLUMN.style.top = `-${INDEX.STICKY_COLUMN_OFFSET}px`;
  };

  const _getBottomPosition = (target) => {
    const TARGET_HEIGHT = target.offsetHeight;
    let top = 0;

    while (target) {
      top += (target.offsetTop + target.clientTop);
      target = target.offsetParent;
    }

    // Checks if the page was reloaded at a scroll position after the 'STICKY_COLUMN' got stuck.
    // This will change the value of the 'top' variable, which needs to be adjusted accordingly.
    const BOTTOM = (window.pageYOffset - INDEX.STICKY_COLUMN_OFFSET) > 0
      ? TARGET_HEIGHT + top - (window.pageYOffset - (INDEX.STICKY_COLUMN_OFFSET))
      : TARGET_HEIGHT + top;

    return BOTTOM;
  };

  const _constructForMinSize = () => {
    if (window.innerWidth >= BROWSER.MIN_SCREEN_SIZE) {
      _createStickyColumn();

      INDEX.HEADER_ANIMATION = ScrollMotion({
        element: 'header',
        end: _getBottomPosition(INDEX.HEADER_ANIMATION_TRIGGER),
        animation: {
          type: 'toggle',
          toggleClass: 'siteHeader--isInvisible'
        }
      });

      INDEX.HEADER_ANIMATION.init();

    } else {
      _disableStickyColumns();
      _disableScrollMotion();
    }

    beforeViewChange(() => {
      console.log('Before destroy')
      _disableScrollMotion();
      window.removeEventListener('resize', _constructForMinSize);
      INDEX.LAZY_LOADER.terminate();
    });
  };

  const construct = () => {
    INDEX.HEADER_ANIMATION_TRIGGER = document.querySelector('[data-trigger-animation="header"]');
    INDEX.COL_1 = document.querySelector('[data-index-column="1"]');
    INDEX.COL_2 = document.querySelector('[data-index-column="2"]');

    window.addEventListener('resize', _constructForMinSize);
    _constructForMinSize();



    // Different folder for modules/components with potentially multiple instances, like Slider?
    // Basically the non-IIFE's.
    const NOTES_SLIDER = Slider('notes');
    NOTES_SLIDER.init();


    // test callback
    let _lazyLoadImages = (val) => {

      const _addReadyClass = (img) => {
        if (window.getComputedStyle(img).width) {
          img.parentNode.classList.add('lazyLoader--isDone');
        }
      };

      const _loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const IMAGE = new Image();
          IMAGE.src = src;
          IMAGE.onload = resolve;
          IMAGE.onerror = reject;
        });
      };

      const _showImage = (img, src) => {
        img.src = src;

        img.complete
          ? _addReadyClass(img)
          : img.addEventListener('load', e => _addReadyClass(e.target));
      };

      _loadImage(val.dataset.src)
        .then(() => _showImage(val, val.dataset.src))
        .catch((err) => {
          console.log('[LazyLoader] Error: ', err);
        })
    };


    INDEX.LAZY_LOADER = IntersectionTracker({
      targets: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: _lazyLoadImages,
      cancel: 'Pass along the condition'
    });

    INDEX.LAZY_LOADER.init();


    // const scrollToTop = Scroller;
    // scrollToTop.init({
    //   id: 'top'
    // });
  };

  return {
    init: construct
  };

})();

export default IndexController;