export const showNotification = (type) => {
  if (document.querySelector(`[data-notification="${type}"]`) === null) {
    let msg = '';
    const CLOSE_BTN = document.createElement('button');
    const CLOSE_BTN_TEXT = document.createTextNode('Close');
    CLOSE_BTN.appendChild(CLOSE_BTN_TEXT);

    const DIV = document.createElement('div');
    DIV.classList.add('notification');
    DIV.dataset.notification = type;
    
    if (type === 'error') {
      DIV.classList.add('notification--error');
      msg = document.createTextNode('Can\'t fetch this page right now. Do you have an internet connection? Please try again later.');
    }

    DIV.appendChild(msg);
    DIV.appendChild(CLOSE_BTN);
    document.body.appendChild(DIV);
  }

  const NOTIFICATION = document.querySelector(`[data-notification="${type}"]`);

  if (window.getComputedStyle(NOTIFICATION).width) {
    NOTIFICATION.classList.add('notification--visible');
  }
  
  NOTIFICATION.querySelector('button').addEventListener('click', e => {
    NOTIFICATION.classList.remove('notification--visible');
  });
};