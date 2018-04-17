// Use to start/end something on scroll. Not the same as Tracker.js
// E.g. for header on index page

const ScrollMotion = (obj) => {

  const SCROLL_MOTION = {
    TARGET: document.querySelector(`[data-scroll-motion="${obj.element}"]`),
    START: obj.start || 0,
    END: obj.end,
    ANIMATION: obj.animation // Update this name
  };

  const BROWSER = {
    ticking: false
  };

  const _toggleTarget = (action) => {
    const hasToggleClass = SCROLL_MOTION.TARGET.classList.contains(SCROLL_MOTION.ANIMATION.toggleClass);

    if (action === 'remove' && hasToggleClass) {
      SCROLL_MOTION.TARGET.classList.remove(SCROLL_MOTION.ANIMATION.toggleClass);
    } else if (action === 'add' && !hasToggleClass) {
      SCROLL_MOTION.TARGET.classList.add(SCROLL_MOTION.ANIMATION.toggleClass);
    }
  };

  const _triggerOnScroll = () => {
    BROWSER.ticking = false;

    if (window.pageYOffset >= SCROLL_MOTION.START) {  
      if (SCROLL_MOTION.ANIMATION.type === 'toggle') {
        window.pageYOffset > SCROLL_MOTION.END
          ? _toggleTarget('remove')
          : _toggleTarget('add');
      }
    }
  };

  const _requestTick = () => {
    if (!BROWSER.ticking) {
      requestAnimationFrame(_triggerOnScroll);
    }
    BROWSER.ticking = true;
  };

  const construct = () => {
    window.addEventListener('scroll', _requestTick);
    window.addEventListener('resize', _requestTick);
    _requestTick();
  };

  const remove = () => {
    window.removeEventListener('scroll', _requestTick);
    window.removeEventListener('resize', _requestTick);

    if (SCROLL_MOTION.TARGET !== null && SCROLL_MOTION.TARGET.classList.contains(SCROLL_MOTION.ANIMATION.toggleClass)) {
      SCROLL_MOTION.TARGET.classList.remove(SCROLL_MOTION.ANIMATION.toggleClass);
    }
  };

  return {
    init: construct,
    terminate: remove
  }
};

export default ScrollMotion;