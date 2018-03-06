export const removeContent = (options) => {
  const { targetNode, parentNode, activeClass, cb } = options;
  const removableElement = document.querySelector(targetNode);
  removableElement.addEventListener('transitionend', (e) => {
    document.querySelector(parentNode).removeChild(removableElement);
    if (cb) {
      cb();
    }
  });

  removableElement.classList.remove(activeClass);
};