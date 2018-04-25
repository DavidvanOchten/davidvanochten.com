const Menu = () => {

  const MENU = {
    PANEL: document.querySelector('[data-menu="panel"]'),
    TOGGLE: document.querySelector('[data-menu="toggle"]'),
    ITEMS: [].slice.call(document.querySelectorAll('[data-menu="item"]'))
  };

  const SITE_HEADER = {
    LOGO: document.querySelector('[data-site-header="logo"]'),
    BG: document.querySelector('[data-site-header="background"]')
  };

  const _toggleMenu = () => {
    SITE_HEADER.BG.classList.toggle('siteHeader__background--isActive');

    MENU.PANEL.classList.toggle('menu__panel--isVisible');
    MENU.TOGGLE.classList.toggle('menu__toggle--isActive');

    if (MENU.TOGGLE.classList.contains('menu__toggle--isActive')) {
      MENU.TOGGLE.setAttribute('aria-pressed', true);
      MENU.PANEL.setAttribute('aria-hidden', false);
    } else {
      MENU.TOGGLE.setAttribute('aria-pressed', false);
      MENU.PANEL.setAttribute('aria-hidden', true);
    }

    MENU.ITEMS.map(item => {
      item.classList.toggle('menu__item--isVisible');
      item.querySelector('[data-menu="link"]').classList.toggle('menu__link--isVisible');
    });

    document.body.classList.toggle('u-isUnscrollable');
  };

  const construct = () => {
    SITE_HEADER.BG.addEventListener('click', _toggleMenu);
    SITE_HEADER.LOGO.addEventListener('click', e => {
      e.currentTarget.blur();

      if (MENU.PANEL.classList.contains('menu__panel--isVisible')) {
        _toggleMenu();
      }
    });

    MENU.TOGGLE.addEventListener('click', _toggleMenu);
    MENU.TOGGLE.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        _toggleMenu();
      }
    });

    MENU.ITEMS.map(item => {
      item.querySelector('[data-menu="link"]').addEventListener('click', _toggleMenu);
    });
  };

  return {
    init: construct
  };
};

export default Menu;