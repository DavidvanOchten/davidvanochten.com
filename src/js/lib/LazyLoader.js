const LazyLoader = (() => {
  const READY_CLASS = 'lazyLoader--isDone';
  let ticking = false;

  const _loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = src
      image.onload = resolve
      image.onerror = reject
    });
  };

  const _showImage = (img, src) => {
    img.src = src;
    img.parentNode.classList.add(READY_CLASS);
  };

  const _intersectionObserverCB = (content) => {
    content.map((item) => {
      const img = item.target;
      const src = img.dataset.src;

      if (img.parentNode && img.parentNode.classList.contains(READY_CLASS)) {
        return;
      }

      if (item.isIntersecting) {
        _loadImage(src)
          .then(() => _showImage(img, src))
          .catch(err => console.log('[LazyLoader] Error: ', err));
      }
    });
  };

  const _useIntersectionObserver = () => {
    const LAZY_CONTENT = [...document.querySelectorAll('[data-src]')];
    const io = new IntersectionObserver(_intersectionObserverCB, { threshold: 0 });
    const observableContentIO = LAZY_CONTENT.map(content => io.observe(content));
  };

  const _eventsCB = () => {
    ticking = false;

    const LAZY_CONTENT = [...document.querySelectorAll('[data-src]')];
    const observableContentEvents = LAZY_CONTENT.map(img => {

      if (img.parentNode.classList.contains(READY_CLASS)) {
        return;
      }

      const src = img.dataset.src;
      const imgTop = img.getBoundingClientRect().top;
      const imgBottom = img.getBoundingClientRect().bottom;
      const topInView = imgTop >= 0 && imgTop <= window.innerHeight;
      const bottomInView = imgBottom >= 0 && imgBottom <= window.innerHeight;
      const inFullView = imgTop <= 0 && imgBottom >= window.innerHeight;

      if (topInView || bottomInView || inFullView) {
        _loadImage(src)
          .then(() => _showImage(img, src))
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
    ticking = true
  };

  const _useEvents = () => {
    window.addEventListener('scroll', _requestTick);
    window.addEventListener('resize', _requestTick);
    _requestTick();
  };

  const _chooseIntersectionTechnique = () => {
    'IntersectionObserver' in window
      ? _useIntersectionObserver()
      : _useEvents();
  };

  const construct = () => {
    _chooseIntersectionTechnique();
  };

  return {
    init: construct
  };
})();

export default LazyLoader;