import { describe, expect, it } from 'vitest';

import { mockAuthResponse, mockRefreshToken } from '@/tests/fixtures';

import { refreshTokens } from './api';

describe('auth api', () => {
  describe('refreshTokens', () => {
    it('returns new auth tokens', async () => {
      // when
      const result = await refreshTokens(mockRefreshToken);

      // then
      expect(result.accessToken).toBe(mockAuthResponse.accessToken);
      expect(result.refreshToken).toBe(mockAuthResponse.refreshToken);
    });
  });
});
