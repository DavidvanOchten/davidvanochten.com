import Toggle from '../lib/Toggle.js';

const CaseController = (() => {

  const view = {};
  const gallery = {};

  const _toggleGallery = () => {
    view.header.toggle();
    view.column.toggle();

    document.body.classList.add('u-isUnscrollable');

    // Which element transitionend? Gallery content?
    setTimeout(() => {
      window.scrollTo({ top: 0 });
      document.body.removeAttribute('class');
      gallery.root.classList.toggle('gallery--isVisible');
    }, 1000);
  };

  const construct = () => {
    view.header = Toggle({ id: 'site-header', class: 'siteHeader--isHidden' });
    view.column = Toggle({ id: 'column', class: 'case__column--isHidden' });

    gallery.root = document.querySelector('[data-gallery="case"]');

    gallery.trigger = Toggle({
      id: 'gallery-content',
      class: 'gallery__content--isVisible',
      triggerClass: 'gallery--isActive',
      callback: _toggleGallery
    });

    gallery.trigger.init();
  };

  return {
    init: construct
  };
})();

export default CaseController;