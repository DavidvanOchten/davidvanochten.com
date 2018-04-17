// const Spinner = (() => {
//   const SPINNER = {
//     NODE: null
//   };

//   const USER = {
//     MOUSE_X: 0,
//     MOUSE_Y: 0
//   }

//   const _trackSpinner = (e) => {
//     USER.MOUSE_X = e.clientX;
//     USER.MOUSE_Y = e.clientY;

//     SPINNER.NODE.style.top = `${USER.MOUSE_Y - 6}px`;
//     SPINNER.NODE.style.left = `${USER.MOUSE_X + 10}px`;
//   };

//   const construct = (status) => {
//     if ('ontouchstart' in window || navigator.maxTouchPoints) {
//       return;
//     }

//     SPINNER.NODE = document.querySelector('[data-spinner]');
//     window.addEventListener('mousemove', _trackSpinner);
//   };

//   return {
//     init: construct
//   };
// })();

// export default Spinner;