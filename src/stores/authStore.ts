import type { User } from '@/types/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (token: string, refreshToken: string, user: User) => void;
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
      refreshToken: null,
      user: null,
      setAuth: (token, refreshToken, user) => set({ token, refreshToken, user }),
      logout: () => set({ token: null, refreshToken: null, user: null }),
      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;
        if (isTokenExpired(token)) {
          set({ token: null, refreshToken: null, user: null });
          return false;
        }
        return true;
      },
    }),
    {
      name: 'budgety-auth',
      partialize: state => ({ token: state.token, refreshToken: state.refreshToken, user: state.user }),
    }
  )
);
