export const beforeViewChange = (cb) => {
  const _onRemoval = (mutationsList) => {
    if (mutationsList[0].removedNodes.length > 0) {
      cb();
      MO.disconnect();
    }
  };

  const MO = new MutationObserver(_onRemoval);
  MO.observe(document.querySelector('[data-main]'), { childList: true });
}