export const removeContent = (options) => {
  const { targetNode, parentNode, activeClass, cb } = options;
  const removableElement = document.querySelector(targetNode);
  removableElement.addEventListener('transitionend', (e) => {
    console.log('[removeContent], parent', parentNode, 'child', removableElement);
    document.querySelector(parentNode).removeChild(removableElement);
    if (cb) {
      cb();
    }
  });

  removableElement.classList.remove(activeClass);
};