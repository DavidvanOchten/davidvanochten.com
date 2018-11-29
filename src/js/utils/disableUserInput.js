export const disableUserInput = (bool) => {
  (bool === true)
    ? document.body.classList.add('u-is-loading')
    : document.body.classList.remove('u-is-loading');
};