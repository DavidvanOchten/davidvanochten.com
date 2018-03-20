const Spinner = (() => {
  let spinner = null;

  const _trackSpinner = (e) => {
    const MOUSE_X = e.clientX;
    const MOUSE_Y = e.clientY;

    spinner.style.top = `${MOUSE_Y - 6}px`;
    spinner.style.left = `${MOUSE_X + 10}px`;
  };

  const _construct = (status) => {
    spinner = document.querySelector('[data-spinner]');

    // Check if the current device is not a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      return;
    }

    window.addEventListener('mousemove', _trackSpinner);
  };

  return {
    init: _construct
  };
})();

export default Spinner;