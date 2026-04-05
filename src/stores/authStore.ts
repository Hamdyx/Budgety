import type { User } from '@/types/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;
        if (isTokenExpired(token)) {
          set({ token: null, user: null });
          return false;
        }
        return true;
      },
    }),
    {
      name: 'budgety-auth',
      partialize: state => ({ token: state.token, user: state.user }),
    }
  )
);
