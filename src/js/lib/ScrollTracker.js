import { beforeViewChange } from '../utils/beforeViewChange.js';

const ScrollTracker = (obj) => {

  const SCROLL_TRACKER = {
    START: obj.start,
    END: obj.end,
    CB: obj.callback
  };

  const BROWSER = {
    scrolledY: 0,
    ticking: false
  };

  const _eventsCB = () => {
    BROWSER.ticking = false;
    BROWSER.scrolledY = window.pageYOffset;

    eval(SCROLL_TRACKER.CONDITION)
      ? SCROLL_TRACKER.CB(true)
      : SCROLL_TRACKER.CB(false);
  };

  const _requestTick = () => {
    if (!BROWSER.ticking) {
      requestAnimationFrame(_eventsCB);
    }
    BROWSER.ticking = true;
  };

  const _remove = () => {
    window.removeEventListener('scroll', _requestTick);
    window.removeEventListener('resize', _requestTick);
  };

  const construct = () => {
    if (SCROLL_TRACKER.START === undefined) {
      SCROLL_TRACKER.CONDITION = 'SCROLL_TRACKER.END > BROWSER.scrolledY';
    } else if (SCROLL_TRACKER.END === undefined) {
      SCROLL_TRACKER.CONDITION = 'SCROLL_TRACKER.START < BROWSER.scrolledY';
    } else {
      SCROLL_TRACKER.CONDITION = 'SCROLL_TRACKER.START <= BROWSER.scrolledY && SCROLL_TRACKER.END >= BROWSER.scrolledY';
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