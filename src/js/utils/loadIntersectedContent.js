import LazyLoader from '../lib/LazyLoader.js';

export const loadIntersectedContent = (content) => {
  if (content.dataset.intersected === 'true') {
    LazyLoader({
      element: content,
      type: content.tagName,
      callback: () => {
        if (window.getComputedStyle(content).width) {
          content.parentNode.classList.add('lazyLoader--isDone');
        }
      }
    }).init();
  }
};