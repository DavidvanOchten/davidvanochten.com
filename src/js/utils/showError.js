export const showError = (err) => {
  const ERROR_NOTIFICATION = document.querySelector('[data-popup="error"]');
  ERROR_NOTIFICATION.classList.add('popup--visible');
  ERROR_NOTIFICATION.querySelector('[data-popup="close"]').addEventListener('click', e => {
    ERROR_NOTIFICATION.classList.remove('popup--visible');
  });
};