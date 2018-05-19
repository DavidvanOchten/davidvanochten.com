const Spinner = () => {

  const spinner = document.querySelector('[data-spinner]');

  const user = {
    mouseX: 0,
    mouseY: 0
  }

  const _trackSpinner = (e) => {
    user.mouseX = e.clientX;
    user.mouseY = e.clientY;

    // spinner.style.top = `${user.mouseY - 6}px`;
    // spinner.style.left = `${user.mouseX + 10}px`;
    spinner.style.top = `${user.mouseY}px`;
    spinner.style.left = `${user.mouseX}px`;
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