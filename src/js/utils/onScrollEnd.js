export const onScrollEnd = (container, cb, timing) => {
  let isScrolling;

  const _checkScroll = () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      container.removeEventListener('scroll', _checkScroll);
      cb();
    }, timing);
  };

  container.addEventListener('scroll', _checkScroll);
};