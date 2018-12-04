import LazyLoader from '../lib/LazyLoader';

const AppController = (() => {
  const app = {};
  const browser = {};

  const construct = () => {
    browser.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    app.lazyContent = [].slice.call(document.querySelectorAll('[data-src]'));
    app.lazyContent.forEach(item => {
      LazyLoader({
        element: item,
        type: item.tagName,
        useSrcS: browser.isSafari
      }).init();
    });
  };

  return {
    init: construct
  };
})();

export default AppController;
