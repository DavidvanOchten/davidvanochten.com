import { beforeViewChange } from '../utils/beforeViewChange.js';

const Scroller = (obj) => {

  const SCROLLER = {
    TARGET: document.querySelector(`[data-scroller-target="${obj.id}"]`),
    TRIGGER: document.querySelector(`[data-scroller-trigger="${obj.id}"]`),
    DURATION: obj.duration || 1000,
    EASING: obj.easing || 'easeInOutCubic',
    OFFSET: obj.offset || 0,
    CB: obj.callback
  };

  const BROWSER = {
    WINDOW_HEIGHT: window.innerHeight,
    DOCUMENT_HEIGHT: Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  };

  const EASINGS = {
    linear(t) {
      return t;
    },
    easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  };

  const _checkBody = () => {
    document.documentElement.scrollTop += 1;
    const BODY = (document.documentElement.scrollTop !== 0)
      ? document.documentElement
      : document.body;
    document.documentElement.scrollTop -= 1;
    return BODY;
  };

  const _getTargetTop = () => {
    if (obj.id === 'top') {
      return 0;
    }

    let target = SCROLLER.TARGET;
    let topPosition = 0;

    while (target) {
        topPosition += (target.offsetTop + target.clientTop);
        target = target.offsetParent;
    }

    return topPosition;
  };

  const _scrollTo = (e) => {
    const START_TIME = window.performance.now
      ? (performance.now() + performance.timing.navigationStart)
      : Date.now();

    const START_POS = BROWSER.BODY.scrollTop;
    const DESTINATION = BROWSER.DOCUMENT_HEIGHT - SCROLLER.TARGET_TOP < BROWSER.WINDOW_HEIGHT
      ? BROWSER.DOCUMENT_HEIGHT - BROWSER.WINDOW_HEIGHT
      : Math.abs(SCROLLER.TARGET_TOP - SCROLLER.OFFSET);

    const _scroll = () => {
      const NOW = window.performance.now
        ? (performance.now() + performance.timing.navigationStart)
        : Date.now();

      const TIME = Math.min(1, ((NOW - START_TIME) / SCROLLER.DURATION));
      const EASED_TIME = EASINGS[SCROLLER.EASING](TIME);
      BROWSER.BODY.scrollTop = (EASED_TIME * (DESTINATION - START_POS)) + START_POS;

      if (BROWSER.BODY.scrollTop === DESTINATION) {
        if (SCROLLER.CB) {
          SCROLLER.CB();
        }
        return;
      }
      requestAnimationFrame(_scroll);
    };
    requestAnimationFrame(_scroll);
  };

  const _resetScroller = () => {
    BROWSER.WINDOW_HEIGHT = window.innerHeight;
    BROWSER.DOCUMENT_HEIGHT = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    SCROLLER.TARGET_TOP = _getTargetTop();
  }

  const _remove = () => {
    window.removeEventListener('resize', _resetScroller);
  };

  const construct = () => {
    BROWSER.BODY = _checkBody();
    SCROLLER.TARGET_TOP = _getTargetTop();
    SCROLLER.TRIGGER.addEventListener('click', _scrollTo);

    window.addEventListener('resize', _resetScroller);

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };
};

export default Scroller;