import { beforeViewChange } from '../utils/beforeViewChange.js';

const ScrollTracker = (obj) => {

  const scrollTracker = {
    start: obj.start,
    end: obj.end,
    cb: obj.callback
  };

  const browser = {
    scrolledY: 0,
    ticking: false
  };

  const _eventsCB = () => {
    browser.ticking = false;
    browser.scrolledY = window.pageYOffset;

    eval(scrollTracker.condition)
      ? scrollTracker.cb(true)
      : scrollTracker.cb(false);
  };

  const _requestTick = () => {
    if (!browser.ticking) {
      requestAnimationFrame(_eventsCB);
    }
    browser.ticking = true;
  };

  const _remove = () => {
    window.removeEventListener('scroll', _requestTick);
    window.removeEventListener('resize', _requestTick);
  };

  const construct = () => {
    if (scrollTracker.start === undefined) {
      scrollTracker.condition = 'scrollTracker.end > browser.scrolledY';
    } else if (scrollTracker.end === undefined) {
      scrollTracker.condition = 'scrollTracker.start < browser.scrolledY';
    } else {
      scrollTracker.condition = 'scrollTracker.start <= browser.scrolledY && scrollTracker.end >= browser.scrolledY';
    }

    window.addEventListener('scroll', _requestTick);
    window.addEventListener('resize', _requestTick);
    _requestTick();

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };

};

export default ScrollTracker;