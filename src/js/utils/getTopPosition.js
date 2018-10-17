export const getTopPosition = (el) => {
  let elTopPosition = 0;

  while (el) {
    elTopPosition += el.offsetTop + el.clientTop;
    el = el.offsetParent;
  }

  return elTopPosition;
};
