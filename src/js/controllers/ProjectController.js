import Toggle from '../lib/Toggle.js';

const ProjectController = (() => {

  const project = {};
  const gallery = {};

  const _toggleGallery = () => {
    project.header.toggle();
    project.column.toggle();

    document.body.classList.add('u-mask');

    // Which element transitionend? Gallery content?
    setTimeout(() => {
      window.scrollTo({ top: 0 });
      document.body.removeAttribute('class');
      gallery.root.classList.toggle('gallery--isVisible');
    }, 1000);
  };

  const construct = () => {
    project.header = Toggle({ id: 'site-header', class: 'siteHeader--isHidden' });
    project.column = Toggle({ id: 'column', class: 'project__column--isHidden' });

    gallery.root = document.querySelector('[data-gallery="project"]');

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

export default ProjectController;