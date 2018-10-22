import LazyLoader from '../lib/LazyLoader.js';

export const loadIntersectedContent = (content) => {
  if (content.dataset.intersected === 'true') {
    const items = [].slice.call(content.querySelectorAll('[data-src]'));
    items.forEach(item => {
      LazyLoader({
        element: item,
        type: item.tagName
        // callback: () => {
        //   if (window.getComputedStyle(item).width) {
        //     item.parentNode.classList.add('u-loaded');
        //   }
        // }
      }).init();
    });
  }
};