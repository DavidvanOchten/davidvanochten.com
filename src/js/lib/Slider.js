import { beforeViewChange } from '../utils/beforeViewChange.js';

const Slider = (id) => {

  const SLIDER = {
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
  
        if (draggedX >= activeAreaStart && draggedX < activeAreaEnd) {
          return item;
        }
      });

      SLIDER.activeIndex = parseInt(ACTIVE_ITEM[0].dataset.index);
    }

    _moveSlider();
  };

  const _onMouseUp = (e) => {
    USER.hasMouseDown = false;

    if (USER.isDragging) {
      USER.isDragging = false;
      _setSlider();
    } else if (e.target.dataset.index !== undefined) {
      // Checks if the clicked element is a slider item (with an index)
      SLIDER.activeIndex = parseInt(e.target.dataset.index);
      _moveSlider();
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

    // Prevents vertical scroll if the user is swiping left/right
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

  const _onKeyUp = (e) => {
    if (e.keyCode === 37 && SLIDER.activeIndex > 0) {
      SLIDER.activeIndex = SLIDER.activeIndex - 1;
    } else if (e.keyCode === 39 && SLIDER.activeIndex < SLIDER.ITEMS.length - 1) {
      SLIDER.activeIndex = SLIDER.activeIndex + 1;
    }

    _moveSlider();
  };

  const _setUpSliderItems = () => {
    const FIRST_ITEM_WIDTH = SLIDER.ITEMS[0].offsetWidth;
    const SLIDER_OFFSET = parseInt(window.getComputedStyle(SLIDER.CONTENT).marginLeft);
    const FIRST_ITEM_THRESHOLD = FIRST_ITEM_WIDTH + SLIDER_OFFSET - (SLIDER.ROOT.offsetWidth / 2);

    let offset = 0;
    let previousThreshold = 0;
    let currentThreshold = 0;

    SLIDER.ITEMS.map((item, i) => {
      item.dataset.index = i;
      item.dataset.offset = offset;

      offset = item.offsetWidth + offset;
      // Make dynamic for variable widths?
      // Don't use first item here anymore?
      currentThreshold = FIRST_ITEM_THRESHOLD + offset - FIRST_ITEM_WIDTH;
      item.dataset.activeArea = `${previousThreshold}|${currentThreshold}`;

      previousThreshold = currentThreshold;
    });
  };

  const _remove = () => {
    window.removeEventListener('mousemove', _onMouseMove);
    window.removeEventListener('resize', _setUpSliderItems);
    window.removeEventListener('resize', _moveSlider);
    window.removeEventListener('keyup', _onKeyUp);
  }

  const construct = () => {
    SLIDER.ROOT = document.querySelector(`[data-slider="${id}"]`);
    SLIDER.CONTENT = SLIDER.ROOT.querySelector('[data-slider="content"]');
    SLIDER.ITEMS = [].slice.call(SLIDER.ROOT.querySelectorAll('[data-slider="item"]'));
    // SLIDER.BUTTON_PREV = document.querySelector(`[data-slider-prev="${id}"]`);
    // SLIDER.BUTTON_NEXT = document.querySelector(`[data-slider-next="${id}"]`);

    // _setUpSliderNavigation();
    _setUpSliderItems();

    SLIDER.CONTENT.addEventListener('touchstart', _onTouchStart);
    SLIDER.CONTENT.addEventListener('touchmove', _onTouchMove);
    SLIDER.CONTENT.addEventListener('touchend', _onTouchEnd);

    SLIDER.CONTENT.addEventListener('mousedown', _onMouseDown);
    SLIDER.CONTENT.addEventListener('mouseup', _onMouseUp);
    window.addEventListener('mousemove', _onMouseMove);

    window.addEventListener('keyup', _onKeyUp);

    window.addEventListener('resize', _setUpSliderItems);
    window.addEventListener('resize', _moveSlider);

    beforeViewChange(_remove);
  };

  return {
    init: construct
  }
};

export default Slider;