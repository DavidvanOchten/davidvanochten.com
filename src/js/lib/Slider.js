const Slider = (() => {
  // Slider variables
  let sliderPosition = 0;
  let sliderWidth = 0;
  let activeIndex = 0;
  const BTN_INACTIVE_CLASS = 'slider__button--isInactive';


  /**
   * 5)
   * @param {*} sliderObj 
   */
  const _resetSlider = (sliderObj) => {
    const { sliderContainer, sliderItems, prevButton, nextButton } = sliderObj;

    activeIndex = 0;
    sliderPosition = 0;

    sliderItems[0].classList.add('slider__item--isActive');
    sliderContainer.style.transform = `translate3d(0, 0, 0)`;
    prevButton.classList.add(BTN_INACTIVE_CLASS);
    nextButton.classList.remove(BTN_INACTIVE_CLASS);

    _setSliderWidth(sliderItems, sliderContainer);
  };

  /**
   * 4)
   * @param {*} direction 
   * @param {*} sliderObj 
   */
  const _moveSlider = (direction, sliderObj) => {
    const { slider, sliderContainer, sliderItems, prevButton, nextButton } = sliderObj;

    activeIndex = sliderItems.findIndex(item => item.classList.contains('slider__item--isActive'));

    if ((direction === 'prev' && activeIndex <= 0) || 
        (direction === 'next' && activeIndex >= sliderItems.length - 1)) {
      return;
    }

    if (direction === 'prev') {
      if (nextButton.classList.contains(BTN_INACTIVE_CLASS)) {
        nextButton.classList.remove(BTN_INACTIVE_CLASS);
      }

      activeIndex <= 1 // Check if next item is first item
        ? prevButton.classList.add(BTN_INACTIVE_CLASS)
        : prevButton.classList.remove(BTN_INACTIVE_CLASS);

      activeIndex >= sliderItems.length - 1 // Check if next item is second-to-last item
        ? sliderPosition += slider.querySelector('.slider__item--isActive').offsetWidth / 2
        : sliderPosition += slider.querySelector('.slider__item--isActive').offsetWidth;

      sliderItems[activeIndex - 1].classList.add('slider__item--isActive');  
    } else if (direction === 'next') {
      if (prevButton.classList.contains(BTN_INACTIVE_CLASS)) {
        prevButton.classList.remove(BTN_INACTIVE_CLASS);
      }

      if (activeIndex >= sliderItems.length - 2) { // Check if next item is last item
        nextButton.classList.add(BTN_INACTIVE_CLASS);
        sliderPosition -= slider.querySelector('.slider__item--isActive').offsetWidth / 2;
      } else {
        sliderPosition -= slider.querySelector('.slider__item--isActive').offsetWidth;
      }

      sliderItems[activeIndex + 1].classList.add('slider__item--isActive');
    }

    sliderContainer.style.webkitTransform = `translate3d(${sliderPosition}px, 0, 0)`;
    sliderContainer.style.transform = `translate3d(${sliderPosition}px, 0, 0)`;

    sliderItems[activeIndex].classList.remove('slider__item--isActive');
  };

  /**
   * 3) 
   * @param {*} item 
   */
  const _getItemWidth = (item) => {
    const ITEM_STYLE = window.getComputedStyle(item);
    return parseFloat(ITEM_STYLE.width) + parseFloat(ITEM_STYLE.paddingRight);
  };

  /**
   * 2) 
   * @param {*} items 
   * @param {*} container 
   */
  const _setSliderWidth = (items, container) => {
    if (sliderWidth !== 0) { // Reset sliderWidth
      sliderWidth = 0;
    }
    items.map((item) => {
      sliderWidth += _getItemWidth(item); // 3
    });
    container.style.width = `${sliderWidth}px`;
  };

  /**
   * 1) Constructs the Slider
   */
  const _construct = () => {
    const SLIDER = document.querySelector('[data-slider]');
    const SLIDER_CONTAINER = SLIDER.querySelector('[data-slider="container"]');
    const SLIDER_BUTTON_NEXT = SLIDER.querySelector('[data-slider="next"]');
    const SLIDER_BUTTON_PREV = SLIDER.querySelector('[data-slider="previous"]');
    const SLIDER_ITEMS = [...SLIDER.querySelectorAll('[data-slider="item"]')];

    _setSliderWidth(SLIDER_ITEMS, SLIDER_CONTAINER); // 2

    sliderPosition = 0;
    SLIDER_ITEMS[0].classList.add('slider__item--isActive');
    SLIDER_BUTTON_PREV.classList.add(BTN_INACTIVE_CLASS);

    const SLIDER_OBJ = { 
      slider: SLIDER, 
      sliderContainer: SLIDER_CONTAINER, 
      sliderItems: SLIDER_ITEMS,
      prevButton: SLIDER_BUTTON_PREV, 
      nextButton: SLIDER_BUTTON_NEXT
    };

    SLIDER_BUTTON_PREV.addEventListener('click', (e) => _moveSlider('prev', SLIDER_OBJ)); // 4
    SLIDER_BUTTON_NEXT.addEventListener('click', (e) => _moveSlider('next', SLIDER_OBJ)); // 4

    window.addEventListener('resize', (e) => _resetSlider(SLIDER_OBJ)); // 5
  };
  
  return {
    init: _construct
  };

})();

export default Slider;