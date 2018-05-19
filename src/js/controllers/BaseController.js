import IntersectionTracker from '../lib/IntersectionTracker.js';
import Scroller from '../lib/Scroller.js';
import { lazyLoad } from '../utils/lazyLoad.js';

const BaseController = (() => {

  const base = {};

  const _addClass = (content) => {
    // content.classList.add('classname');
  };

  const _lazyLoadContent = (content) => {
    if (content.dataset.intersected === 'true') {
      lazyLoad(content);
    }
  }

  const construct = () => {
    base.topScroller = Scroller({
      id: 'top',
      duration: 500
    });

    base.lazyImages = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: _lazyLoadContent,
      flag: true
    });

    base.revealContent = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-reveal]')),
      callback: _addClass,
      flag: true
    });

    base.lazyImages.init();
    base.revealContent.init();

    if (document.querySelector('[data-site-footer]')) {
      base.topScroller.init();
    }
  };

  return {
    init: construct
  };
})();

export default BaseController;