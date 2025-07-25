// store/filter.ts
import { create } from 'zustand';

type FilterState = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;

  selectedPriceRanges: string[]; // store keys like '0-99', '100-199' etc
  setSelectedPriceRanges: (ranges: string[]) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  selectedPriceRanges: [],
  setSelectedPriceRanges: (ranges) => set({ selectedPriceRanges: ranges }),
}));
