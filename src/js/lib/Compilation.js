import Video from '../lib/Video';
import { disableUserInput } from '../utils/disableUserInput';
import { hideCursor } from '../utils/hideCursor';

const Compilation = (element) => {
  const compilation = {};
  const browser = {};

  const _activateGallery = (e) => {
    if (e.target === compilation.gallery) {
      compilation.gallery.removeEventListener('transitionend', _activateGallery);
      disableUserInput(false);
    }
  }

  const _onToggleClick = (e) => {
    if (document.body.classList.contains('u-is-loading')) {
      return;
    }

    e.preventDefault();
    disableUserInput(true);

    document.body.classList.toggle('u-no-scroll');

    compilation.gallery.addEventListener('transitionend', _activateGallery);
    compilation.gallery.classList.toggle('gallery--is-active');

    (compilation.gallery.classList.contains('gallery--is-active'))
      ? compilation.video.setVideo(true)
      : compilation.video.setVideo(false);

    browser.cursor.classList.toggle('cursor--light');
    browser.cursor.classList.toggle('cursor--gallery');
    browser.cursor.classList.toggle('cursor--is-visible');
  };

  const construct = () => {
    browser.cursor = document.querySelector('[data-cursor]');

    compilation.root = document.querySelector(`[${element}]`);
    compilation.gallery = compilation.root.querySelector('[data-compilation-gallery]');
    compilation.toggles = [].slice.call(compilation.root.querySelectorAll('[data-compilation-toggle]'));
    compilation.toggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    compilation.gallery.querySelector('[data-compilation-toggle]').addEventListener('mouseover', (e) => hideCursor(true));
    compilation.gallery.querySelector('[data-compilation-toggle]').addEventListener('mouseout', (e) => hideCursor(false));

    compilation.video = Video(compilation.gallery.querySelector('video'));
    compilation.video.init();
  };

  return {
    init: construct
  };
};

export default Compilation;