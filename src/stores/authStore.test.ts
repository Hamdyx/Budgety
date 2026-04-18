import { afterEach, describe, expect, it } from 'vitest';

import { mockToken, mockExpiredToken, mockUser } from '@/tests/fixtures';

import { useAuthStore } from './authStore';

describe('authStore', () => {
  afterEach(() => {
    useAuthStore.setState({ token: null, user: null });
  });

  it('has null initial state', () => {
    const { token, user } = useAuthStore.getState();
    // then
    expect(token).toBeNull();
    expect(user).toBeNull();
  });

  it('setAuth stores token and user', () => {
    // when
    useAuthStore.getState().setAuth(mockToken, mockUser);
    const { token, user } = useAuthStore.getState();

    // then
    expect(token).toBe(mockToken);
    expect(user).toEqual(mockUser);
  });

  it('logout clears token and user', () => {
    // when
    useAuthStore.getState().setAuth(mockToken, mockUser);
    useAuthStore.getState().logout();

    // then
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });

  describe('isAuthenticated', () => {
    it('returns false when no token', () => {
      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    });

    it('returns true with valid (non-expired) token', () => {
      // given
      useAuthStore.setState({ token: mockToken, user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(true);
    });

    it('returns false and clears state for expired token', () => {
      // given
      useAuthStore.setState({ token: mockExpiredToken, user: mockUser });

      // then
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
      expect(useAuthStore.getState().token).toBeNull();
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
  });
});
