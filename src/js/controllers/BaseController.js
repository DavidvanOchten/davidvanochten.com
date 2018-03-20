import LazyLoader from '../lib/LazyLoader.js';
import ShowOff from '../lib/ShowOff.js';
import Spinner from '../lib/Spinner.js';

const BaseController = (() => {
  const construct = () => {
    LazyLoader.init();
    ShowOff.init();
    Spinner.init();
  };

  return {
    init: construct
  };
})();

export default BaseController;