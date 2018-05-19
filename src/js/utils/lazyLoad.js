export const lazyLoad = (img) => {

  const lazyLoad = {
    src: img.dataset.src,
    img: img
  };

  const _addReadyClass = () => {
    if (window.getComputedStyle(lazyLoad.img).width) {
      lazyLoad.img.parentNode.classList.add('lazyLoader--isDone');
    }
  };

  const _showImage = () => {
    lazyLoad.img.src = lazyLoad.src;
    lazyLoad.img.complete
      ? _addReadyClass()
      : lazyLoad.img.addEventListener('load', _addReadyClass);
  };

  const _loadImage = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = lazyLoad.src;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  _loadImage()
    .then(() => _showImage())
    .catch(err => console.log('[lazyLoad.js] Error: ', err));
};