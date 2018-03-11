export const afterViewRemoval = (cb) => {
  const _onRemoval = (mutationsList) => {
    if (mutationsList[0].removedNodes.length > 0) {
      // console.log('View removed');
      cb();
    }
  };

  const MO = new MutationObserver(_onRemoval);
  MO.observe(document.querySelector('main'), { childList: true });
}