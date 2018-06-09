import IntersectionTracker from '../lib/IntersectionTracker.js';
import { loadIntersectedContent } from '../utils/loadIntersectedContent.js';

const NotesController = (() => {
  const construct = () => {
    IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: loadIntersectedContent,
      flag: true
    }).init();
  };

  return {
    init: construct
  };
})();

export default NotesController;