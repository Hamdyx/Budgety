import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  currency: string;
  setCurrency: (currency: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    set => ({
      currency: 'USD',
      setCurrency: (currency: string) => set({ currency }),
    }),
    { name: 'budgety-currency' }
  )
);
