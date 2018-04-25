const Toggle = (obj) => {

  const TOGGLE = {
    TARGET: document.querySelector(`[data-toggle-target="${obj.id}"]`),
    TARGET_CLASS: obj.targetClass,
    CB: obj.callback
  };

  const toggleItems = () => {
    TOGGLE.TARGET.classList.toggle(TOGGLE.TARGET_CLASS);

    (TOGGLE.TARGET.getAttribute('aria-hidden') !== null) && 
    (TOGGLE.TARGET.getAttribute('aria-hidden') === 'true')
      ? TOGGLE.TARGET.setAttribute('aria-hidden', false)
      : TOGGLE.TARGET.setAttribute('aria-hidden', true);

    if (TOGGLE.TRIGGER !== undefined) {
      TOGGLE.TRIGGER.getAttribute('aria-pressed') === 'false'
        ? TOGGLE.TRIGGER.setAttribute('aria-pressed', true)
        : TOGGLE.TRIGGER.setAttribute('aria-pressed', false);
    }

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