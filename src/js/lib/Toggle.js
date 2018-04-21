const Toggle = (obj) => {

  const TOGGLE = {
    TARGET: document.querySelector(`[data-toggle="${obj.id}"]`),
    TARGET_CLASS: obj.class,
    CB: obj.callback
  };

  const toggleItems = (e) => {
    TOGGLE.TARGET.classList.toggle(TOGGLE.TARGET_CLASS);

    if (TOGGLE.TRIGGER_CLASS !== undefined) {
      TOGGLE.TRIGGER.classList.toggle(TOGGLE.TRIGGER_CLASS);
    }

    if (TOGGLE.CB) {
      TOGGLE.CB(TOGGLE);
    }
  };

  const construct = () => {
    TOGGLE.TRIGGER = document.querySelector(`[data-toggle-trigger="${obj.id}"]`);
    TOGGLE.TRIGGER_CLASS = obj.triggerClass,

    TOGGLE.TRIGGER.addEventListener('click', toggleItems);
    TOGGLE.TRIGGER.addEventListener('keyup', e => {
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

export default Toggle;