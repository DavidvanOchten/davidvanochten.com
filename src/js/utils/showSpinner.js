export const showSpinner = (state) => {
  const spinner = document.querySelector('[data-spinner]');

  state === true
    ? spinner.classList.add('spinner--isVisible')
    : spinner.classList.remove('spinner--isVisible');
};