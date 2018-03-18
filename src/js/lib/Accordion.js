const Accordion = (() => {
  const ACTIVE_ITEM_CLASS = 'accordion__item--isActive';
  const VISIBLE_CONTENT_CLASS = 'accordion__content--isVisible';
  const ACTIVE_TITLE_CLASS = 'accordion__title--isActive';

  const _construct = (arr) => {
    arr.map((item) => {
      item.addEventListener('click', (e) => {
        const CONTAINER = e.currentTarget.querySelector('[data-accordion="container"]');
        const TITLE = e.currentTarget.querySelector('[data-accordion="title"]');
        const CONTENT = e.currentTarget.querySelector('[data-accordion="content"]');

        item.classList.toggle(ACTIVE_ITEM_CLASS);
  
        if (item.classList.contains(ACTIVE_ITEM_CLASS)) {
          CONTAINER.style.height = `${parseInt(window.getComputedStyle(CONTENT).height) + parseInt(window.getComputedStyle(CONTENT).paddingBottom)}px`;
          CONTENT.classList.add(VISIBLE_CONTENT_CLASS);
          TITLE.classList.add(ACTIVE_TITLE_CLASS);
        } else {
          CONTAINER.style.height = 0;
          CONTENT.classList.remove(VISIBLE_CONTENT_CLASS);
          TITLE.classList.remove(ACTIVE_TITLE_CLASS);
        }
      })
    });
  };

  return {
    init: _construct
  };
})();

export default Accordion;