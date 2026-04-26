import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'dark',
      toggleMode: () => set(state => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'budgety-theme' }
  )
);
