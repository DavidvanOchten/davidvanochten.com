import Video from '../lib/Video';
import { handleFetchError } from '../utils/handleFetchError';

const Project = (element) => {
  const project = {};

  const _disableUserInput = (bool) => {
    if (bool === true) {
      project.isTransitioning = true;
      document.body.classList.add('u-is-loading');
    } else {
      project.isTransitioning = false;
      document.body.classList.remove('u-is-loading');
    }
  };

  const _hidePointerHint = (bool) => {
    (bool === true)
      ? project.pointer.classList.add('projects__pointer--close')
      : project.pointer.classList.remove('projects__pointer--close');
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
          _disableUserInput(false);
        })
        .catch(err => handleFetchError(err));
    }
  };

  const _hideGallery = () => {
    if (project.videoElement) {
      if (document.body.dataset.mutedVideos === 'false') {
        project.video.setVideo(false);
      }

      // Improve this pointer thing (naming)
      project.pointer.classList.remove('projects__pointer--gallery');
      project.pointer.classList.remove('projects__pointer--is-visible');
    }

    project.gallery.addEventListener('transitionend', _transitionOutOfGallery);
    project.gallery.classList.remove(project.galleryActiveClass);
  };

  const _showGalleryContent = () => {
    project.gallery.classList.add(project.galleryActiveClass);

    if (project.videoElement) {
      project.video.setVideo(true);

      // Improve this pointer thing (naming)
      project.pointer.classList.add('projects__pointer--gallery');
      project.pointer.classList.add('projects__pointer--is-visible');
    }

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
    document.body.classList.add('u-no-scroll');
    project.pointer.classList.toggle('projects__pointer--is-visible');

    if (project.pointer.classList.contains('projects__pointer--video')) {
      project.pointer.classList.toggle('projects__pointer--video');
    }

    project.root.classList.add(project.rootClass);
    project.gallery.classList.add(project.galleryVisibleClass);

    project.thumbnail.removeEventListener('mouseover', _togglePointerHint);
    project.thumbnail.removeEventListener('mouseout', _togglePointerHint);

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

  const _togglePointerHint = (e) => {
    project.pointer.classList.toggle('projects__pointer--is-visible');

    if (e.currentTarget.closest('[data-project]').dataset.project === 'video') {
      project.pointer.classList.toggle('projects__pointer--video');
    }
  };

  const construct = () => {
    project.root = element;
    project.gallery = project.root.querySelector('[data-project-gallery]');
    project.galleryContainer = project.gallery.querySelector('[data-project-gallery-container]');
    project.pointer = document.querySelector('[data-projects-pointer]');
    project.thumbnail = project.root.querySelector('[data-project-thumbnail]');
    project.videoElement = project.gallery.querySelector('video') || false;
    project.isTransitioning = false;

    project.rootClass = 'project--is-active';
    project.galleryActiveClass = 'project__gallery--is-active';
    project.galleryVisibleClass = 'project__gallery--is-visible';
    project.thumbnailClass = 'project__thumbnail--is-hidden';

    project.toggles = [].slice.call(project.root.querySelectorAll('[data-project-toggle]'));
    project.toggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    project.thumbnail.addEventListener('mouseover', _togglePointerHint);
    project.thumbnail.addEventListener('mouseout', _togglePointerHint);

    if (project.videoElement) {
      project.video = Video(project.videoElement);
      project.video.init();

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isSafari) {
        // video.element.muted = true;
        project.video.muteVideo(true);
        project.pointer.classList.add('projects__pointer--mute');
        document.body.dataset.mutedVideos = 'true';
      }

      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseover', (e) => _hidePointerHint(true));
      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseout', (e) => _hidePointerHint(false));

      project.galleryContainer.addEventListener('click', () => {
        if (document.body.dataset.mutedVideos === 'true') {
          project.video.muteVideo(false);
          project.pointer.classList.remove('projects__pointer--mute');
          document.body.dataset.mutedVideos = 'false';
        } else {
          project.video.muteVideo(true);
          project.pointer.classList.add('projects__pointer--mute');
          document.body.dataset.mutedVideos = 'true';
        }
      });
    }
  };

  return {
    init: construct
  };
};

export default Project;
