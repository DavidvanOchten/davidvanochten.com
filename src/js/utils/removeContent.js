// export const removeContent = (options) => {
//   return new Promise((resolve, reject) => {
//     const { targetNode, parentNode, activeClass } = options;
//     const removableElement = document.querySelector(targetNode);
//     removableElement.addEventListener('transitionend', (e) => {
//       console.log('[removeContent] 2');
//       document.querySelector(parentNode).removeChild(removableElement);
//       resolve();
//     });

//     removableElement.classList.remove(activeClass);
//   });
// };