import { beforeViewChange } from '../utils/beforeViewChange.js';



// ScrollTracker (instead of just Tracker). More like IntersectionTracker
const Tracker = (obj) => {

  const TRACKER = {
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

    eval(TRACKER.CONDITION)
      ? TRACKER.CB(true)
      : TRACKER.CB(false);
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
    if (TRACKER.START === undefined) {
      TRACKER.CONDITION = 'TRACKER.END > BROWSER.scrolledY';
    } else if (TRACKER.END === undefined) {
      TRACKER.CONDITION = 'TRACKER.START < BROWSER.scrolledY';
    } else {
      TRACKER.CONDITION = 'TRACKER.START <= BROWSER.scrolledY && TRACKER.END >= BROWSER.scrolledY';
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

export default Tracker;