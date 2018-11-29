export const hideCursor = (bool) => {
  const cursor = document.querySelector('[data-cursor]');

  (bool === true)
    ? cursor.classList.add('cursor--is-hidden')
    : cursor.classList.remove('cursor--is-hidden');
};