const Toggler = (obj) => {

  const TOGGLER = {
    TARGET: document.querySelector(`[data-toggle="${obj.id}"]`),
    TARGET_CLASS: obj.class,
    CB: obj.callback
  };

  const toggleItems = (e) => {
    TOGGLER.TARGET.classList.toggle(TOGGLER.TARGET_CLASS);

    if (TOGGLER.TRIGGER_CLASS !== undefined) {
      TOGGLER.TRIGGER.classList.toggle(TOGGLER.TRIGGER_CLASS);
    }

    if (TOGGLER.CB) {
      TOGGLER.CB(TOGGLER);
    }
  };

  const construct = () => {
    TOGGLER.TRIGGER = document.querySelector(`[data-toggle-trigger="${obj.id}"]`);
    TOGGLER.TRIGGER_CLASS = obj.triggerClass,

    TOGGLER.TRIGGER.addEventListener('click', toggleItems);
    TOGGLER.TRIGGER.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        toggleItems();
      }
    });
  };

  return {
    init: construct,
    toggle: toggleItems
  };

};

export default Toggler;