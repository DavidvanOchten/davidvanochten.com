import Toggle from '../lib/Toggle.js';

const CaseController = (() => {

  const view = {};
  const gallery = {};

  const _toggleGallery = () => {
    view.header.toggle();
    view.column.toggle();
    gallery.hero.toggle();
    gallery.indicator.toggle();
  };

  const construct = () => {
    // Clean up all these toggles?
    view.header = Toggle({ id: 'site-header', class: 'siteHeader--isHidden' });
    view.column = Toggle({ id: 'column', class: 'case__column--isHidden' });

    gallery.indicator = Toggle({ id: 'gallery-indicator', class: 'gallery__indicator--isHidden' });
    gallery.hero = Toggle({ id: 'gallery-hero', class: 'gallery__hero--isHidden' });
    gallery.trigger = Toggle({
      id: 'gallery-content',
      class: 'gallery-content--isVisible',
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