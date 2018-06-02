const LazyLoader = (obj) => {

  const lazyLoader = {
    root: obj.element,
    type: obj.type,
    cb: obj.callback
  };

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
    if (lazyLoader.type === undefined || lazyLoader.type === 'IMG') {
      (window.innerWidth < 600 && lazyLoader.root.dataset.srcMd)
        ? lazyLoader.src = lazyLoader.root.dataset.srcMd
        : lazyLoader.src = lazyLoader.root.dataset.src;

      _loadImage()
        .then(() => _setImage())
        .catch(err => console.log('[LazyLoader.js] Error: ', err));
    }

    if (lazyLoader.type === 'VIDEO') {
      console.log('[LazyLoader.js] Load video');
    }
  };

  return {
    init: construct
  };
};

export default LazyLoader;