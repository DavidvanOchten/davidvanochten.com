import { afterViewRemoval } from '../utils/afterViewRemoval.js';

const LazyLoader = (() => {
  const READY_CLASS = 'lazyLoader--isDone';
  let ticking = false;

  const _addReadyClass = (img) => {
    if (window.getComputedStyle(img).width) {
      img.parentNode.classList.add(READY_CLASS);
    }
  };

  const _loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const IMAGE = new Image();
      IMAGE.src = src;
      IMAGE.onload = resolve;
      IMAGE.onerror = reject;
    });
  };

  const _showImage = (img, src) => {
    img.src = src;

    img.complete
      ? _addReadyClass(img)
      : img.addEventListener('load', e => _addReadyClass(e.target));
  };

  const _intersectionObserverCB = (content) => {
    content.map((item) => {
      const IMG = item.target;
      const SRC = IMG.dataset.src;

      if (IMG.parentNode && IMG.parentNode.classList.contains(READY_CLASS)) {
        return;
      }

      if (item.isIntersecting) {
        _loadImage(SRC)
          .then(() => _showImage(IMG, SRC))
          .catch(err => console.log('[LazyLoader] Error: ', err));
      }
    });
  };

  const _useIntersectionObserver = () => {
    const LAZY_CONTENT = [...document.querySelectorAll('[data-src]')];
    const IO = new IntersectionObserver(_intersectionObserverCB, { threshold: 0 });
    const OBSERVABLE_CONTENT_IO = LAZY_CONTENT.map(content => IO.observe(content));
  };

  const _eventsCB = () => {
    ticking = false;

    const LAZY_CONTENT = [...document.querySelectorAll('[data-src]')];
    const OBSERVABLE_CONTENT_EVENTS = LAZY_CONTENT.map((img) => {
      if (img.parentNode.classList.contains(READY_CLASS)) {
        return;
      }

      const SRC = img.dataset.src;
      const IMG_TOP = img.getBoundingClientRect().top;
      const IMG_BOTTOM = img.getBoundingClientRect().bottom;
      const TOP_IN_VIEW = IMG_TOP >= 0 && IMG_TOP <= window.innerHeight;
      const BOTTOM_IN_VIEW = IMG_BOTTOM >= 0 && IMG_BOTTOM <= window.innerHeight;
      const IN_FULL_VIEW = IMG_TOP <= 0 && IMG_BOTTOM >= window.innerHeight;

      if (TOP_IN_VIEW || BOTTOM_IN_VIEW || IN_FULL_VIEW) {
        _loadImage(SRC)
          .then(() => _showImage(img, SRC))
          .catch((err) => {
            console.log('[LazyLoader] Error: ', err);
          })
      }
    });
  };

  const _requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(_eventsCB);
    }
    ticking = true;
  };

  const _useEvents = () => {
    window.addEventListener('scroll', _requestTick);
    window.addEventListener('resize', _requestTick);

    afterViewRemoval(_requestTick);
    _requestTick();
  };

  const _chooseIntersectionTechnique = () => {
    'IntersectionObserver' in window
      ? _useIntersectionObserver()
      : _useEvents();
  };

  const _construct = () => {
    _chooseIntersectionTechnique();
  };

  return {
    init: _construct
  };
})();

export default LazyLoader;