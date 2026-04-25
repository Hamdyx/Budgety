import { afterEach, describe, expect, it } from 'vitest';

import { mockToken, mockRefreshToken, mockExpiredToken, mockUser } from '@/tests/fixtures';

import { useAuthStore } from './authStore';

describe('authStore', () => {
  afterEach(() => {
    useAuthStore.setState({ token: null, refreshToken: null, user: null });
  });

  it('has null initial state', () => {
    const { token, refreshToken, user } = useAuthStore.getState();
    // then
    expect(token).toBeNull();
    expect(refreshToken).toBeNull();
    expect(user).toBeNull();
  });

  it('setAuth stores token, refreshToken, and user', () => {
    // when
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    const { token, refreshToken, user } = useAuthStore.getState();

    // then
    expect(token).toBe(mockToken);
    expect(refreshToken).toBe(mockRefreshToken);
    expect(user).toEqual(mockUser);
  });

  it('logout clears token, refreshToken, and user', () => {
    // when
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    useAuthStore.getState().logout();

    // then
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().refreshToken).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });

  describe('isAuthenticated', () => {
    it('returns false when no token', () => {
      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    });

    it('returns true with valid (non-expired) token', () => {
      // given
      useAuthStore.setState({ token: mockToken, refreshToken: mockRefreshToken, user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(true);
    });

    it('returns false and clears state for expired token', () => {
      // given
      useAuthStore.setState({ token: mockExpiredToken, refreshToken: mockRefreshToken, user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().refreshToken).toBeNull();
    });

    it('returns false for malformed token', () => {
      // given
      useAuthStore.setState({ token: 'not-a-jwt', user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    });

    it('returns false for token with invalid base64 payload', () => {
      // given
      useAuthStore.setState({ token: 'a.!!!.c', user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    });

    it('returns true for a valid token with Base64URL-encoded payload (- and _ chars)', () => {
      // given – craft a token whose payload segment uses Base64URL characters
      const payload = { sub: 'user-1', exp: 9999999999 };
      const base64url = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const token = `header.${base64url}.sig`;
      useAuthStore.setState({ token, user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(true);
    });
  });
});
