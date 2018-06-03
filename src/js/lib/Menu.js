const Menu = () => {

  const menu = {};
  const siteHeader = {};

  const _toggleMenu = () => {
    siteHeader.background.classList.toggle('siteHeader__background--isActive');
    
    menu.items.forEach(item => item.classList.toggle('menu__item--isVisible'));
    menu.panel.classList.toggle('menu__panel--isVisible');
    menu.toggle.classList.toggle('menu__toggle--isActive');

    if (menu.toggle.classList.contains('menu__toggle--isActive')) {
      menu.toggle.setAttribute('aria-pressed', true);
      menu.panel.setAttribute('aria-hidden', false);
    } else {
      menu.toggle.setAttribute('aria-pressed', false);
      menu.panel.setAttribute('aria-hidden', true);
    }

    document.body.classList.toggle('u-mask');
  };

  const construct = () => {
    siteHeader.background = document.querySelector('[data-site-header="background"]');
    siteHeader.background.addEventListener('click', _toggleMenu);

    siteHeader.logo = document.querySelector('[data-site-header="logo"]');
    siteHeader.logo.addEventListener('click', e => {
      e.currentTarget.blur();

      if (menu.panel.classList.contains('menu__panel--isVisible')) {
        _toggleMenu();
      }
    });

    menu.panel = document.querySelector('[data-menu="panel"]');
    menu.toggle = document.querySelector('[data-menu="toggle"]');
    menu.items = [].slice.call(document.querySelectorAll('[data-menu="item"]'));
    menu.links = [].slice.call(document.querySelectorAll('[data-menu="link"]'));

    menu.links.forEach(item => item.addEventListener('click', _toggleMenu));

    menu.toggle.addEventListener('click', _toggleMenu);
    menu.toggle.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        _toggleMenu();
      }
    });
  };

  return {
    init: construct
  };
};

export default Menu;