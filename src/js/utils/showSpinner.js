export const showSpinner = (state) => {
  const SPINNER = document.querySelector('[data-spinner]');

  state === true
    ? SPINNER.classList.add('spinner--isVisible')
    : SPINNER.classList.remove('spinner--isVisible');
};