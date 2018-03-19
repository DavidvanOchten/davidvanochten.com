import LazyLoader from '../lib/LazyLoader.js';
import ShowOff from '../lib/ShowOff.js';

const BaseController = (() => {
  const construct = () => {
    LazyLoader.init();
    ShowOff.init();
  };

  return {
    init: construct
  };
})();

export default BaseController;