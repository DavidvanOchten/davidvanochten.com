import LazyLoader from '../lib/LazyLoader';

const AppController = (() => {
  const app = {};
  const browser = {};

  const construct = () => {
    app.lazyContent = [].slice.call(document.querySelectorAll('[data-src]'));
    app.lazyContent.forEach(item => {
      LazyLoader({
        element: item,
        type: item.tagName
        // callback: () => {
        //   if (window.getComputedStyle(item).width) {
        //     item.parentNode.classList.add('lazy--is-loaded');
        //   }
        // }
      }).init();
    });
  };

  return {
    init: construct
  };
})();

export default AppController;
