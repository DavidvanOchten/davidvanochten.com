import Toggle from '../lib/Toggle.js';
import LazyLoader from '../lib/LazyLoader.js';

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

  const _loadGallery = () => {
    if (window.getComputedStyle(gallery.hero).width) {
      gallery.hero.parentNode.classList.add('lazyLoader--isDone');
    }

    gallery.items.map(item => LazyLoader({ element: item.querySelector('img') }).init());
  }

  const construct = () => {
    project.header = Toggle({ id: 'site-header', class: 'siteHeader--isHidden' });
    project.column = Toggle({ id: 'column', class: 'project__column--isHidden' });
    
    gallery.root = document.querySelector('[data-gallery="project"]');
    gallery.hero = gallery.root.querySelector('[data-gallery-hero]');

    gallery.items = [].slice.call(gallery.root.querySelectorAll('[data-gallery-item]'));
    const galleryHero = LazyLoader({
      element: gallery.hero,
      callback: _loadGallery
    });

    galleryHero.init();

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