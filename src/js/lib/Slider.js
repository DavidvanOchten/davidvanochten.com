const Slider = (() => {
  let sliderWidth = 0;
  let sliderPosition = 0;
  let activeIndex = 0;

  const _getItemWidth = (item) => {
    const ITEM_STYLE = window.getComputedStyle(item);
    return parseFloat(ITEM_STYLE.width) + parseFloat(ITEM_STYLE.paddingRight);
  };
  
  const _setSliderWidth = (items, container) => {
    items.map((item) => {
      sliderWidth += _getItemWidth(item);
    });
    container.style.width = `${sliderWidth}px`;
  };

  const _moveSlider = (direction, slider, sliderContainer, sliderItems) => {
    activeIndex = sliderItems.findIndex(item => item.classList.contains('slider__item--isActive'));

    if ((direction === 'prev' && activeIndex <= 0) || 
        (direction === 'next' && activeIndex >= sliderItems.length - 1)) {
      return;
    }

    if (direction === 'prev') {
      sliderPosition += slider.querySelector('.slider__item--isActive').offsetWidth;
      sliderItems[activeIndex - 1].classList.add('slider__item--isActive');  
    } else if (direction === 'next') {
      sliderPosition -= slider.querySelector('.slider__item--isActive').offsetWidth;
      sliderItems[activeIndex + 1].classList.add('slider__item--isActive');  
    }

    sliderContainer.style.webkitTransform = `translate3d(${sliderPosition}px, 0, 0)`;
    sliderContainer.style.transform = `translate3d(${sliderPosition}px, 0, 0)`;

    sliderItems[activeIndex].classList.remove('slider__item--isActive');
  };

  // Probably want to make this more generic by passing in data via params
  const _createSliderItem = () => {
    const ITEM = document.createElement('li');
    const HEADLINE = document.createElement('h2');
    const HEADLINE_COPY = document.createTextNode('But wait... there’s more.');
    const LINK = document.createElement('a');
    const LINK_COPY = document.createTextNode('See all news');
    const LINK_HREF = LINK.setAttribute('href', '/news');
    LINK.classList.add('grid__link');
    LINK.appendChild(LINK_COPY);
    HEADLINE.classList.add('grid__heading', 'grid__heading--l');
    HEADLINE.appendChild(HEADLINE_COPY);
    ITEM.appendChild(HEADLINE);
    ITEM.appendChild(LINK);
    ITEM.classList.add('slider__item');
    ITEM.dataset.slider = 'item';
    return ITEM;
  };

  const construct = () => {
    const SLIDER = document.querySelector('[data-slider]');
    const SLIDER_CONTAINER = SLIDER.querySelector('[data-slider="container"]');
    const SLIDER_BUTTON_NEXT = SLIDER.querySelector('[data-slider="next"]');
    const SLIDER_BUTTON_PREV = SLIDER.querySelector('[data-slider="previous"]');
    const SLIDER_ITEMS = [...SLIDER.querySelectorAll('[data-slider="item"]')];

    const LAST_ITEM = _createSliderItem();
    SLIDER_CONTAINER.appendChild(LAST_ITEM);
    SLIDER_ITEMS.push(LAST_ITEM);

    _setSliderWidth(SLIDER_ITEMS, SLIDER_CONTAINER);

    SLIDER_ITEMS[0].classList.add('slider__item--isActive');

    SLIDER_BUTTON_PREV.addEventListener('click', (e) => {
      _moveSlider('prev', SLIDER, SLIDER_CONTAINER, SLIDER_ITEMS);   
    });
    SLIDER_BUTTON_NEXT.addEventListener('click', (e) => {
      _moveSlider('next', SLIDER, SLIDER_CONTAINER, SLIDER_ITEMS);
    });

  };
  
  return {
    init: construct
  };

})();

export default Slider;