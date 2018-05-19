import Slider from '../lib/Slider.js';
import ScrollTracker from '../lib/ScrollTracker.js';
import { beforeViewChange } from '../utils/beforeViewChange.js';

const IndexController = (() => {

  const index = {
    stickyColumn: null
  };

  const browser = {
    minScreenSize: 600
  };

  const _disableStickyColumns = () => {
    if (index.stickyColumn !== null) {
      index.stickyColumn.style.top = '';
    }
  };

  const _createStickyColumn = () => {
    index.stickyColumn = index.col1.offsetHeight < index.col2.offsetHeight ? index.col1 : index.col2;

    index.stickyColumnOffset = index.stickyColumn.offsetHeight - window.innerHeight;
    index.stickyColumn.style.top = `-${index.stickyColumnOffset}px`;
  };

  const _getBottomPosition = (target) => {
    const targetHeight = target.offsetHeight;
    let top = 0;

    while (target) {
      top += (target.offsetTop + target.clientTop);
      target = target.offsetParent;
    }

    // Checks if the page was reloaded at a scroll position after the 'stickyColumn' got stuck.
    // This will change the value of the 'top' variable, which needs to be adjusted accordingly.
    const bottom = (window.pageYOffset - index.stickyColumnOffset) > 0
      ? targetHeight + top - (window.pageYOffset - (index.stickyColumnOffset))
      : targetHeight + top;

    return bottom;
  };

  const _constructForMinSize = () => {
    window.innerWidth >= browser.minScreenSize
      ? _createStickyColumn()
      : _disableStickyColumns();
  };

  const _remove = () => {
    window.removeEventListener('resize', _constructForMinSize);

    // Remove hidden class on page change
    if (document.querySelector('[data-toggle="site-header"]').classList.contains('siteHeader--isHidden')) {
      // index.SITE_HEADER_TOGGLE.toggle();
      let siteHeader = document.querySelector('[data-toggle="site-header"]');
      siteHeader.classList.toggle('siteHeader--isHidden');
    }
  };

  const _toggleSiteHeader = (beforeThreshold) => {
    let siteHeader = document.querySelector('[data-toggle="site-header"]');

    if ((beforeThreshold && !siteHeader.classList.contains('siteHeader--isHidden')) || 
        (!beforeThreshold && siteHeader.classList.contains('siteHeader--isHidden'))) {
      siteHeader.classList.toggle('siteHeader--isHidden');
    }
  };

  const construct = () => {
    // index.SITE_HEADER = 

    let siteHeaderTrigger = document.querySelector('[data-toggle-trigger="site-header"]');
    let siteHeader = document.querySelector('[data-toggle="site-header"]');

    const test = ScrollTracker({
      end: _getBottomPosition(siteHeaderTrigger),
      callback: _toggleSiteHeader
    });

    test.init();

    // Make sure to check data-toggle and data-toggle-trigger if not using them.
    // See index.hbs and header.hbs


    index.col1 = document.querySelector('[data-index-column="1"]');
    index.col2 = document.querySelector('[data-index-column="2"]');

    index.notesSlider = Slider('notes');
    index.notesSlider.init();

    window.addEventListener('resize', _constructForMinSize);
    _constructForMinSize();

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };

})();

export default IndexController;