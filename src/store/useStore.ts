import { create } from 'zustand';
import { VinylRecord, User } from '../types/Record';
import { searchRecords, getAllRecords } from '../db';

interface Store {
  records: VinylRecord[];
  user: User | null;
  setRecords: (records: VinylRecord[]) => void;
  setUser: (user: User | null) => void;
  searchRecordsFromDb: (artist?: string, album?: string) => Promise<void>;
  loadAllRecords: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  records: [],
  user: null,
  setRecords: (records) => set({ records }),
  setUser: (user) => set({ user }),
  searchRecordsFromDb: async (artist = '', album = '') => {
    const records = await searchRecords(artist, album);
    set({ records });
  },
  loadAllRecords: async () => {
    const records = await getAllRecords();
    set({ records });
  },
}));