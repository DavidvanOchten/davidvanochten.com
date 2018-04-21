export const lazyLoad = (img) => {

  const LAZYLOAD = {
    IMG: img,
    SRC: img.dataset.src
  };

  const _addReadyClass = () => {
    if (window.getComputedStyle(LAZYLOAD.IMG).width) {
      LAZYLOAD.IMG.parentNode.classList.add('lazyLoader--isDone');
    }
  };

  const _showImage = () => {
    LAZYLOAD.IMG.src = LAZYLOAD.SRC;
    LAZYLOAD.IMG.complete
      ? _addReadyClass()
      : LAZYLOAD.IMG.addEventListener('load', _addReadyClass);
  };

  const _loadImage = () => {
    return new Promise((resolve, reject) => {
      const IMAGE = new Image();
      IMAGE.src = LAZYLOAD.SRC;
      IMAGE.onload = resolve;
      IMAGE.onerror = reject;
    });
  };

  _loadImage()
    .then(() => _showImage())
    .catch(err => console.log('[lazyLoad.js] Error: ', err));
};