const Slider = (id) => {

  const SLIDER = {
    ROOT: document.querySelector(`[data-slider="${id}"]`),
    DRAGGING_CLASS: 'slider__content--isDragging',
    activeIndex: 0,
    position: 0
  };

  const USER = {
    hasMouseDown: false,
    isDragging: false
  };

  const _moveSlider = () => {
    if (!USER.isDragging) {
      SLIDER.position = parseInt(SLIDER.CONTENT.querySelector(`[data-index="${SLIDER.activeIndex}"]`).dataset.offset);

      SLIDER.CONTENT.style.webkitTransform = `translate3d(-${SLIDER.position}px, 0, 0)`;
      SLIDER.CONTENT.style.transform = `translate3d(-${SLIDER.position}px, 0, 0)`;
    } else {
      SLIDER.CONTENT.style.webkitTransform = `translate3d(${SLIDER.position}px, 0, 0)`;
      SLIDER.CONTENT.style.transform = `translate3d(${SLIDER.position}px, 0, 0)`;
    }
  };

  const _setSlider = () => {
    SLIDER.CONTENT.classList.remove(SLIDER.DRAGGING_CLASS);

    let draggedX = Math.abs(SLIDER.position);

    if (SLIDER.position > 0) {
      SLIDER.activeIndex = parseInt(SLIDER.ITEMS[0].dataset.index);
    } else if (draggedX > parseInt(SLIDER.ITEMS[SLIDER.ITEMS.length - 1].dataset.activeArea.split('|')[1])) {
      SLIDER.activeIndex = parseInt(SLIDER.ITEMS[SLIDER.ITEMS.length - 1].dataset.index);
    } else {
      const ACTIVE_ITEM = SLIDER.ITEMS.filter(item => {
        let activeAreaStart = parseInt(item.dataset.activeArea.split('|')[0]);
        let activeAreaEnd = parseInt(item.dataset.activeArea.split('|')[1]);
  
        if (draggedX > activeAreaStart && draggedX < activeAreaEnd) {
          return item;
        }
      });

      SLIDER.activeIndex = parseInt(ACTIVE_ITEM[0].dataset.index);
    }

    _moveSlider();
  };

  const _onArrowClick = (direction) => {
    if (direction === 'prev' && SLIDER.activeIndex > 0) {
      SLIDER.activeIndex = SLIDER.activeIndex - 1;
    } else if (direction === 'next' && SLIDER.activeIndex < SLIDER.ITEMS.length - 1) {
      SLIDER.activeIndex = SLIDER.activeIndex + 1;
    }

    _moveSlider();
  };

  const _onKeyUp = (e) => {
    if (e.keyCode === 37 && SLIDER.activeIndex > 0) {
      SLIDER.activeIndex = SLIDER.activeIndex - 1;
    } else if (e.keyCode === 39 && SLIDER.activeIndex < SLIDER.ITEMS.length - 1) {
      SLIDER.activeIndex = SLIDER.activeIndex + 1;
    }

    _moveSlider();
  };

  const _onMouseUp = () => {
    USER.hasMouseDown = false;

    if (USER.isDragging) {
      USER.isDragging = false;
      _setSlider();
    }
  };

  const _onMouseMove = (e) => {
    if (USER.hasMouseDown) {
      USER.isDragging = true;

      if (!SLIDER.CONTENT.classList.contains(SLIDER.DRAGGING_CLASS)) {
        SLIDER.CONTENT.classList.add(SLIDER.DRAGGING_CLASS);
      }

      if (e.target.dataset.slider !== 'item') {
        _onMouseUp();
        return;
      }

      SLIDER.position = e.clientX - SLIDER.startX;
      _moveSlider();
    }
  };

  const _onMouseDown = (e) => {
    USER.hasMouseDown = true;
    SLIDER.startX = e.clientX + SLIDER.position;
  };

  const _onTouchEnd = (e) => {
    if (USER.isDragging) {
      USER.isDragging = false;
      _setSlider();
    }
  };

  const _onTouchMove = (e) => {
    USER.isDragging = true;

    if (!SLIDER.CONTENT.classList.contains(SLIDER.DRAGGING_CLASS)) {
      SLIDER.CONTENT.classList.add(SLIDER.DRAGGING_CLASS);
    }

    const OFFSET_X = e.touches[0].clientX - SLIDER.startX;
    const OFFSET_Y = e.touches[0].clientY - SLIDER.startY;

    // Prevent vertical scroll if the user is swiping left or right
    if (Math.abs(OFFSET_X) > Math.abs(OFFSET_Y) && e.cancelable) {
      e.preventDefault();
    }

    SLIDER.position = e.touches[0].clientX - SLIDER.adjustedStartX;
    _moveSlider();
  };

  const _onTouchStart = (e) => {
    SLIDER.startX = e.touches[0].clientX;
    SLIDER.startY = e.touches[0].clientY;
    SLIDER.adjustedStartX = e.touches[0].clientX + SLIDER.position;
  };

  const _setUpSliderItems = () => {
    const FIRST_ITEM_WIDTH = SLIDER.ITEMS[0].offsetWidth;
    const FIRST_ITEM_THRESHOLD = FIRST_ITEM_WIDTH - (SLIDER.ROOT.offsetWidth / 2);
    let offset = 0;
    let previousThreshold = 0;
    let currentThreshold = 0;

    SLIDER.ITEMS.map((item, i) => {
      item.dataset.index = i;
      item.dataset.offset = offset;

      offset = item.offsetWidth + offset;

      currentThreshold = FIRST_ITEM_THRESHOLD + offset - FIRST_ITEM_WIDTH;
      item.dataset.activeArea = `${previousThreshold}|${currentThreshold}`;

      previousThreshold = currentThreshold;
      
      item.addEventListener('click', e => {
        SLIDER.activeIndex = parseInt(e.target.dataset.index);
        _moveSlider();
      });
    });
  };

  const construct = () => {
    // SLIDER.ROOT = document.querySelector(`[data-slider="${id}"]`);
    SLIDER.CONTENT = SLIDER.ROOT.querySelector('[data-slider="content"]');
    SLIDER.ITEMS = [].slice.call(SLIDER.ROOT.querySelectorAll('[data-slider="item"]'));
    
    _setUpSliderItems();

    SLIDER.CONTENT.addEventListener('touchstart', _onTouchStart);
    SLIDER.CONTENT.addEventListener('touchmove', _onTouchMove);
    SLIDER.CONTENT.addEventListener('touchend', _onTouchEnd);

    SLIDER.CONTENT.addEventListener('mousedown', _onMouseDown);
    SLIDER.CONTENT.addEventListener('mouseup', _onMouseUp);
    window.addEventListener('mousemove', _onMouseMove);

    window.addEventListener('keyup', _onKeyUp);

    window.addEventListener('resize', e => {
      _setUpSliderItems();
      _moveSlider();
    });
  };

  return {
    init: construct
  }
};

export default Slider;