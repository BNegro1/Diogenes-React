import { create } from 'zustand';
import { VinylRecord, User } from '../types/Record';
import { searchRecords, getAllRecords } from '../db';

interface Store {
  records: VinylRecord[];
  allRecords: VinylRecord[];
  isLoading: boolean;
  searchTerms: { artist: string; album: string } | null;
  user: User | null;
  setRecords: (records: VinylRecord[]) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  searchRecordsFromDb: (artist?: string, album?: string) => Promise<void>;
  loadAllRecords: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  records: [],
  allRecords: [],
  isLoading: false,
  searchTerms: null,
  user: null,
  setRecords: (records) => set({ records }),
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  searchRecordsFromDb: async (artist = '', album = '') => {
    set({ isLoading: true, searchTerms: { artist, album } });
    const records = await searchRecords(artist, album);
    set({ records, isLoading: false });
  },
  loadAllRecords: async () => {
    set({ isLoading: true });
    const records = await getAllRecords();
    set({ allRecords: records, isLoading: false });
  },
}));