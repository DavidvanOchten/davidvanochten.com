import IntersectionTracker from '../lib/IntersectionTracker.js';
import Scroller from '../lib/Scroller.js';
import { lazyLoad } from '../utils/lazyLoad.js';

const BaseController = (() => {

  const base = {};

  const _removeClass = (content) => {
    if (content.dataset.intersected === 'true') {
      content.classList.remove(`reveal--${content.dataset.reveal}`);
    }
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
      callback: _removeClass,
      flag: true
    });

    base.lazyImages.init();
    base.revealContent.init();

    if (document.querySelector('[data-site-footer]')) {
      const date = new Date();
      document.querySelector('[data-year]').textContent = date.getFullYear();

      base.topScroller.init();
    }
  };

  return {
    init: construct
  };
})();

export default BaseController;