import Accordion from '../lib/Accordion.js';

const AboutController = (() => {

  const construct = () => {
    const TOGGLES = [...document.querySelectorAll('[data-accordion="toggle"]')];
    Accordion.init(TOGGLES);
  };

  return {
    init: construct
  };
})();

export default AboutController;