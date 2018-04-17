// const Scroller = (() => {
//   const SCROLLER = {
//     ID: null,
//     TARGET: null,
//     TRIGGER: null,
//     DURATION: 1000,
//     EASING: 'easeInOutCubic',
//     CB: null
//   };

//   const EASINGS = {
//     linear(t) {
//       return t;
//     },
//     easeInOutCubic(t) {
//       return t < 0.5
//         ? 4 * t * t * t
//         : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
//     }
//   };

//   const _checkBody = () => {
//     document.documentElement.scrollTop += 1;
//     const BODY = (document.documentElement.scrollTop !== 0)
//       ? document.documentElement
//       : document.body;
//     document.documentElement.scrollTop -= 1;
//     return BODY;
//   };

//   const _getTargetTop = (target) => {
//     let topPosition = 0;

//     while (target) {
//         topPosition += (target.offsetTop + target.clientTop);
//         target = target.offsetParent;
//     }

//     return topPosition;
//   };

//   const _scrollTo = () => {
//     const BODY = _checkBody();
//     const START_POS = BODY.scrollTop;
//     const START_TIME = window.performance.now
//       ? (performance.now() + performance.timing.navigationStart)
//       : Date.now();

//     const WINDOW_HEIGHT = window.innerHeight;
//     const DOCUMENT_HEIGHT = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

//     let targetTop = null;

//     SCROLLER.ID === 'top'
//       ? targetTop = 0
//       : targetTop = _getTargetTop(SCROLLER.TARGET);

//     const DESTINATION = DOCUMENT_HEIGHT - targetTop < WINDOW_HEIGHT
//       ? DOCUMENT_HEIGHT - WINDOW_HEIGHT
//       : targetTop;

//     const _scroll = () => {
//       const NOW = window.performance.now
//         ? (performance.now() + performance.timing.navigationStart)
//         : Date.now();

//       const TIME = Math.min(1, ((NOW - START_TIME) / SCROLLER.DURATION));
//       const EASED_TIME = EASINGS[SCROLLER.EASING](TIME);
//       BODY.scrollTop = (EASED_TIME * (DESTINATION - START_POS)) + START_POS;

//       if (BODY.scrollTop === DESTINATION) {
//         if (SCROLLER.CB !== null) {
//           SCROLLER.CB();
//         }
//         return;
//       }
//       requestAnimationFrame(_scroll);
//     };
//     requestAnimationFrame(_scroll);
//   };

//   const construct = (obj) => {
//     if (obj.duration) {
//       SCROLLER.DURATION = obj.duration;
//     }

//     if (obj.easing) {
//       SCROLLER.EASING = obj.easing;
//     }

//     if (obj.callback) {
//       SCROLLER.CB = obj.callback;
//     }

//     SCROLLER.ID = obj.id;
//     SCROLLER.TARGET = document.querySelector(`[data-scroller-target="${SCROLLER.ID}"]`);
//     SCROLLER.TRIGGER = document.querySelector(`[data-scroller-trigger="${SCROLLER.ID}"]`);
//     SCROLLER.TRIGGER.addEventListener('click', _scrollTo);
//   };

//   return {
//     init: construct
//   };
// })();

// export default Scroller;