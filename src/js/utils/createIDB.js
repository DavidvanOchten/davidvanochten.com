// TODO: create one file for both sw.js and the rest of the app?
import idb from 'idb';

export const dbPromise = idb.open('portfolio', 1, (db) => {
  if (!db.objectStoreNames.contains('work')) {
    db.createObjectStore('work', {keyPath: 'caseId'});
  }
});

export const writeData = (store, data) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readwrite');
      const st = tx.objectStore(store);
      st.put(data);
      return tx.complete;
    })
};

export const readAllData = (store) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readonly');
      const st = tx.objectStore(store);
      return st.getAll();
    })
};

export const clearAllData = (store) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readwrite');
      const st = tx.objectStore(store);
      st.clear();
      return tx.complete;
    })
};