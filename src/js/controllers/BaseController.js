import LazyLoader from '../lib/LazyLoader.js';

const BaseController = (() => {
  const construct = () => {
    LazyLoader.init();
  };

  return {
    init: construct
  };
})();

export default BaseController;