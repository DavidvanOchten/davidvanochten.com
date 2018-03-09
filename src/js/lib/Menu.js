const Menu = (() => {
  const SITE_HEADER = document.querySelector('[data-site-header]');
  const SITE_HEADER_LOGO = document.querySelector('[data-site-header="logo"]');
  const SITE_HEADER_BG = document.querySelector('[data-site-header="background"]');
  const MENU_PANEL = document.querySelector('[data-menu="panel"]');
  const MENU_TOGGLE = document.querySelector('[data-menu="toggle"]');
  const MENU_ITEMS = [...document.querySelectorAll('[data-menu="item"]')];

  const _toggleMenu = (e) => {
    SITE_HEADER.classList.toggle('siteHeader--isActive');
    MENU_PANEL.classList.toggle('menu__panel--isActive');
    MENU_ITEMS.map((item) => {
      item.classList.toggle('menu__item--isVisible');
      item.querySelector('[data-menu="link"]').classList.toggle('menu__link--isVisible')
    });

    document.body.classList.toggle('u-isUnscrollable');
  };

  const construct = () => {
    SITE_HEADER_BG.addEventListener('click', _toggleMenu);
    SITE_HEADER_LOGO.addEventListener('click', (e) => {
      e.currentTarget.blur();
      if (SITE_HEADER.classList.contains('siteHeader--isActive')) {
        _toggleMenu();
      }
    });

    MENU_TOGGLE.addEventListener('click', _toggleMenu);
    MENU_TOGGLE.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        _toggleMenu();
      }
    });

    MENU_ITEMS.map((item) => {
      item.querySelector('[data-menu="link"]').addEventListener('click', _toggleMenu);
    });
  };

  return {
    init: construct
  };
})();

export default Menu;