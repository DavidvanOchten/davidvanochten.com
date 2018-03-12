const Toggle = (() => {
  let toggleButton = null;
  let toggleTarget = null;

  const _toggleTarget = (buttonClass, targetClass) => {
    toggleButton.classList.toggle(`${buttonClass}`);
    toggleTarget.classList.toggle(`${targetClass}`);
  };

  const _construct = (val, buttonClass, targetClass) => {
    toggleButton = document.querySelector(`[data-toggle-button="${val}"]`)
    toggleTarget = document.querySelector(`[data-toggle-target="${val}"]`);
    toggleButton.addEventListener('click', e => _toggleTarget(buttonClass, targetClass));
  };

  return {
    init: _construct
  }
})();

export default Toggle;