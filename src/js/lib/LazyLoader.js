const LazyLoader = (obj) => {
  const lazyLoader = {};

  const _setImage = () => {
    lazyLoader.root.src = lazyLoader.src;

    if (lazyLoader.cb) {
      (lazyLoader.root.complete)
        ? lazyLoader.cb()
        : lazyLoader.root.addEventListener('load', lazyLoader.cb);
    }
  };

  const _loadImage = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = lazyLoader.src;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  const construct = () => {
    lazyLoader.root = obj.element;
    lazyLoader.type = obj.type;
    lazyLoader.cb = obj.callback;
    lazyLoader.useSrcS = obj.useSrcS || false;

    if (lazyLoader.type === undefined || lazyLoader.type === 'IMG') {
      (lazyLoader.root.dataset.srcS && (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 600) || lazyLoader.useSrcS)
        ? lazyLoader.src = lazyLoader.root.dataset.srcS
        : lazyLoader.src = lazyLoader.root.dataset.src;

      _loadImage()
        .then(() => _setImage())
        .catch(err => console.log('[LazyLoader] Error: ', err));
    }

    if (lazyLoader.type === 'VIDEO') {
      lazyLoader.root.src = lazyLoader.root.dataset.src;
      lazyLoader.root.load();

      if (lazyLoader.cb) {
        lazyLoader.cb();
      }
    }
  };

  return {
    init: construct
  };
};

export default LazyLoader;