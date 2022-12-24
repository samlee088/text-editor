import { openDB } from 'idb';

const initdb = async () =>
  openDB('editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('editor')) {
        console.log('editor database already exists');
        return;
      }
      db.createObjectStore('editor', { keyPath: 'id', autoIncrement: true });
      console.log('editor database created');
    },
  });



export const postDb = async (content) => {
  try {
    console.log('Post to the database');
    const entryDb = await openDB('editor',1);
    const tx = entryDb.transaction('editor', 'readwrite');
    const store = tx.objectStore('editor');
    const request = store.add({entry:content});
    const result = await request;
    console.log('data saved', result);
  } catch {
    console.log('Error with posting data entry')
  }
}
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{ 
    console.log('PUT to the database');
    const entryDb = await openDB('editor',1);
    const tx = entryDb.transaction('editor', 'readwrite');
    const store = tx.objectStore('editor');
    const request = store.put({id:id, entry:content});
    const result = await request;
    console.log('Entry was updated', result);



  } catch(err) {
    console.error('putDb not implemented')
  }
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
    console.log('Get all from the database');
    const entryDb = await openDB('editor',1);
    const tx = entryDb.transaction('editor','readonly');
    const store = tx.objectStore('editor');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
  } catch{
    console.error('getDb not implemented');

  }
}


initdb();
