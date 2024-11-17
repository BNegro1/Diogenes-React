import { create } from 'zustand';
import { VinylRecord, User } from '../types/Record';
import { searchRecords, getAllRecords } from '../db';

interface Store {
  records: VinylRecord[];
  allRecords: VinylRecord[];
  isLoading: boolean;
  searchTerms: { artist: string; album: string } | null;
  user: User | null;
  filters: {
    estado: string;
    formato: string;
    comuna: string;
  };
  setRecords: (records: VinylRecord[]) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  searchRecordsFromDb: (artist?: string, album?: string) => Promise<void>;
  loadAllRecords: () => Promise<void>;
  getPredictiveResults: (term: string, type: 'artist' | 'album') => VinylRecord[];
  resetFilters: () => void;
  setFilters: (filters: { estado: string; formato: string; comuna: string }) => void;
}

export const useStore = create<Store>((set, get) => ({
  records: [],
  allRecords: [],
  isLoading: false,
  searchTerms: null,
  user: null,
  filters: {
    estado: '',
    formato: '',
    comuna: ''
  },
  setRecords: (records) => set({ records }),
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  resetFilters: () => set({
    filters: { estado: '', formato: '', comuna: '' },
    searchTerms: null
  }),
  setFilters: (filters) => set({ filters }),
  searchRecordsFromDb: async (artist = '', album = '') => {
    set({ isLoading: true, searchTerms: { artist, album } });
    const records = await searchRecords(artist, album);

    const filteredRecords = records.filter(record => {
      if (artist && !album) {
        return record.ARTISTA.toLowerCase() === artist.toLowerCase();
      }
      return true;
    });

    set({ records: filteredRecords.length > 0 ? filteredRecords : records, isLoading: false });
  },
  loadAllRecords: async () => {
    set({ isLoading: true });
    const records = await getAllRecords();
    set({ allRecords: records, isLoading: false });
  },
  getPredictiveResults: (term: string, type: 'artist' | 'album') => {
    const { allRecords } = get();
    const searchTerm = term.toLowerCase();

    return allRecords.filter(record => {
      const field = type === 'artist' ? record.ARTISTA : record.ALBUM;
      return field.toLowerCase().includes(searchTerm);
    });
  }
}));