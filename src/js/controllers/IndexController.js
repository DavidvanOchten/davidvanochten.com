import IntersectionTracker from '../lib/IntersectionTracker.js';
import Slider from '../lib/Slider.js';
import ScrollTracker from '../lib/ScrollTracker.js';

import { beforeViewChange } from '../utils/beforeViewChange.js';
import { loadIntersectedContent } from '../utils/loadIntersectedContent.js';

const IndexController = (() => {

  const index = {};
  const siteHeader = {};
  const browser = {
    minWidth: 600
  };

  const _toggleSiteHeader = (beforeThreshold) => {
    if ((beforeThreshold && !siteHeader.root.classList.contains('siteHeader--isHidden')) || (!beforeThreshold && siteHeader.root.classList.contains('siteHeader--isHidden'))) {
      siteHeader.root.classList.toggle('siteHeader--isHidden');
    }
  };

  const _disableFixedColumn = () => {
    if (index.fixedColumn !== null) {
      index.fixedColumn.style.top = '';
    }
  };

  const _createFixedColumn = () => {
    index.fixedColumn = index.col1.offsetHeight < index.col2.offsetHeight ? index.col1 : index.col2;

    index.fixedColumnOffset = index.fixedColumn.offsetHeight - window.innerHeight;
    index.fixedColumn.style.top = `-${index.fixedColumnOffset}px`;
  };

  const _getBottomPosition = (target) => {
    const targetHeight = target.offsetHeight;
    let top = 0;

    while (target) {
      top += (target.offsetTop + target.clientTop);
      target = target.offsetParent;
    }

    // Checks if the page was reloaded at a scroll position after the 'fixedColumn' got stuck.
    // This will change the value of the 'top' variable, which needs to be adjusted accordingly.
    const bottom = (window.pageYOffset - index.fixedColumnOffset) > 0
      ? targetHeight + top - (window.pageYOffset - (index.fixedColumnOffset))
      : targetHeight + top;

    return bottom;
  };

  const _setFixedColumn = () => {
    (window.innerWidth >= browser.minWidth)
      ? _createFixedColumn()
      : _disableFixedColumn();
  };

  const _remove = () => {
    window.removeEventListener('resize', _setFixedColumn);

    if (siteHeader.root.classList.contains('siteHeader--isHidden')) {
      siteHeader.root.classList.remove('siteHeader--isHidden');
    }
  };

  const construct = () => {
    index.fixedColumn = null;
    index.col1 = document.querySelector('[data-index-column="1"]');
    index.col2 = document.querySelector('[data-index-column="2"]');

    window.addEventListener('resize', _setFixedColumn);
    _setFixedColumn();

    siteHeader.root = document.querySelector('[data-toggle="site-header"]');
    siteHeader.trigger = document.querySelector('[data-toggle-trigger="site-header"]');

    ScrollTracker({
      end: _getBottomPosition(siteHeader.trigger),
      callback: _toggleSiteHeader
    }).init();

    IntersectionTracker({
      content: [].slice.call(document.querySelectorAll('[data-src]')),
      callback: loadIntersectedContent,
      flag: true
    }).init();

    Slider('notes').init();

    beforeViewChange(_remove);
  };

  return {
    init: construct
  };

})();

export default IndexController;