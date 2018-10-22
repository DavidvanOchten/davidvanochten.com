import LazyLoader from '../lib/LazyLoader';
import { handleFetchError } from '../utils/handleFetchError';

const Project = (obj) => {
  const project = {};

  const _disableUserInput = (bool) => {
    if (bool === true) {
      project.isTransitioning = true;
      project.container.classList.add('u-is-loading');
    } else {
      project.isTransitioning = false;
      project.container.classList.remove('u-is-loading');
    }
  };

  const _setTransformValues = (element, values) => {
    return new Promise(resolve => {
      if (values === undefined) {
        values = {};
      }

      const { a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0 } = values;

      const _resolveTransition = (e) => {
        if (e.target === element) {
          element.removeEventListener('transitionend', _resolveTransition);
          resolve();
        }
      }

      element.addEventListener('transitionend', _resolveTransition);
      element.style.webkitTransform = `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
      element.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
    });
  };

  const _transitionOutOfGallery = (e) => {
    if (e.target === project.gallery) {
      _setTransformValues(project.thumbnail, {})
        .then(() => {
          project.root.classList.remove(project.rootClass);
          project.container.classList.remove(project.containerClass);
          project.gallery.classList.remove(project.galleryVisibleClass);
          project.thumbnail.classList.remove(project.thumbnailClass);

          project.gallery.removeEventListener('transitionend', _transitionOutOfGallery);
          project.gallery.removeAttribute('style');
          _disableUserInput(false);
        })
        .catch(err => handleFetchError(err));
    }
  };

  const _hideGallery = () => {
    project.gallery.addEventListener('transitionend', _transitionOutOfGallery);
    project.gallery.classList.remove(project.galleryActiveClass);
  };

  const _showGalleryContent = () => {
    project.gallery.classList.add(project.galleryActiveClass);
    _disableUserInput(false);
  };

  const _transitionIntoGallery = (e) => {
    if (e.target === project.thumbnail) {
      project.thumbnail.removeEventListener('transitionend', _transitionIntoGallery);
      project.gallery.style.webkitTransform = `translate3d(0, ${project.gallery.getBoundingClientRect().top * -1}px, 0)`;
      project.gallery.style.transform = `translate3d(0, ${project.gallery.getBoundingClientRect().top * -1}px, 0)`;

      _setTransformValues(project.thumbnail, project.matrixValuesY)
        .then(() => _setTransformValues(project.thumbnail, project.matrixValuesAll))
        .then(() => _showGalleryContent())
        .catch(err => console.log(err));
    }
  };

  const _showGallery = () => {
    project.root.classList.add(project.rootClass);
    project.container.classList.add(project.containerClass);
    project.gallery.classList.add(project.galleryVisibleClass);

    project.thumbnail.addEventListener('transitionend', _transitionIntoGallery);
    project.thumbnail.classList.add(project.thumbnailClass);
  };

  const _onToggleClick = (e) => {
    if (project.isTransitioning) {
      return;
    }

    e.preventDefault();
    _disableUserInput(true);

    project.thumnbnailData = project.thumbnail.getBoundingClientRect();

    project.matrixValuesY = {
      d: window.innerHeight / project.thumnbnailData.height,
      ty: Math.round(project.thumnbnailData.top * -1)
    };

    project.matrixValuesAll = {
      a: window.innerWidth / project.thumnbnailData.width,
      d: window.innerHeight / project.thumnbnailData.height,
      tx: Math.round(project.thumnbnailData.left * -1),
      ty: Math.round(project.thumnbnailData.top * -1)
    }

    project.root.classList.contains(project.rootClass)
      ? _hideGallery()
      : _showGallery();
  };

  const construct = () => {
    project.container = obj.container;
    project.root = obj.element;
    project.gallery = project.root.querySelector('[data-project-gallery]');
    project.thumbnail = project.root.querySelector('[data-project-thumbnail]');

    project.toggles = [].slice.call(project.root.querySelectorAll('[data-project-toggle]'));
    project.toggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    project.rootClass = 'project--is-active';
    project.containerClass = 'projects__list--is-inactive';
    project.galleryActiveClass = 'project__gallery--is-active';
    project.galleryVisibleClass = 'project__gallery--is-visible';
    project.thumbnailClass = 'project__thumbnail--is-hidden';
    project.isTransitioning = false;

    console.log('Project.js: z-index problem with headline overlapping the gallery');
    console.log('Project.js: Check Safari video');
  };

  return {
    init: construct
  };
};

export default Project;