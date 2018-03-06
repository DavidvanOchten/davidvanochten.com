const dbPromise = idb.open('portfolio', 1, (db) => {
  if (!db.objectStoreNames.contains('work')) {
    db.createObjectStore('work', {keyPath: 'caseId'});
  }
});

const writeData = (store, data) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readwrite');
      const st = tx.objectStore(store);
      st.put(data);
      return tx.complete;
    })
};

const readAllData = (store) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readonly');
      const st = tx.objectStore(store);
      return st.getAll();
    })
};

const clearAllData = (store) => {
  return dbPromise
    .then((db) => {
      const tx = db.transaction(store, 'readwrite');
      const st = tx.objectStore(store);
      st.clear();
      return tx.complete;
    })
};