// const Toggle = (() => {
//   const TOGGLE = {
//     BUTTON: null,
//     BUTTON_CLASS: null,
//     TARGET: null,
//     TARGET_CLASS: null
//   };

//   const _toggleElements = (e) => {
//     TOGGLE.BUTTON.classList.toggle(`${TOGGLE.BUTTON_CLASS}`);
//     TOGGLE.TARGET.classList.toggle(`${TOGGLE.TARGET_CLASS}`);
//   };

//   const construct = (obj) => {
//     const { id, activeButtonClass, activeTargetClass } = obj;

//     TOGGLE.BUTTON = document.querySelector(`[data-toggle-button="${id}"]`)
//     TOGGLE.TARGET = document.querySelector(`[data-toggle-target="${id}"]`);
//     TOGGLE.BUTTON_CLASS = activeButtonClass;
//     TOGGLE.TARGET_CLASS = activeTargetClass;

//     TOGGLE.BUTTON.addEventListener('click', _toggleElements);
//   };

//   return {
//     init: construct
//   }
// })();

// export default Toggle;