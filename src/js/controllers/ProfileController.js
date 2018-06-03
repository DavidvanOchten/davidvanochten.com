import Toggle from '../lib/Toggle.js';

const ProfileController = (() => {

  const accordion = {
    activeItemClass: 'accordion__item--isActive'
  };

  const _toggleAccordionItem = (toggle) => {
    const content = toggle.trigger.querySelector('[data-accordion="content"]');

    if (toggle.trigger.classList.contains(accordion.activeItemClass)) {
      toggle.target.style.height = `${parseInt(window.getComputedStyle(content).height) + parseInt(window.getComputedStyle(content).paddingBottom)}px`;
      toggle.trigger.setAttribute('aria-expanded', true);
    } else {
      toggle.target.removeAttribute('style');
      toggle.trigger.setAttribute('aria-expanded', false);
    }
  };

  const construct = () => {
    accordion.root = document.querySelector(`[data-accordion="services"]`);
    accordion.items = [].slice.call(accordion.root.querySelectorAll('[data-accordion="item"]'));

    accordion.items.forEach(item => {
      Toggle({
        id: item.dataset.toggleTrigger,
        class: 'accordion__container--isVisible',
        triggerClass: 'accordion__item--isActive',
        callback: _toggleAccordionItem
      }).init();
    });
  };

  return {
    init: construct
  };
})();

export default ProfileController;