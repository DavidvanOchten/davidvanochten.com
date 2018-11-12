import { beforeViewChange } from "../utils/beforeViewChange.js";

const IntersectionTracker = obj => {
  const intersectionTracker = {};
  const browser = {};

  const _intersectionObserverCB = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= obj.threshold && entry.isIntersecting) {
        entry.target.dataset.intersected = "true";

        if (intersectionTracker.useFlag) {
          intersectionTracker.io.unobserve(entry.target);
        }
      } else {
        entry.target.dataset.intersected = "false";
      }
      // if (entry.isIntersecting) {
      //   entry.target.dataset.intersected = "true";

      //   if (intersectionTracker.useFlag) {
      //     intersectionTracker.io.unobserve(entry.target);
      //   }
      // } else {
      //   entry.target.dataset.intersected = "false";
      // }

      intersectionTracker.cb(entry.target);
    });
  };

  const buildThresholdList = () => {
    const thresholds = [];

    for (let i = 1.0; i <= 100; i++) {
      const ratio = i / 100;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  };

  const _useIntersectionObserver = () => {
    // const options = { threshold: 0, rootMargin: `-${intersectionTracker.threshold}px` };
    const options = { threshold: buildThresholdList() };

    intersectionTracker.io = new IntersectionObserver(_intersectionObserverCB, options);
    intersectionTracker.content.forEach(item => intersectionTracker.io.observe(item));
  };

  const _eventsCB = () => {
    browser.ticking = false;

    intersectionTracker.content.forEach(item => {
      if (intersectionTracker.useFlag && item.dataset.intersected === "true") {
        return;
      }

      const itemTop = item.getBoundingClientRect().top;
      const itemBottom = item.getBoundingClientRect().bottom;

      if (intersectionTracker.threshold === 0) {
        const topInView = itemTop >= 0 && itemTop <= window.innerHeight;
        const bottomInView = itemBottom >= 0 && itemBottom <= window.innerHeight;
        const inFullView = itemTop <= 0 && itemBottom >= window.innerHeight;

        intersectionTracker.condition = "(topInView || bottomInView || inFullView)";
      } else {
        intersectionTracker.condition =
          "(itemTop <= intersectionTracker.threshold && itemBottom >= intersectionTracker.threshold)";
      }

      eval(intersectionTracker.condition)
        ? (item.dataset.intersected = "true")
        : (item.dataset.intersected = "false");

      intersectionTracker.cb(item);
    });
  };

  const _requestTick = () => {
    if (!browser.ticking) {
      requestAnimationFrame(_eventsCB);
    }
    browser.ticking = true;
  };

  const _useEvents = () => {
    intersectionTracker.container.addEventListener("scroll", _requestTick);
    intersectionTracker.container.addEventListener("resize", _requestTick);
    _requestTick();
  };

  const _selectIntersectionTechnique = () => {
    "IntersectionObserver" in window ? _useIntersectionObserver() : _useEvents();
  };

  const _remove = () => {
    intersectionTracker.container.removeEventListener("scroll", _requestTick);
    intersectionTracker.container.removeEventListener("resize", _requestTick);

    if (intersectionTracker.io) {
      intersectionTracker.io.disconnect();
    }
  };

  const construct = () => {
    intersectionTracker.content = obj.content;
    intersectionTracker.container = obj.container;
    intersectionTracker.threshold = obj.threshold * window.innerHeight || 0;
    intersectionTracker.cb = obj.callback;
    intersectionTracker.useFlag = obj.flag;

    browser.ticking = false;

    _selectIntersectionTechnique();
    beforeViewChange(_remove);
  };

  return {
    init: construct
  };
};

export default IntersectionTracker;
