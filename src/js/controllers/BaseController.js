import IntersectionTracker from '../lib/IntersectionTracker.js';
import Scroller from '../lib/Scroller.js';

const BaseController = (() => {

  const _removeClass = (content) => {
    if (content.dataset.intersected === 'true') {
      content.classList.remove(`reveal--${content.dataset.reveal}`);
    }
  };

  const construct = () => {
    IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-reveal]')),
      callback: _removeClass,
      flag: true
    }).init();

    if (document.querySelector('[data-site-footer]')) {
      const date = new Date();
      document.querySelector('[data-year]').textContent = date.getFullYear();

      Scroller({
        id: 'top',
        duration: 500
      }).init();
    }
  };

  return {
    init: construct
  };
})();

export default BaseController;