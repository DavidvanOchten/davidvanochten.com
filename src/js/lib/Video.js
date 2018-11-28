const Video = (element) => {
  const video = {};
  const user = {};

  const _onWheel = (e) => {
    window.clearTimeout(user.isWheeling);

    user.isWheeling = setTimeout(() => {
      video.element.playbackRate = 1;
      video.element.style.filter = '';

      if (document.body.dataset.mutedVideos === 'false') {
        video.element.volume = 1;
      }
    }, 100);

    if (e.deltaY > 1) {
      video.element.volume = 0;
      video.element.style.filter = 'grayscale(1)';

      (e.deltaY > 50)
        ? video.element.playbackRate = 5
        : video.element.playbackRate = 1 + e.deltaY / 10;
    }
  };

  const setVideo = (bool) => {
    if (bool === true) {
      video.element.play();

      window.addEventListener('wheel', _onWheel, { passive: true });

      if (document.body.dataset.mutedVideos === 'false') {
        muteVideo(false);
      }
    } else {
      window.removeEventListener('wheel', _onWheel);

      if (document.body.dataset.mutedVideos === 'false') {
        muteVideo(true, () => {
          video.element.pause();
        });
      } else {
        video.element.pause();
      }
    }
  };

  const muteVideo = (bool, cb) => {
    let volume = (bool === false) ? 0 : 1;
    const volumeCondition = (bool === false) ? 'volume >= 1' : 'volume <= 0';
    const volumeDirection = (bool === false) ? 'volume + 0.05' : 'volume - 0.05';

    const controlVolume = setInterval(() => {
      volume = parseFloat((eval(volumeDirection)).toFixed(2));
      video.element.volume = volume;

      if (eval(volumeCondition)) {
        clearInterval(controlVolume);

        if (cb) {
          cb();
        }
      }
    }, 50);
  };

  const construct = () => {
    video.element = element;
    video.element.volume = 0;
  };

  return {
    init: construct,
    muteVideo: muteVideo,
    setVideo: setVideo
  };
};

export default Video;