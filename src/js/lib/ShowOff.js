// import { updateAfterViewChange } from '../utils/updateAfterViewChange.js';

// // Change naming to Reveal.js
// const ShowOff = (() => {
//   let ticking = false;
//   let hiddenClass = '';

//   const _showItem = (item) => {
//     item.classList.remove(hiddenClass);
//   };

//   const _intersectionObserverCB = (content) => {
//     console.log('[ShowOff] What is content?', content);

//     content.map((item) => {
//       const TARGET = item.target;
//       hiddenClass = `u-isShowOff--${TARGET.dataset.showOff}`;

//       if (!TARGET.classList.contains(hiddenClass)) {
//         return;
//       }

//       if (item.isIntersecting) {
//         _showItem(TARGET);
//       }
//     });
//   };

//   const _useIntersectionObserver = () => {
//     const SHOW_OFFS = [].slice.call(document.querySelectorAll('[data-show-off]'));
//     const IO = new IntersectionObserver(_intersectionObserverCB, { threshold: 0 });
//     const OBSERVABLE_SHOW_OFFS_IO = SHOW_OFFS.map(content => IO.observe(content));
//   };

//   const _eventsCB = () => {
//     ticking = false;

//     const SHOW_OFFS = [].slice.call(document.querySelectorAll('[data-show-off]'));
//     const OBSERVABLE_SHOW_OFFS_EVENTS = SHOW_OFFS.map((item) => {
//       hiddenClass = `u-isShowOff--${item.dataset.showOff}`;

//       if (!item.classList.contains(hiddenClass)) {
//         return;
//       }

//       const ITEM_TOP = item.getBoundingClientRect().top;
//       const ITEM_BOTTOM = item.getBoundingClientRect().bottom;
//       const TOP_IN_VIEW = ITEM_TOP >= 0 && ITEM_TOP <= window.innerHeight;
//       const BOTTOM_IN_VIEW = ITEM_BOTTOM >= 0 && ITEM_BOTTOM <= window.innerHeight;
//       const IN_FULL_VIEW = ITEM_TOP <= 0 && ITEM_BOTTOM >= window.innerHeight;

//       if (TOP_IN_VIEW || BOTTOM_IN_VIEW || IN_FULL_VIEW) {
//         _showItem(item);
//       }
//     });
//   };

//   const _requestTick = () => {
//     if (!ticking) {
//       requestAnimationFrame(_eventsCB);
//     }
//     ticking = true;
//   };

//   const _useEvents = () => {
//     window.addEventListener('scroll', _requestTick);
//     window.addEventListener('resize', _requestTick);
//     _requestTick();

//     updateAfterViewChange(_requestTick);
//   };

//   const _chooseIntersectionTechnique = () => {
//     'IntersectionObserver' in window
//       ? _useIntersectionObserver()
//       : _useEvents();
//   };

//   const construct = () => {
//     _chooseIntersectionTechnique();
//   };

//   return {
//     init: construct
//   };
// })();

// export default ShowOff;