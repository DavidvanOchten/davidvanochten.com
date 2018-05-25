const Menu = () => {

  const menu = {
    panel: document.querySelector('[data-menu="panel"]'),
    toggle: document.querySelector('[data-menu="toggle"]'),
    items: [].slice.call(document.querySelectorAll('[data-menu="item"]'))
  };

  const siteHeader = {
    logo: document.querySelector('[data-site-header="logo"]'),
    background: document.querySelector('[data-site-header="background"]')
  };

  const _toggleMenu = () => {
    siteHeader.background.classList.toggle('siteHeader__background--isActive');

    menu.panel.classList.toggle('menu__panel--isVisible');
    menu.toggle.classList.toggle('menu__toggle--isActive');

    if (menu.toggle.classList.contains('menu__toggle--isActive')) {
      menu.toggle.setAttribute('aria-pressed', true);
      menu.panel.setAttribute('aria-hidden', false);
    } else {
      menu.toggle.setAttribute('aria-pressed', false);
      menu.panel.setAttribute('aria-hidden', true);
    }

    menu.items.map(item => {
      item.classList.toggle('menu__item--isVisible');
      item.querySelector('[data-menu="link"]').classList.toggle('menu__link--isVisible');
    });

    document.body.classList.toggle('u-mask');
  };

  const construct = () => {
    siteHeader.background.addEventListener('click', _toggleMenu);
    siteHeader.logo.addEventListener('click', e => {
      e.currentTarget.blur();

      if (menu.panel.classList.contains('menu__panel--isVisible')) {
        _toggleMenu();
      }
    });

    menu.toggle.addEventListener('click', _toggleMenu);
    menu.toggle.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        _toggleMenu();
      }
    });

    menu.items.map(item => {
      item.querySelector('[data-menu="link"]').addEventListener('click', _toggleMenu);
    });
  };

  return {
    init: construct
  };
};

export default Menu;