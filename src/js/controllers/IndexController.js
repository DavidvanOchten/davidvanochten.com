import IntersectionTracker from '../lib/IntersectionTracker';
import Project from '../lib/Project';
import Compilation from '../lib/Compilation';

const IndexController = (() => {
  const index = {};
  const browser = {};

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

    index.compilation = Compilation('data-compilation');
    index.compilation.init();

    index.projects = [].slice.call(document.querySelectorAll('[data-project]'));
    index.projects.forEach(project => {
      Project(project).init();
    });

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