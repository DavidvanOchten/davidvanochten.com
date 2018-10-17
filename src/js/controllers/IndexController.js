import Project from '../lib/Project';
import IntersectionTracker from '../lib/IntersectionTracker';
import { beforeViewChange } from '../utils/beforeViewChange';

const IndexController = (() => {
  const browser = {};
  const index = {};

  const _updateProjectsCounter = (content) => {
    if (content.dataset.intersected === 'true') {
      index.projectsCounterCurrent.textContent = `0${content.dataset.projectId}`;
    }
  };

  const _setProjectsCounter = () => {
    if (browser.isFirefox) {
      index.projectsCounterTotal.textContent = `0${index.projects.length}`;
      index.projects.forEach((project, i) => project.dataset.projectId = i + 1);
    } else {
      index.projectsCounterTotal.textContent = `0${index.projects.length - 1}`;

      index.projects.forEach((project, i) => {
        project.dataset.projectId = i + 1;

        if (i === index.projects.length - 1) {
          project.dataset.projectId = 1;
        }
      });
    }

    const trackedProjects = IntersectionTracker({
      content: index.projects,
      list: index.projectsList,
      threshold: 0.5,
      callback: _updateProjectsCounter
    });

    trackedProjects.init();
  };

  const _onScroll = () => {
    browser.ticking = false;

    _checkForContentLoop();
  };

  const _requestTick = () => {
    if (!browser.ticking) {
      requestAnimationFrame(_onScroll);
    }
    browser.ticking = true;
  };

  const _checkForContentLoop = () => {
    if (browser.isFirefox) {
      return;
    }

    if (index.projectsList.scrollTop <= 0) {
      index.projectsList.scrollTop = index.projectsList.scrollHeight - window.innerHeight;
    } else if (index.projectsList.scrollTop >= index.projectsList.scrollHeight - window.innerHeight) {
      index.projectsList.scrollTop = 1;
    }
  };

  const _cloneFirstProject = () => {
    if (browser.isFirefox) {
      return;
    }

    const clonedProject = index.projects[0].cloneNode(true);
    index.projectsList.appendChild(clonedProject);
    index.projects.push(clonedProject);
  };

  const _remove = () => {
    index.projectsList.removeEventListener('scroll', _requestTick);
    index.projectsList.removeEventListener('resize', _requestTick);
  };

  const construct = () => {
    browser.ticking = false;
    browser.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

    index.projectsList = document.querySelector('[data-projects-list]');
    index.projectsList.scrollTop = 1;

    index.projects = [].slice.call(document.querySelectorAll('[data-project]'));
    _cloneFirstProject();

    index.projects.forEach(project => {
      Project({
        element: project,
        container: index.projectsList
      }).init();
    });

    index.projectsCounter = document.querySelector('[data-projects-counter]');
    index.projectsCounterCurrent = index.projectsCounter.querySelector('[data-projects-counter="current"]');
    index.projectsCounterTotal = index.projectsCounter.querySelector('[data-projects-counter="total"]');

    _setProjectsCounter();

    // Preload content

    index.projectsList.addEventListener('scroll', _requestTick);
    index.projectsList.addEventListener('resize', _requestTick);

    beforeViewChange('[data-site-content]', _remove);
  };

  return {
    init: construct
  };
})();

export default IndexController;