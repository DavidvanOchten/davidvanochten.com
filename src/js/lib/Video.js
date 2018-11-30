const Video = (element) => {
  const video = {};
  const browser = {};

  const _onWheel = (e) => {
    window.clearTimeout(browser.isWheeling);

    browser.isWheeling = setTimeout(() => {
      video.element.playbackRate = 1;
      video.element.removeAttribute('style');

      if (document.body.dataset.mutedVideos === 'false') {
        video.element.volume = 1;
      }
    }, 100);

    if (e.deltaY > 1) {
      video.element.volume = 0;
      video.element.style.filter = 'grayscale(1)';
      video.element.style.opacity = '.5';

      (e.deltaY > 50)
        ? video.element.playbackRate = 5
        : video.element.playbackRate = 1 + e.deltaY / 10;
    }
  };

  const setVideo = (bool) => {
    if (bool === true) {
      video.element.play();

      if (document.body.dataset.mutedVideos === 'false') {
        muteVideo(false);
      }

      if (browser.isChrome) {
        window.addEventListener('wheel', _onWheel, { passive: true });
      }
    } else {
      if (document.body.dataset.mutedVideos === 'false') {
        muteVideo(true, () => {
          video.element.pause();
        });
      } else {
        video.element.pause();
      }

      if (browser.isChrome) {
        window.removeEventListener('wheel', _onWheel);
      }
    }
  };

  const muteVideo = (bool, cb) => {
    video.isTransitioning = true;

    let volume = (bool === false) ? 0 : 1;
    const volumeCondition = (bool === false) ? 'volume >= 1' : 'volume <= 0';
    const volumeDirection = (bool === false) ? 'volume + 0.05' : 'volume - 0.05';

    const controlVolume = setInterval(() => {
      volume = parseFloat((eval(volumeDirection)).toFixed(2));
      video.element.volume = volume;

      if (eval(volumeCondition)) {
        clearInterval(controlVolume);
        video.isTransitioning = false;

        if (cb) {
          cb();
        }
      }
    }, 50);
  };

  const construct = () => {
    video.element = element;
    video.element.volume = 0;

    browser.cursor = document.querySelector('[data-cursor]');
    browser.isChrome = !!window.chrome && !!window.chrome.webstore;
    browser.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    browser.isMobile = window.matchMedia('(pointer: coarse)');

    if (browser.isMobile.matches) {
      video.element.muted = true;
      return;
    }

    if (browser.isSafari ) {
      // video.element.muted = true;
      muteVideo(true);
      browser.cursor.classList.add('cursor--mute');
      document.body.dataset.mutedVideos = 'true';
    }

    video.element.parentNode.addEventListener('click', () => {
      if (video.isTransitioning) {
        return;
      }

      if (document.body.dataset.mutedVideos === 'true') {
        muteVideo(false);
        browser.cursor.classList.remove('cursor--mute');
        document.body.dataset.mutedVideos = 'false';
      } else {
        muteVideo(true);
        browser.cursor.classList.add('cursor--mute');
        document.body.dataset.mutedVideos = 'true';
      }
    });
  };

  return {
    init: construct,
    muteVideo: muteVideo,
    setVideo: setVideo
  };
};

export default Video;