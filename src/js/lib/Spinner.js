// Note: Moved to inline script. See spinner.hbs

// const Spinner = () => {

//   const spinner = document.querySelector('[data-spinner]');

//   const user = {
//     mouseX: 0,
//     mouseY: 0
//   }

//   const showSpinner = (state) => {
//     state === true
//       ? spinner.classList.add('spinner--isVisible')
//       : spinner.classList.remove('spinner--isVisible');
//   };

//   const _trackSpinner = (e) => {
//     user.mouseX = e.clientX;
//     user.mouseY = e.clientY;

//     spinner.style.top = `${user.mouseY}px`;
//     spinner.style.left = `${user.mouseX}px`;
//   };

//   const construct = () => {
//     if ('ontouchstart' in window || navigator.maxTouchPoints) {
//       return;
//     }

//     window.addEventListener('mousemove', _trackSpinner);
//   };

//   return {
//     init: construct,
//     show: showSpinner
//   };
// };

// export default Spinner;