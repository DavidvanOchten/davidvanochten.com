import IntersectionTracker from '../lib/IntersectionTracker';
import Project from '../lib/Project';
import Video from '../lib/Video';

const IndexController = (() => {
  const index = {};

  const _onToggleClick = (e) => {
    // if (project.isTransitioning) {
    //   return;
    // }

    e.preventDefault();
    // _disableUserInput(true);

    console.log('Do something with the reel');
    index.compilationContent.classList.toggle('compilation__content--is-visible');
    document.body.classList.toggle('u-no-scroll');
    index.compilationVideo.setVideo(true);



    // REUSING A LOT OF PROJECT CODE... MAKE GENERIC??



    // project.thumbnail.addEventListener('mouseover', _togglePointerHint);
    // project.thumbnail.addEventListener('mouseout', _togglePointerHint);

    // if (project.videoElement) {
    //   project.video = Video(project.videoElement);
    //   project.video.init();

    //   project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseover', (e) => _hidePointerHint(true));
    //   project.gallery.querySelector('[data-project-toggle]').addEventListener('mouseout', (e) => _hidePointerHint(false));

    //   project.galleryContainer.addEventListener('click', () => {
    //     if (document.body.dataset.mutedVideos === 'true') {
    //       project.video.muteVideo(false);
    //       project.pointer.classList.remove('projects__pointer--mute');
    //       document.body.dataset.mutedVideos = 'false';
    //     } else {
    //       project.video.muteVideo(true);
    //       project.pointer.classList.add('projects__pointer--mute');
    //       document.body.dataset.mutedVideos = 'true';
    //     }
    //   });
    // }
  };

  const _moveProjectsCursor = (e) => {
    index.projectsCursor.style.transform = `translate3d(${e.clientX + 15}px, ${e.clientY - 5}px, 0)`;
    index.projectsCursor.style.webkitTransform = `translate3d(${e.clientX + 15}px, ${e.clientY - 5}px, 0)`;
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
    index.compilationContent = document.querySelector('[data-compilation-content]');
    index.compilationToggles = [].slice.call(index.compilation.querySelectorAll('[data-compilation-toggle]'));
    index.compilationToggles.forEach(toggle => toggle.addEventListener('click', _onToggleClick));

    index.compilationVideo = Video(index.compilationContent.querySelector('video'));
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

    index.projectsCursor = document.querySelector('[data-projects-pointer]');
    document.body.addEventListener('mousemove', _moveProjectsCursor);
  };

  return {
    init: construct
  };
})();

export default IndexController;