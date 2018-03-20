const Spinner = (() => {
  let spinner = null;

  const _trackSpinner = (e) => {
    const MOUSE_X = e.clientX;
    const MOUSE_Y = e.clientY;

    spinner.style.top = `${MOUSE_Y - 2}px`;
    spinner.style.left = `${MOUSE_X + 12}px`;
  };

  const _construct = (status) => {
    spinner = document.querySelector('[data-spinner]');
    window.addEventListener('mousemove', _trackSpinner);
  };

  return {
    init: _construct
  };
})();

export default Spinner;