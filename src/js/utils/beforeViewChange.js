export const beforeViewChange = (selector, cb) => {
  const _onMutation = (mutationsList) => {
    if (mutationsList[0].removedNodes.length > 0) {
      cb();
      mo.disconnect();
    }
  };

  const mo = new MutationObserver(_onMutation);
  mo.observe(document.querySelector(selector), { childList: true });
};