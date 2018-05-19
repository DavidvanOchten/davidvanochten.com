export const beforeViewChange = (cb) => {
  const _onRemoval = (mutationsList) => {
    if (mutationsList[0].removedNodes.length > 0) {
      cb();
      mo.disconnect();
    }
  };

  const mo = new MutationObserver(_onRemoval);
  mo.observe(document.querySelector('[data-main]'), { childList: true });
}