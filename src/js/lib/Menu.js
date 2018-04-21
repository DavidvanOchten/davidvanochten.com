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

  const _toggleMenu = (e) => {
    if (e.type === 'click' || e.type === 'keyup' && e.keyCode === 13) {
      SITE_HEADER.BG.classList.toggle('siteHeader__background--isActive');

      MENU.TOGGLE.classList.toggle('menu__toggle--isActive');
      MENU.PANEL.classList.toggle('menu__panel--isVisible');
      MENU.ITEMS.map(item => {
        item.classList.toggle('menu__item--isVisible');
        item.querySelector('[data-menu="link"]').classList.toggle('menu__link--isVisible');
      });

      document.body.classList.toggle('u-isUnscrollable');
    }
  };

  const construct = () => {

    SITE_HEADER.LOGO.addEventListener('click', e => {
      e.currentTarget.blur();


      // Change code below to something like if (...) { SITE_HEADER.LOGO.toggle(); }
      // Use toggle method directly if condition is met.

      // if (SITE_HEADER.classList.contains('siteHeader--isActive')) {
      //   _toggleMenu();
      // }
    });
    
    // Add Toggles here
    SITE_HEADER.BG.addEventListener('click', _toggleMenu);
    MENU.TOGGLE.addEventListener('click', _toggleMenu);
    MENU.TOGGLE.addEventListener('keyup', _toggleMenu);

    MENU.ITEMS.map(item => {
      item.querySelector('[data-menu="link"]').addEventListener('click', _toggleMenu);
    });
  };

  return {
    init: construct
  };
};

export default Menu;