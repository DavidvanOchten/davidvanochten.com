const Spinner = () => {

  const SPINNER = document.querySelector('[data-spinner]');

  const USER = {
    MOUSE_X: 0,
    MOUSE_Y: 0
  }

  const _trackSpinner = (e) => {
    USER.MOUSE_X = e.clientX;
    USER.MOUSE_Y = e.clientY;

    // SPINNER.style.top = `${USER.MOUSE_Y - 6}px`;
    // SPINNER.style.left = `${USER.MOUSE_X + 10}px`;
    SPINNER.style.top = `${USER.MOUSE_Y}px`;
    SPINNER.style.left = `${USER.MOUSE_X}px`;
  };

  const construct = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      return;
    }

    window.addEventListener('mousemove', _trackSpinner);
  };

  return {
    init: construct
  };
};

export default Spinner;