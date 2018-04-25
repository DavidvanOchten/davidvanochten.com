import IntersectionTracker from '../lib/IntersectionTracker.js';
import Scroller from '../lib/Scroller.js';
import { lazyLoad } from '../utils/lazyLoad.js';

const BaseController = (() => {

  const BASE = {};

  const _addClass = (content) => {
    // content.classList.add('classname');
  };

  const _lazyLoadContent = (content) => {
    if (content.dataset.intersected === 'true') {
      lazyLoad(content);
    }
  }

  const construct = () => {
    BASE.TOP_SCROLLER = Scroller({
      id: 'top',
      duration: 500
    });

    BASE.LAZY_IMAGES = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: _lazyLoadContent,
      flag: true
    });

    BASE.REVEAL_CONTENT = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-reveal]')),
      callback: _addClass,
      flag: true
    });

    BASE.TOP_SCROLLER.init();
    BASE.LAZY_IMAGES.init();
    BASE.REVEAL_CONTENT.init();
  };

  return {
    init: construct
  };
})();

export default BaseController;