const IntersectionTracker = (obj) => {

  const INTERSECTION_TRACKER = {
    TARGETS: obj.targets,
    CB: obj.callback
    // CANCEL_FLAG (for Events CB)
  };

  const BROWSER = {
    ticking: false
  }

  const _intersectionObserverCB = (entries) => {
    console.log('From IO CB');

    entries.map(entry => {
      if (entry.isIntersecting) {
        INTERSECTION_TRACKER.CB(entry.target);
        INTERSECTION_TRACKER.IO.unobserve(entry.target);
      }
    });
  };

  const _useIntersectionObserver = () => {
    INTERSECTION_TRACKER.IO = new IntersectionObserver(_intersectionObserverCB, { threshold: 0 });
    INTERSECTION_TRACKER.TARGETS.map(content => INTERSECTION_TRACKER.IO.observe(content));
  };

  const _eventsCB = () => {
    BROWSER.ticking = false;

    console.log('From Events CB');
    // Pass in the cancel condition
    // if () {

    // }

    INTERSECTION_TRACKER.TARGETS.map(item => {
      const ITEM_TOP = item.getBoundingClientRect().top;
      const ITEM_BOTTOM = item.getBoundingClientRect().bottom;
      const TOP_IN_VIEW = ITEM_TOP >= 0 && ITEM_TOP <= window.innerHeight;
      const BOTTOM_IN_VIEW = ITEM_BOTTOM >= 0 && ITEM_BOTTOM <= window.innerHeight;
      const IN_FULL_VIEW = ITEM_TOP <= 0 && ITEM_BOTTOM >= window.innerHeight;

      if (TOP_IN_VIEW || BOTTOM_IN_VIEW || IN_FULL_VIEW) {
        INTERSECTION_TRACKER.CB(item);
      }
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

  const _selectScrollingTechnique = () => {
    'IntersectionObserver' in window
      ? _useIntersectionObserver()
      : _useEvents();
  };

  const remove = () => {
    window.removeEventListener('scroll', _requestTick);
    window.removeEventListener('resize', _requestTick);

    if (INTERSECTION_TRACKER.IO) {
      INTERSECTION_TRACKER.IO.disconnect();
    }
  };

  const construct = () => {
    _selectScrollingTechnique();
  };

  return {
    init: construct,
    terminate: remove
  };

};

export default IntersectionTracker;