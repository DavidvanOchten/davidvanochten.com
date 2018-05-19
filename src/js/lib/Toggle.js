const Toggle = (obj) => {

  const toggle = {
    target: document.querySelector(`[data-toggle-target="${obj.id}"]`),
    targetClass: obj.targetClass,
    cb: obj.callback
  };

  const toggleItems = () => {
    toggle.target.classList.toggle(toggle.targetClass);

    (toggle.target.getAttribute('aria-hidden') !== null) && 
    (toggle.target.getAttribute('aria-hidden') === 'true')
      ? toggle.target.setAttribute('aria-hidden', false)
      : toggle.target.setAttribute('aria-hidden', true);

    if (toggle.trigger !== undefined) {
      toggle.trigger.getAttribute('aria-pressed') === 'false'
        ? toggle.trigger.setAttribute('aria-pressed', true)
        : toggle.trigger.setAttribute('aria-pressed', false);
    }

    if (toggle.triggerClass !== undefined) {
      toggle.trigger.classList.toggle(toggle.triggerClass);
    }

    if (toggle.cb) {
      toggle.cb(toggle);
    }
  };

  const construct = () => {
    toggle.trigger = document.querySelector(`[data-toggle-trigger="${obj.id}"]`);
    toggle.triggerClass = obj.triggerClass,

    toggle.trigger.addEventListener('click', toggleItems);
    toggle.trigger.addEventListener('keyup', e => {
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