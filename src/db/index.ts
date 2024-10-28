import { VinylRecord } from '../types/Record';

const DB_NAME = 'vinylRecordsDB';
const STORE_NAME = 'records';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
    });
};

export const insertRecords = async (records: VinylRecord[]): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Clear existing records
    await new Promise<void>((resolve, reject) => {
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => resolve();
        clearRequest.onerror = () => reject(clearRequest.error);
    });

    // Insert new records
    for (const record of records) {
        await new Promise<void>((resolve, reject) => {
            const request = store.add(record);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};

export const searchRecords = async (artist: string = '', album: string = ''): Promise<VinylRecord[]> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const records = request.result as VinylRecord[];
            const filteredRecords = records.filter(record => {
                const matchArtist = !artist || record.ARTISTA.toLowerCase().includes(artist.toLowerCase());
                const matchAlbum = !album || record.ALBUM.toLowerCase().includes(album.toLowerCase());
                return matchArtist && matchAlbum;
            });
            resolve(filteredRecords);
        };
    });
};

export const getAllRecords = async (): Promise<VinylRecord[]> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as VinylRecord[]);
    });
};