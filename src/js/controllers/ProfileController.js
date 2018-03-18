import Accordion from '../lib/Accordion.js';

const ProfileController = (() => {

  const construct = () => {
    const TOGGLES = [...document.querySelectorAll('[data-accordion="toggle"]')];
    Accordion.init(TOGGLES);
  };

  return {
    init: construct
  };
})();

export default ProfileController;