// Maybe make this an object with a method inside
// afterViewRemoval = {
//  init () {
//    const _onRemoval ... etc. 
// }
// }
export const afterViewRemoval = (cb) => {
  const _onRemoval = (mutationsList) => {
    if (mutationsList[0].removedNodes.length > 0) {
      cb();
      MO.disconnect();
    }
  };

  const MO = new MutationObserver(_onRemoval);
  MO.observe(document.querySelector('main'), { childList: true });
}