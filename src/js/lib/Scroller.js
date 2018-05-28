import { beforeViewChange } from '../utils/beforeViewChange.js';

const Scroller = (obj) => {

  const scroller = {
    target: document.querySelector(`[data-scroller-target="${obj.id}"]`),
    trigger: document.querySelector(`[data-scroller-trigger="${obj.id}"]`),
    duration: obj.duration || 1000,
    easing: obj.easing || 'easeInOutCubic',
    offset: obj.offset || 0,
    cb: obj.callback
  };

  const browser = {
    windowHeight: window.innerHeight,
    documentHeight: Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  };

  const easings = {
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
    const body = (document.documentElement.scrollTop !== 0)
      ? document.documentElement
      : document.body;
    document.documentElement.scrollTop -= 1;
    return body;
  };

  const _getTargetTop = () => {
    if (obj.id === 'top') {
      return 0;
    }

    let target = scroller.target;
    let topPosition = 0;

    while (target) {
      topPosition += (target.offsetTop + target.clientTop);
      target = target.offsetParent;
    }

    return topPosition;
  };

  const scrollTo = () => {
    browser.body = _checkBody();
    scroller.targetTop = _getTargetTop();

    const startTime = window.performance.now
      ? (performance.now() + performance.timing.navigationStart)
      : Date.now();

    const startPosition = browser.body.scrollTop;
    const destination = browser.documentHeight - scroller.targetTop < browser.windowHeight
      ? browser.documentHeight - browser.windowHeight
      : Math.abs(scroller.targetTop - scroller.offset);

    const _scroll = () => {
      const now = window.performance.now
        ? (performance.now() + performance.timing.navigationStart)
        : Date.now();

      const time = Math.min(1, ((now - startTime) / scroller.duration));
      const easedTime = easings[scroller.easing](time);
      browser.body.scrollTop = (easedTime * (destination - startPosition)) + startPosition;

      if (browser.body.scrollTop === destination) {
        if (scroller.cb) {
          scroller.cb();
        }
        return;
      }
      requestAnimationFrame(_scroll);
    };
    requestAnimationFrame(_scroll);
  };

  const _resetScroller = () => {
    browser.windowHeight = window.innerHeight;
    browser.documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    scroller.targetTop = _getTargetTop();
  };

  const _remove = () => {
    window.removeEventListener('resize', _resetScroller);
  };

  const construct = () => {
    scroller.trigger.addEventListener('click', scrollTo);
    window.addEventListener('resize', _resetScroller);

    beforeViewChange(_remove);
  };

  return {
    init: construct,
    scroll: scrollTo
  };
};

export default Scroller;