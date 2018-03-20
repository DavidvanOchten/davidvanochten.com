export const showNotification = (type) => {
//   <div class="popup popup--error" role="alert" data-popup="error">
//   <strong>Error</strong>
//   <p>Can't fetch this page right now. Do you have an internet connection? Please try again later.</p>
//   <button data-popup="close">Close</button>
// </div>

  const CLOSE_BTN = document.createElement('button');
  const CLOSE_BTN_TEXT = document.createTextNode('Close');
  CLOSE_BTN.appendChild(CLOSE_BTN_TEXT);

  const DIV = document.createElement('div');
  DIV.classList.add('popup');
  DIV.dataset.popup = 'container';
  
  if (type === 'error') {
    DIV.classList.add('popup--error');
  }

  const MSG = document.createTextNode('Can\'t fetch this page right now. Do you have an internet connection? Please try again later.');

  DIV.appendChild(MSG);
  DIV.appendChild(CLOSE_BTN);
  document.body.appendChild(DIV);
  
  const NOTIFICATION = document.querySelector('[data-popup="container"]');

  if (window.getComputedStyle(NOTIFICATION).width) {
    NOTIFICATION.classList.add('popup--visible');
  }
  
  NOTIFICATION.querySelector('button').addEventListener('click', e => {
    NOTIFICATION.classList.remove('popup--visible');
  });
};