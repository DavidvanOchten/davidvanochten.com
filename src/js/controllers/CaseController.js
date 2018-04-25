import Toggle from '../lib/Toggle.js';

const CaseController = (() => {

  const CASE = {};

  const construct = () => {
    CASE.SUMMARY_TOGGLE = Toggle({
      id: 'summary',
      targetClass: 'case__summary--isVisible',
      triggerClass: 'case__toggle--isActive'
    });

    CASE.SUMMARY_TOGGLE.init();
  };

  return {
    init: construct
  };
})();

export default CaseController;