export const showNotification = (type) => {
  if (document.querySelector(`[data-notification="${type}"]`) === null) {
    let msg = '';
    const closeBtn = document.createElement('button');
    const closeBtnText = document.createTextNode('Close');
    closeBtn.appendChild(closeBtnText);

    const div = document.createElement('div');
    div.classList.add('notification');
    div.dataset.notification = type;
    
    if (type === 'error') {
      div.classList.add('notification--error');
      msg = document.createTextNode('Can\'t fetch this page right now. Do you have an internet connection? Please try again later.');
    }

    div.appendChild(msg);
    div.appendChild(closeBtn);
    document.body.appendChild(div);
  }

  const notification = document.querySelector(`[data-notification="${type}"]`);

  if (window.getComputedStyle(notification).width) {
    notification.classList.add('notification--visible');
  }
  
  notification.querySelector('button').addEventListener('click', e => {
    notification.classList.remove('notification--visible');
  });
};