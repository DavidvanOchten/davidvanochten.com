// import axios from 'axios';
// import { readAllData } from '../utils/createIDB.js';

// import LazyLoader from '../lib/LazyLoader.js';

const WorkController = (() => {
  const construct = () => {
    // LazyLoader.init();
    // console.log('[Work Controller] Cases fetched via Node.js');
    // const createArrayFromObject = (data) => {
    //   const arr = [];
    //   for (const key in data) {
    //     arr.push(data[key]);
    //   }
    //   return arr;
    // };

    // const clearContent = (container) => {
    //   while (container.firstChild) {
    //     container.removeChild(container.firstChild);
    //   }
    // };
    
    // const createWork = (container, item) => {
    //   const listItem = document.createElement('li');
    //   const title = document.createElement('h2');
    //   const img = document.createElement('img');
    //   const link = document.createElement('a');
    //   link.href = `/cases/${item.title}`;
    //   link.classList.add('lazyLoader');

    //   const headline = document.createTextNode(item.headline)
    //   title.appendChild(headline)
    //   img.dataset.src = item.thumbnailUrl;
    //   img.alt = item.headline;
    //   img.classList.add('lazyLoader__image');
    //   link.appendChild(img);
    //   listItem.appendChild(title);
    //   listItem.appendChild(link);
    //   container.appendChild(listItem);
    // };
    
    // const createContent = (data) => {
    //   const container = document.querySelector('[data-work]');
    //   clearContent(container);
      
    //   data.map(item => createWork(container, item));
    // };

    // const url = 'https://vue-admin.firebaseio.com/cases.json';
    // let networkDataReceived = false;

    // axios.get(url)
    // .then((resp) => {
    //   networkDataReceived = true;
    //   const dataArr = createArrayFromObject(resp.data);
    //   console.log('[From web / indexedDB disabled]', dataArr);
    //   createContent(dataArr.reverse());
    //   LazyLoader.init();
    // })
    // .catch((error) => {
    //   // TODO: Create error message
    //   console.log('[Work Controller]', error);
    // });

    // if ('indexedDB' in window) {
    //   readAllData('work')
    //     .then((data) => {
    //       if (!networkDataReceived) {
    //         console.log('[From cache]', data);
    //         createContent(data);
    //         LazyLoader.init();
    //       }
    //     })
    // }
  };

  return {
    init: construct
  };
})();

export default WorkController;