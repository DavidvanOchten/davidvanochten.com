import { beforeViewChange } from '../utils/beforeViewChange.js';

const IntersectionTracker = (obj) => {

  const intersectionTracker = {
    content: obj.content,
    threshold: obj.threshold * window.innerHeight || 0,
    cb: obj.callback,
    useFlag: obj.flag
  };

  const browser = {
    ticking: false
  };

  const _intersectionObserverCB = (entries) => {
    entries.map(entry => {
      if (entry.isIntersecting) {
        entry.target.dataset.intersected = 'true';

        if (intersectionTracker.useFlag) {
          intersectionTracker.io.unobserve(entry.target);
        }

      } else {
        entry.target.dataset.intersected = 'false';
      }

      intersectionTracker.cb(entry.target);
    });
  };

  const _useIntersectionObserver = () => {
    const options = { threshold: 0, rootMargin: `-${intersectionTracker.threshold}px` };

    intersectionTracker.io = new IntersectionObserver(_intersectionObserverCB, options);
    intersectionTracker.content.map(item => intersectionTracker.io.observe(item));
  };

  const _eventsCB = () => {
    browser.ticking = false;

    intersectionTracker.content.map(item => {
      if (intersectionTracker.useFlag && item.dataset.intersected === 'true') {
        return;
      }

      const itemTop = item.getBoundingClientRect().top;
      const itemBottom = item.getBoundingClientRect().bottom;

      if (intersectionTracker.threshold === 0) {
        const topInView = (itemTop >= 0 && itemTop <= window.innerHeight);
        const bottomInView = (itemBottom >= 0 && itemBottom <= window.innerHeight);
        const inFullView = (itemTop <= 0 && itemBottom >= window.innerHeight);

        intersectionTracker.condition = '(topInView || bottomInView || inFullView)';
      } else {
        intersectionTracker.condition = '(itemTop <= intersectionTracker.threshold && itemBottom >= intersectionTracker.threshold)';
      }
  
      eval(intersectionTracker.condition)
        ? item.dataset.intersected = 'true'
        : item.dataset.intersected = 'false';

      intersectionTracker.cb(item);
    });
  };

  const _requestTick = () => {
    if (!browser.ticking) {
      requestAnimationFrame(_eventsCB);
    }
    browser.ticking = true;
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

    if (intersectionTracker.io) {
      intersectionTracker.io.disconnect();
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