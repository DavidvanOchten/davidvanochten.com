import IntersectionTracker from '../lib/IntersectionTracker';
import Project from '../lib/Project';
import Video from '../lib/Video';

const IndexController = (() => {
  const index = {};
  const browser = {};

  const _onToggleClick = (e) => {
    // if (project.isTransitioning) {
    //   return;
    // }

    e.preventDefault();
    // _disableUserInput(true);

    document.body.classList.toggle('u-no-scroll');
    index.compilationGallery.classList.toggle('gallery--is-active');

    (index.compilationGallery.classList.contains('gallery--is-active'))
      ? index.compilationVideo.setVideo(true)
      : index.compilationVideo.setVideo(false);



    // REUSING A LOT OF PROJECT CODE... MAKE GENERIC??
    browser.cursor.classList.toggle('cursor--light');
    browser.cursor.classList.toggle('cursor--gallery');
    browser.cursor.classList.toggle('cursor--is-visible');
  };

  const _moveCursor = (e) => {
    browser.cursor.style.transform = `translate3d(${e.clientX + 15}px, ${e.clientY - 5}px, 0)`;
    browser.cursor.style.webkitTransform = `translate3d(${e.clientX + 15}px, ${e.clientY - 5}px, 0)`;
  };

  const construct = () => {
    index.currentYear = document.querySelector('[data-year]');
    index.currentYear.textContent = new Date().getFullYear();

    index.info = document.querySelector('[data-info]');
    index.infoTrigger = document.querySelector('[data-info-trigger]');

    index.infoTrigger.addEventListener('click', () => {
      window.scroll({
        top: index.info.getBoundingClientRect().top,
        behavior: "smooth"
      });
    });

    index.projects = [].slice.call(document.querySelectorAll('[data-project]'));
    index.projects.forEach(project => {
      Project(project).init();
    });





    // Separate file?
    index.compilation = document.querySelector('[data-compilation]');
    index.compilationGallery = document.querySelector('[data-compilation-gallery]');
    index.compilationToggles = [].slice.call(index.compilation.querySelectorAll('[data-compilation-toggle]'));
    index.compilationToggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    // Clean up this selector
    index.compilationVideo = Video(index.compilationGallery.querySelector('video'));
    index.compilationVideo.init();





    IntersectionTracker({
      content: index.projects,
      threshold: 0,
      flag: true,
      callback: (content) => {
        if (content.dataset.intersected === 'true') {
          content.querySelector('[data-project-thumbnail]').classList.add('project__thumbnail--is-visible');
        }
      }
    }).init();

    browser.cursor = document.querySelector('[data-cursor]');
    document.body.addEventListener('mousemove', _moveCursor);
  };

  return {
    init: construct
  };
})();

export default IndexController;