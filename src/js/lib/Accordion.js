const Accordion = (() => {
  const ACTIVE_ITEM_CLASS = 'accordion__item--isActive';
  const VISIBLE_CONTENT_CLASS = 'accordion__content--isVisible';

  const _construct = (arr) => {
    arr.map((item) => {
      item.addEventListener('click', (e) => {
        const CONTENT = e.currentTarget.querySelector('[data-accordion="content"]');
        item.classList.toggle(ACTIVE_ITEM_CLASS);
  
        if (item.classList.contains(ACTIVE_ITEM_CLASS)) {
          CONTENT.style.height = `${item.offsetHeight + CONTENT.offsetHeight + 24}px`;
          CONTENT.classList.add(VISIBLE_CONTENT_CLASS);
        } else {
          CONTENT.style.height = 0;
          CONTENT.classList.remove(VISIBLE_CONTENT_CLASS);
        }
      })
    });
  };

  return {
    init: _construct
  };
})();

export default Accordion;