import { ref, set, get} from 'firebase/database';
import { db } from '../config/firebase';
import { VinylRecord } from '../types/Record';

export const insertRecords = async (records: VinylRecord[]): Promise<void> => {
  try {
    const recordsRef = ref(db, 'records');
    await set(recordsRef, records);
  } catch (error) {
    console.error('Error inserting records:', error);
    throw new Error('Failed to insert records');
  }
};

export const searchRecords = async (artist: string = '', album: string = ''): Promise<VinylRecord[]> => {
  try {
    const recordsRef = ref(db, 'records');
    const snapshot = await get(recordsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const records = Object.values(snapshot.val()) as VinylRecord[];

    return records.filter(record => {
      const matchArtist = !artist || record.ARTISTA.toLowerCase().includes(artist.toLowerCase());
      const matchAlbum = !album || record.ALBUM.toLowerCase().includes(album.toLowerCase());
      return matchArtist && matchAlbum;
    });
  } catch (error) {
    console.error('Error searching records:', error);
    return [];
  }
};

export const getAllRecords = async (): Promise<VinylRecord[]> => {
  try {
    const recordsRef = ref(db, 'records');
    const snapshot = await get(recordsRef);

    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val()) as VinylRecord[];
  } catch (error) {
    console.error('Error getting all records:', error);
    return [];
  }
};