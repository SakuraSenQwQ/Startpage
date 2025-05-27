import { ref } from 'vue';

export function useIndexedDB() {
    const db = ref(null);

    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('BackgroundDB', 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('images')) {
                    db.createObjectStore('images');
                }
            };

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    };

    const saveBlob = async (blob) => {
        const database = await openDB();
        const tx = database.transaction('images', 'readwrite');
        tx.objectStore('images').put(blob, 'background');
    };

    const getBlob = async () => {
        const database = await openDB();
        return new Promise((resolve) => {
            const tx = database.transaction('images', 'readonly');
            const request = tx.objectStore('images').get('background');
            request.onsuccess = (e) => resolve(e.target.result);
        });
    };
    const deleteBlob = async () => {
        const database = await openDB();
        return new Promise((resolve) => {
            const tx = database.transaction('images', 'readwrite');
            tx.objectStore('images').delete('background');
            tx.oncomplete = () => resolve(true);
        });
    };
    return { saveBlob, getBlob, deleteBlob };
}