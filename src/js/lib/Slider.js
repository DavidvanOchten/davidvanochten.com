import { beforeViewChange } from '../utils/beforeViewChange.js';

const Slider = (id) => {

  const slider = {
    draggingClass: 'slider__content--isDragging',
    activeIndex: 0,
    position: 0
  };

  const user = {
    hasMouseDown: false,
    isDragging: false
  };

  const _moveSlider = () => {
    if (!user.isDragging) {
      slider.position = parseInt(slider.content.querySelector(`[data-index="${slider.activeIndex}"]`).dataset.offset);

      slider.content.style.webkitTransform = `translate3d(-${slider.position}px, 0, 0)`;
      slider.content.style.transform = `translate3d(-${slider.position}px, 0, 0)`;
    } else {
      slider.content.style.webkitTransform = `translate3d(${slider.position}px, 0, 0)`;
      slider.content.style.transform = `translate3d(${slider.position}px, 0, 0)`;
    }
  };

  const _setSlider = () => {
    slider.content.classList.remove(slider.draggingClass);

    let draggedX = Math.abs(slider.position);

    if (slider.position > 0) {
      slider.activeIndex = parseInt(slider.items[0].dataset.index);
    } else if (draggedX > parseInt(slider.items[slider.items.length - 1].dataset.activeArea.split('|')[1])) {
      slider.activeIndex = parseInt(slider.items[slider.items.length - 1].dataset.index);
    } else {
      const activeItem = slider.items.filter(item => {
        let activeAreaStart = parseInt(item.dataset.activeArea.split('|')[0]);
        let activeAreaEnd = parseInt(item.dataset.activeArea.split('|')[1]);
  
        if (draggedX >= activeAreaStart && draggedX < activeAreaEnd) {
          return item;
        }
      });

      slider.activeIndex = parseInt(activeItem[0].dataset.index);
    }

    _moveSlider();
  };

  const _onMouseUp = (e) => {
    user.hasMouseDown = false;

    if (user.isDragging) {
      user.isDragging = false;
      _setSlider();
    } else if (e.target.dataset.index !== undefined) {
      // Checks if the clicked element is a slider item (with an index)
      slider.activeIndex = parseInt(e.target.dataset.index);
      _moveSlider();
    }
  };

  const _onMouseMove = (e) => {
    if (user.hasMouseDown) {
      user.isDragging = true;

      if (!slider.content.classList.contains(slider.draggingClass)) {
        slider.content.classList.add(slider.draggingClass);
      }

      if (e.target.dataset.slider !== 'item') {
        _onMouseUp();
        return;
      }

      slider.position = e.clientX - slider.startX;
      _moveSlider();
    }
  };

  const _onMouseDown = (e) => {
    user.hasMouseDown = true;
    slider.startX = e.clientX + slider.position;
  };

  const _onTouchEnd = (e) => {
    if (user.isDragging) {
      user.isDragging = false;
      _setSlider();
    }
  };

  const _onTouchMove = (e) => {
    user.isDragging = true;

    if (!slider.content.classList.contains(slider.draggingClass)) {
      slider.content.classList.add(slider.draggingClass);
    }

    const offsetX = e.touches[0].clientX - slider.startX;
    const offsetY = e.touches[0].clientY - slider.startY;

    // Prevents vertical scroll if the user is swiping left/right
    if (Math.abs(offsetX) > Math.abs(offsetY) && e.cancelable) {
      e.preventDefault();

      slider.position = e.touches[0].clientX - slider.adjustedStartX;
      _moveSlider();
    } else {
      slider.position = e.touches[0].clientX - slider.adjustedStartX;
    }
  };

  const _onTouchStart = (e) => {
    slider.startX = e.touches[0].clientX;
    slider.startY = e.touches[0].clientY;
    slider.adjustedStartX = e.touches[0].clientX + slider.position;
  };

  const _onKeyUp = (e) => {
    if (e.keyCode === 37 && slider.activeIndex > 0) {
      slider.activeIndex = slider.activeIndex - 1;
    } else if (e.keyCode === 39 && slider.activeIndex < slider.items.length - 1) {
      slider.activeIndex = slider.activeIndex + 1;
    }

    _moveSlider();
  };

  const _setUpSliderItems = () => {
    const firstItemWidth = slider.items[0].offsetWidth;
    const sliderOffset = parseInt(window.getComputedStyle(slider.content).marginLeft);
    const firstItemOffset = firstItemWidth + sliderOffset - (slider.root.offsetWidth / 2);

    let offset = 0;
    let previousThreshold = 0;
    let currentThreshold = 0;

    slider.items.forEach((item, i) => {
      item.dataset.index = i;
      item.dataset.offset = offset;

      offset = item.offsetWidth + offset;
      // Make dynamic for variable widths?
      // Don't use first item here anymore?
      currentThreshold = firstItemOffset + offset - firstItemWidth;
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
    slider.root = document.querySelector(`[data-slider="${id}"]`);
    slider.content = slider.root.querySelector('[data-slider="content"]');
    slider.items = [].slice.call(slider.root.querySelectorAll('[data-slider="item"]'));

    _setUpSliderItems();

    slider.content.addEventListener('touchstart', _onTouchStart);
    slider.content.addEventListener('touchmove', _onTouchMove);
    slider.content.addEventListener('touchend', _onTouchEnd);

    slider.content.addEventListener('mousedown', _onMouseDown);
    slider.content.addEventListener('mouseup', _onMouseUp);
    window.addEventListener('mousemove', _onMouseMove);

    window.addEventListener('keyup', _onKeyUp);

    window.addEventListener('resize', _setUpSliderItems);
    window.addEventListener('resize', _moveSlider);

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };
};

export default Slider;