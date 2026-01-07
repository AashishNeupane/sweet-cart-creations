import { create } from 'zustand';

type UpsellType = 'cakes' | 'decorations' | null;

interface UpsellState {
  isOpen: boolean;
  upsellType: UpsellType;
  openUpsell: (type: UpsellType) => void;
  closeUpsell: () => void;
}

export const useUpsellStore = create<UpsellState>((set) => ({
  isOpen: false,
  upsellType: null,

  openUpsell: (type) => set({ isOpen: true, upsellType: type }),
  closeUpsell: () => set({ isOpen: false, upsellType: null }),
}));
