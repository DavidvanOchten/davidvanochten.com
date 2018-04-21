import Scroller from '../lib/Scroller.js';
import Slider from '../lib/Slider.js';
import Tracker from '../lib/Tracker.js';
import { beforeViewChange } from '../utils/beforeViewChange.js';

const IndexController = (() => {

  const INDEX = {
    STICKY_COLUMN: null
  };

  const BROWSER = {
    MIN_SCREEN_SIZE: 600
  };

  const _disableStickyColumns = () => {
    if (INDEX.STICKY_COLUMN !== null) {
      INDEX.STICKY_COLUMN.style.top = '';
    }
  };

  const _createStickyColumn = () => {
    INDEX.STICKY_COLUMN = INDEX.COL_1.offsetHeight < INDEX.COL_2.offsetHeight ? INDEX.COL_1 : INDEX.COL_2;

    INDEX.STICKY_COLUMN_OFFSET = INDEX.STICKY_COLUMN.offsetHeight - window.innerHeight;
    INDEX.STICKY_COLUMN.style.top = `-${INDEX.STICKY_COLUMN_OFFSET}px`;
  };

  const _getBottomPosition = (target) => {
    const TARGET_HEIGHT = target.offsetHeight;
    let top = 0;

    while (target) {
      top += (target.offsetTop + target.clientTop);
      target = target.offsetParent;
    }

    // Checks if the page was reloaded at a scroll position after the 'STICKY_COLUMN' got stuck.
    // This will change the value of the 'top' variable, which needs to be adjusted accordingly.
    const BOTTOM = (window.pageYOffset - INDEX.STICKY_COLUMN_OFFSET) > 0
      ? TARGET_HEIGHT + top - (window.pageYOffset - (INDEX.STICKY_COLUMN_OFFSET))
      : TARGET_HEIGHT + top;

    return BOTTOM;
  };

  const _constructForMinSize = () => {
    window.innerWidth >= BROWSER.MIN_SCREEN_SIZE
      ? _createStickyColumn()
      : _disableStickyColumns();
  };

  const _remove = () => {
    window.removeEventListener('resize', _constructForMinSize);

    // Remove hidden class on page change
    if (document.querySelector('[data-toggle="site-header"]').classList.contains('siteHeader--isHidden')) {
      // INDEX.SITE_HEADER_TOGGLE.toggle();
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

    let siteHeaderTrigger = document.querySelector('[data-toggle-trigger="site-header"]');
    let siteHeader = document.querySelector('[data-toggle="site-header"]');

    const test = Tracker({
      end: _getBottomPosition(siteHeaderTrigger),
      callback: _toggleSiteHeader
    });

    test.init();

    // make sure to check data-toggle and data-toggle-trigger if not using them.
    // See index.hbs and header.hbs


    INDEX.COL_1 = document.querySelector('[data-index-column="1"]');
    INDEX.COL_2 = document.querySelector('[data-index-column="2"]');

    INDEX.NOTES_SLIDER = Slider('notes');
    INDEX.TOP_SCROLLER = Scroller({
      id: 'top'
    });

    INDEX.NOTES_SLIDER.init();
    INDEX.TOP_SCROLLER.init();

    window.addEventListener('resize', _constructForMinSize);
    _constructForMinSize();

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };

})();

export default IndexController;