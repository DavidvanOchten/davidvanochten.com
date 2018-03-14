import Accordion from '../lib/Accordion.js';

const AboutController = (() => {

  const construct = () => {
    const accordionToggles = [...document.querySelectorAll('[data-accordion="toggle"]')];
    Accordion.init(accordionToggles);
  };

  return {
    init: construct
  };
})();

export default AboutController;