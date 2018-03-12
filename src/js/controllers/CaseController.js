import Toggle from '../lib/Toggle.js';

const CaseController = (() => {
  const construct = () => {
    // Progression tracker
    Toggle.init('info', 'toggle--isActive', 'case__summary--isVisible');
  };

  return {
    init: construct
  };
})();

export default CaseController;