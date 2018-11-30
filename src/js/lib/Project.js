import Video from '../lib/Video';
import { disableUserInput } from '../utils/disableUserInput';
import { handleFetchError } from '../utils/handleFetchError';
import { hideCursor } from '../utils/hideCursor';

const Project = (element) => {
  const project = {};
  const browser = {};

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
          document.body.classList.remove('u-no-scroll');
          project.root.classList.remove(project.rootClass);
          project.gallery.classList.remove(project.galleryVisibleClass);
          project.thumbnail.classList.remove(project.thumbnailClass);

          project.thumbnail.addEventListener('mouseover', _togglePointerHint);
          project.thumbnail.addEventListener('mouseout', _togglePointerHint);

          if (document.body.dataset.mutedVideos === 'true' && project.videoElement) {
            project.video.setVideo(false);
          }

          project.gallery.removeEventListener('transitionend', _transitionOutOfGallery);
          project.gallery.removeAttribute('style');
          disableUserInput(false);
        })
        .catch(err => handleFetchError(err));
    }
  };

  const _hideGallery = () => {
    if (browser.isMobile.matches) {
      project.galleryContainer.removeEventListener('scroll', _requestTick);
    }

    if (project.videoElement) {
      if (document.body.dataset.mutedVideos === 'false') {
        project.video.setVideo(false);
      }

      browser.cursor.classList.remove('cursor--gallery');
      browser.cursor.classList.remove('cursor--is-visible');
    }

    project.gallery.addEventListener('transitionend', _transitionOutOfGallery);
    project.gallery.classList.remove(project.galleryActiveClass);
  };

  const _showGalleryContent = () => {
    project.gallery.classList.add(project.galleryActiveClass);

    if (project.videoElement) {
      project.video.setVideo(true);

      browser.cursor.classList.add('cursor--gallery');
      browser.cursor.classList.add('cursor--is-visible');
    }

    disableUserInput(false);
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

  const _handleMobileScroll = () => {
    browser.ticking = false;

    if (project.galleryContainer.scrollTop < 1) {
      project.galleryContainer.scrollTop = 1;
    } else if (project.galleryContainer.scrollHeight - project.galleryContainer.scrollTop === project.galleryContainer.clientHeight) {
      project.galleryContainer.scrollTop = project.galleryContainer.scrollHeight - project.galleryContainer.clientHeight - 1;
    }
  };

  const _requestTick = (e) => {
    if (!browser.ticking) {
      requestAnimationFrame(_handleMobileScroll);
    }
    browser.ticking = true;
  };


  const _showGallery = () => {
    document.body.classList.add('u-no-scroll');
    browser.cursor.classList.toggle('cursor--is-visible');

    if (browser.isMobile.matches) {
      project.galleryContainer.addEventListener('scroll', _requestTick);
    }

    if (browser.cursor.classList.contains('cursor--video')) {
      browser.cursor.classList.toggle('cursor--video');
    }

    project.root.classList.add(project.rootClass);
    project.gallery.classList.add(project.galleryVisibleClass);

    project.thumbnail.removeEventListener('mouseover', _togglePointerHint);
    project.thumbnail.removeEventListener('mouseout', _togglePointerHint);

    project.thumbnail.addEventListener('transitionend', _transitionIntoGallery);
    project.thumbnail.classList.add(project.thumbnailClass);
  };

  const _onToggleClick = (e) => {
    if (document.body.classList.contains('u-is-loading')) {
      return;
    }

    e.preventDefault();
    disableUserInput(true);

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

  const _togglePointerHint = (e) => {
    browser.cursor.classList.toggle('cursor--is-visible');

    if (e.currentTarget.closest('[data-project]').dataset.project === 'video') {
      browser.cursor.classList.toggle('cursor--video');
    }
  };

  const construct = () => {
    browser.cursor = document.querySelector('[data-cursor]');
    browser.isMobile = window.matchMedia('(pointer: coarse)');

    project.root = element;
    project.gallery = project.root.querySelector('[data-project-gallery]');
    project.galleryContainer = project.gallery.querySelector('[data-project-gallery-container]');
    project.thumbnail = project.root.querySelector('[data-project-thumbnail]');
    project.videoElement = project.gallery.querySelector('video') || false;

    project.rootClass = 'project--is-active';
    project.galleryActiveClass = 'gallery--is-active';
    project.galleryVisibleClass = 'project__gallery--is-visible';
    project.thumbnailClass = 'project__thumbnail--is-hidden';

    project.toggles = [].slice.call(project.root.querySelectorAll('[data-project-toggle]'));
    project.toggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    project.thumbnail.addEventListener('mouseover', _togglePointerHint);
    project.thumbnail.addEventListener('mouseout', _togglePointerHint);

    if (project.videoElement) {
      project.video = Video(project.videoElement);
      project.video.init();

      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseover', (e) => hideCursor(true));
      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseout', (e) => hideCursor(false));
    }
  };

  return {
    init: construct
  };
};

export default Project;