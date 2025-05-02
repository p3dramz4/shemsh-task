import { create } from "zustand";

interface GoldStore {
  goldPrice: number;
  rialAmount: number;
  goldAmount: number;
  fee: number;
  rate: number;

  setGoldPrice: (price: number) => void;
  updateRial: (rial: number) => void; 
  updateGold: (gold: number) => void;

  setRate: (rate: number) => void;

  setRialAmountDirect: (rial: number) => void;
  setGoldAmountDirect: (gold: number) => void;

  convertRialToGold: () => void;
  convertGoldToRial: () => void;

  setFee: (fee: number) => void;
  reset: () => void;
}

export const useGoldStore = create<GoldStore>()((set, get) => ({
  goldPrice: 0,
  rialAmount: 0,
  goldAmount: 0,
  fee: 0,
  rate: 0,

  setGoldPrice: price => set({ goldPrice: price }),

  updateRial: rial => {
    const { goldPrice } = get();
    if (goldPrice === 0) return;

    const gold = Math.floor(rial / goldPrice);

    set({ rialAmount: rial, goldAmount: gold });
  },

  updateGold: gold => {
    const { goldPrice } = get();
    if (goldPrice === 0) return;

    const rial = Math.floor(gold * goldPrice);
    set({ goldAmount: gold, rialAmount: rial });
  },

  setRate: rate => set({ rate }),

  setRialAmountDirect: rial => set({ rialAmount: rial }),
  setGoldAmountDirect: gold => set({ goldAmount: gold }),

  convertRialToGold: () => {
    const { goldPrice, rialAmount } = get();
    const gold = goldPrice > 0 ? Math.floor(rialAmount / goldPrice) : 0;
    set({ goldAmount: gold });
  },

  convertGoldToRial: () => {
    const { goldPrice, goldAmount } = get();
    const rial = goldPrice > 0 ? Math.floor(goldAmount * goldPrice) : 0;
    set({ rialAmount: rial });
  },

  setFee: fee => set({ fee }),

  reset: () =>
    set({
      rialAmount: 0,
      goldAmount: 0,
      fee: 0,
      rate: 0,
    }),
}));
