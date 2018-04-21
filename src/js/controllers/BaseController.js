import IntersectionTracker from '../lib/IntersectionTracker.js';
import { lazyLoad } from '../utils/lazyLoad.js';

const BaseController = (() => {

  const BASE = {};

  const addClass = (content) => {
    // More generic function that is imported from utils. 
    // Add class functionality (not so much just a reveal)
    console.log(content);
  };

  const construct = () => {

    BASE.LAZY_IMAGES = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: lazyLoad
    });

    BASE.REVEAL_CONTENT = IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-reveal]')),
      callback: addClass
    });
    
    BASE.LAZY_IMAGES.init();
    BASE.REVEAL_CONTENT.init();
  };

  return {
    init: construct
  };
})();

export default BaseController;