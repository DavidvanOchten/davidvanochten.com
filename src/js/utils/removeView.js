export const removeView = (view, cls) => {
  return new Promise((resolve, reject) => {
    view.addEventListener('transitionend', (e) => {
      if (e.target === view) {
        view.parentNode.removeChild(view);
        view = null;
        resolve();
      }
    });

    view.classList.remove(cls);
  });
};
