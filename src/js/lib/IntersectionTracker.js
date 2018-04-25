import { beforeViewChange } from '../utils/beforeViewChange.js';

const IntersectionTracker = (obj) => {

  const INTERSECTION_TRACKER = {
    CONTENT: obj.content,
    THRESHOLD: obj.threshold * window.innerHeight || 0,
    USE_FLAG: obj.flag,
    CB: obj.callback
  };

  const BROWSER = {
    ticking: false
  };

  const _intersectionObserverCB = (entries) => {
    entries.map(entry => {
      if (entry.isIntersecting) {
        entry.target.dataset.intersected = 'true';

        if (INTERSECTION_TRACKER.USE_FLAG) {
          INTERSECTION_TRACKER.IO.unobserve(entry.target);
        }

      } else {
        entry.target.dataset.intersected = 'false';
      }

      INTERSECTION_TRACKER.CB(entry.target);
    });
  };

  const _useIntersectionObserver = () => {
    const OPTIONS = { threshold: 0, rootMargin: `-${INTERSECTION_TRACKER.THRESHOLD}px` };

    INTERSECTION_TRACKER.IO = new IntersectionObserver(_intersectionObserverCB, OPTIONS);
    INTERSECTION_TRACKER.CONTENT.map(item => INTERSECTION_TRACKER.IO.observe(item));
  };

  const _eventsCB = () => {
    BROWSER.ticking = false;

    INTERSECTION_TRACKER.CONTENT.map(item => {
      if (INTERSECTION_TRACKER.USE_FLAG && item.dataset.intersected === 'true') {
        return;
      }

      let intersectionCondition = '';
      const ITEM_TOP = item.getBoundingClientRect().top;
      const ITEM_BOTTOM = item.getBoundingClientRect().bottom;

      if (INTERSECTION_TRACKER.THRESHOLD === 0) {
        const TOP_IN_VIEW = (ITEM_TOP >= 0 && ITEM_TOP <= window.innerHeight);
        const BOTTOM_IN_VIEW = (ITEM_BOTTOM >= 0 && ITEM_BOTTOM <= window.innerHeight);
        const IN_FULL_VIEW = (ITEM_TOP <= 0 && ITEM_BOTTOM >= window.innerHeight);

        intersectionCondition = '(TOP_IN_VIEW || BOTTOM_IN_VIEW || IN_FULL_VIEW)';
      } else {
        intersectionCondition = '(ITEM_TOP <= INTERSECTION_TRACKER.THRESHOLD && ITEM_BOTTOM >= INTERSECTION_TRACKER.THRESHOLD)';
      }
  
      eval(intersectionCondition)
        ? item.dataset.intersected = 'true'
        : item.dataset.intersected = 'false';

      INTERSECTION_TRACKER.CB(item);
    });
  };

  const _requestTick = () => {
    if (!BROWSER.ticking) {
      requestAnimationFrame(_eventsCB);
    }
    BROWSER.ticking = true;
  };

  const _useEvents = () => {
    window.addEventListener('scroll', _requestTick);
    window.addEventListener('resize', _requestTick);
    _requestTick();
  };

  const _selectIntersectionTechnique = () => {
    'IntersectionObserver' in window
      ? _useIntersectionObserver()
      : _useEvents();
  };

  const _remove = () => {
    window.removeEventListener('scroll', _requestTick);
    window.removeEventListener('resize', _requestTick);

    if (INTERSECTION_TRACKER.IO) {
      INTERSECTION_TRACKER.IO.disconnect();
    }
  };

  const construct = () => {
    _selectIntersectionTechnique();
    beforeViewChange(_remove);
  };

  return {
    init: construct
  };

};

export default IntersectionTracker;