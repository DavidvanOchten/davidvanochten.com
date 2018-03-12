const Scroller = (() => {

  const _checkBody = () => {
    document.documentElement.scrollTop += 1;
    const BODY = (document.documentElement.scrollTop !== 0)
      ? document.documentElement
      : document.body;
    document.documentElement.scrollTop -= 1;
    return BODY;
  };

  const _getElmTopPosition = (elm) => {
    // return elm.getBoundingClientRect().top + body.scrollTop
    let elmTopPosition = 0;

    while (elm) {
        elmTopPosition += (elm.offsetTop + elm.clientTop);
        elm = elm.offsetParent;
    }

    return elmTopPosition;
  };

  const _scrollTo = (target, duration = 1000, easing = 'easeInOutCubic', cb) => {
    
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

      const START_TIME = window.performance.now
        ? (performance.now() + performance.timing.navigationStart)
        : Date.now();

      const BODY = _checkBody();
      const DOCUMENT_HEIGHT = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      const WINDOW_HEIGHT = window.innerHeight;

      const TARGET_TOP = _getElmTopPosition(target);
      const DESTINATION = DOCUMENT_HEIGHT - TARGET_TOP < WINDOW_HEIGHT
        ? DOCUMENT_HEIGHT - WINDOW_HEIGHT
        : TARGET_TOP;
      const START_POS = BODY.scrollTop;

      const _scroll = () => {
        const NOW = window.performance.now
          ? (performance.now() + performance.timing.navigationStart)
          : Date.now();

        const TIME = Math.min(1, ((NOW - START_TIME) / duration));
        const EASED_TIME = EASINGS[easing](TIME);
        BODY.scrollTop = (EASED_TIME * (DESTINATION - START_POS)) + START_POS;

        if (BODY.scrollTop === DESTINATION) {
          if (cb) {
            cb();
          }
          return;
        }
        requestAnimationFrame(_scroll);
      };
      requestAnimationFrame(_scroll);
  };

  const _construct = (options) => {
    const { target, duration, easing, cb } = options;
    _scrollTo(target, duration, easing, cb);
  };

  return {
    init: _construct
  };
})();

export default Scroller;