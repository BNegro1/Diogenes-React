import { create } from 'zustand';
import { VinylRecord, User } from '../types/Record';

interface Store {
  records: VinylRecord[];
  user: User | null;
  setRecords: (records: VinylRecord[]) => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  records: [],
  user: null,
  setRecords: (records) => set({ records }),
  setUser: (user) => set({ user }),
}));