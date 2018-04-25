import IntersectionTracker from '../lib/IntersectionTracker.js';
import Scroller from '../lib/Scroller.js';
import { lazyLoad } from '../utils/lazyLoad.js';

const BaseController = (() => {

  const BASE = {};

  const _addClass = (content) => {
    // More generic function that is imported from utils. 
    // Add class functionality (not so much just a reveal)
    if (content.dataset.intersected === 'true' && content.classList.contains('classname')) {
      console.log('Add class', content);
      content.classList.remove('classname');
      // Or Toggle?
    } else if (content.dataset.intersected === 'false') {
      content.classList.add('classname');
      // Or Toggle?
    }
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
      flag: true,
      callback: _lazyLoadContent
    });

    BASE.REVEAL_CONTENT = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-reveal]')),
      threshold: 0.5,
      callback: _addClass
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