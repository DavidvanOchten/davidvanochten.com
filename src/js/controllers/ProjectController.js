import Toggle from '../lib/Toggle.js';
import LazyLoader from '../lib/LazyLoader.js';

const ProjectController = (() => {

  const project = {};
  const gallery = {};

  const _toggleGallery = () => {
    project.columnToggle.toggle();
    gallery.headerToggle.toggle();

    document.body.classList.add('u-mask');

    (project.column.classList.contains('project__column--isFixed'))
      ? project.column.classList.remove('project__column--isFixed')
      : setTimeout(() => project.column.classList.add('project__column--isFixed'), 1000);
  };

  const _loadGallery = () => {
    if (window.getComputedStyle(gallery.hero).width) {
      gallery.hero.parentNode.classList.add('lazyLoader--isDone');
    }

    gallery.items.map(item => LazyLoader({
      element: item.querySelector('img'),
      callback: () => item.classList.add('gallery__item--isLoaded')
    }).init());
  }

  const construct = () => {
    project.columnToggle = Toggle({ id: 'column', class: 'project__column--isHidden' });
    project.column = document.querySelector('[data-toggle="column"]');
    project.column.addEventListener('transitionend', () => {
      document.body.removeAttribute('class');
      window.scrollTo({ top: 0 });
    });

    gallery.root = document.querySelector('[data-gallery="project"]');
    gallery.hero = gallery.root.querySelector('[data-gallery-hero]');
    gallery.items = [].slice.call(gallery.root.querySelectorAll('[data-gallery-item]'));
    gallery.headerToggle = Toggle({ id: 'site-header', class: 'siteHeader--isHidden' });

    gallery.heroLoader = LazyLoader({
      element: gallery.hero,
      callback: _loadGallery
    });

    gallery.trigger = Toggle({
      id: 'gallery-content',
      class: 'gallery__content--isVisible',
      triggerClass: 'gallery--isActive',
      callback: _toggleGallery
    });

    gallery.heroLoader.init();
    gallery.trigger.init();
  };

  return {
    init: construct
  };
})();

export default ProjectController;