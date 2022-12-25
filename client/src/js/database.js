import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('editor database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('editor database created');
    },
  });

export const putDb = async (content) => {
  try{ 
    console.log('PUT to the database');
    const entryDb = await openDB('jate',1);
    const tx = entryDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({id:1, value:content});
    const result = await request;
    console.log('Entry was updated', result);

  } catch(err) {
    console.error('putDb not implemented')
  }
};

export const getDb = async () => {
  try{
    console.log('Get all from the database');
    const entryDb = await openDB('jate',1);
    const tx = entryDb.transaction('jate','readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    return result?.value
  } catch{
    console.error('getDb not implemented');

  }
}

initdb();
