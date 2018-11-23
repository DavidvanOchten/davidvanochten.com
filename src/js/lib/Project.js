import { handleFetchError } from '../utils/handleFetchError';

const Project = (obj) => {
  const project = {};
  const user = {};

  const _disableUserInput = (bool) => {
    if (bool === true) {
      project.isTransitioning = true;
      project.parent.classList.add('u-is-loading');
    } else {
      project.isTransitioning = false;
      project.parent.classList.remove('u-is-loading');
    }
  };

  const _onWheel = (e) => {
    window.clearTimeout(user.isWheeling);

    user.isWheeling = setTimeout(() => {
      project.video.playbackRate = 1;
      project.video.style.filter = '';

      if (project.parent.dataset.mutedVideos === 'false') {
        project.video.volume = 1;
      }
    }, 100);

    if (e.deltaY > 1) {
      project.video.volume = 0;
      project.video.style.filter = 'grayscale(1)';

      (e.deltaY > 50)
        ? project.video.playbackRate = 5
        : project.video.playbackRate = 1 + e.deltaY / 10;
    }
  };

  const _setVolume = (bool, cb) => {
    let volume = (bool === true) ? 0 : 1;
    const volumeCondition = (bool === true) ? 'volume >= 1' : 'volume <= 0';
    const volumeDirection = (bool === true) ? 'volume + 0.05' : 'volume - 0.05';

    const controlVolume = setInterval(() => {
      volume = parseFloat((eval(volumeDirection)).toFixed(2));
      project.video.volume = volume;

      if (eval(volumeCondition)) {
        clearInterval(controlVolume);

        if (cb) {
          cb();
        }
      }
    }, 50);
  };

  const _setVideo = (bool) => {
    if (bool === true) {
      project.video.play();
      project.pointer.classList.add('projects__pointer--gallery');
      project.pointer.classList.add('projects__pointer--is-visible');

      if (project.parent.dataset.mutedVideos === 'false') {
        _setVolume(true);
      }
    } else {
      project.pointer.classList.remove('projects__pointer--gallery');
      project.pointer.classList.remove('projects__pointer--is-visible');

      if (project.parent.dataset.mutedVideos === 'false') {
        _setVolume(false, () => {
          project.video.pause();
        });
      }
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
          project.root.classList.remove(project.rootClass);
          project.parent.classList.remove(project.parentClass);
          project.gallery.classList.remove(project.galleryVisibleClass);
          project.thumbnail.classList.remove(project.thumbnailClass);

          project.thumbnail.addEventListener('mouseover', _togglePointerHint);
          project.thumbnail.addEventListener('mouseout', _togglePointerHint);

          project.gallery.removeEventListener('transitionend', _transitionOutOfGallery);
          project.gallery.removeAttribute('style');
          _disableUserInput(false);
        })
        .catch(err => handleFetchError(err));
    }
  };

  const _hideGallery = () => {
    if (project.video) {
      _setVideo(false);
      window.removeEventListener('wheel', _onWheel);
    }

    project.gallery.addEventListener('transitionend', _transitionOutOfGallery);
    project.gallery.classList.remove(project.galleryActiveClass);
  };

  const _showGalleryContent = () => {
    project.gallery.classList.add(project.galleryActiveClass);

    if (project.video) {
      _setVideo(true);
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
    project.pointer.classList.toggle('projects__pointer--is-visible');

    if (project.pointer.classList.contains('projects__pointer--video')) {
      project.pointer.classList.toggle('projects__pointer--video');
    }

    project.thumbnail.removeEventListener('mouseover', _togglePointerHint);
    project.thumbnail.removeEventListener('mouseout', _togglePointerHint);

    project.root.classList.add(project.rootClass);
    project.parent.classList.add(project.parentClass);
    project.gallery.classList.add(project.galleryVisibleClass);

    if (project.video) {
      window.addEventListener('wheel', _onWheel, { passive: true });
    }

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
    project.parent = obj.parent || document.body;
    project.root = obj.element;
    project.gallery = project.root.querySelector('[data-project-gallery]');
    project.galleryContainer = project.gallery.querySelector('[data-project-gallery-container]');
    project.pointer = document.querySelector('[data-projects-pointer]');
    project.thumbnail = project.root.querySelector('[data-project-thumbnail]');
    project.video = project.gallery.querySelector('video') || false;
    project.isTransitioning = false;

    project.rootClass = 'project--is-active';
    project.parentClass = 'u-no-scroll';
    project.galleryActiveClass = 'project__gallery--is-active';
    project.galleryVisibleClass = 'project__gallery--is-visible';
    project.thumbnailClass = 'project__thumbnail--is-hidden';

    project.toggles = [].slice.call(project.root.querySelectorAll('[data-project-toggle]'));
    project.toggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    project.thumbnail.addEventListener('mouseover', _togglePointerHint);
    project.thumbnail.addEventListener('mouseout', _togglePointerHint);

    if (project.video) {
      project.video.volume = 0;
      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseover', (e) => _hidePointerHint(true));
      project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseout', (e) => _hidePointerHint(false));

      project.galleryContainer.addEventListener('click', () => {
        if (project.parent.dataset.mutedVideos === 'true') {
          _setVolume(true);
          project.pointer.classList.remove('projects__pointer--mute');
          project.parent.dataset.mutedVideos = 'false';
        } else {
          _setVolume(false);
          project.pointer.classList.add('projects__pointer--mute');
          project.parent.dataset.mutedVideos = 'true';
        }
      });
    }
  };

  return {
    init: construct
  };
};

export default Project;