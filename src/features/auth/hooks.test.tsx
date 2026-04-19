import type { ReactNode } from 'react';

import { renderHook, act, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { server } from '@/tests/server';

import { useLogout } from './hooks';

function wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe('useLogout', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('clears auth store on logout', () => {
    // given
    const { result } = renderHook(() => useLogout(), { wrapper });

    // when
    act(() => {
      result.current();
    });

    // then
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.user).toBeNull();
  });

  it('calls backend logout endpoint', async () => {
    // given
    const logoutSpy = vi.fn();
    server.use(
      http.post('*/auth/logout', async ({ request }) => {
        logoutSpy(await request.json());
        return new HttpResponse(null, { status: 204 });
      })
    );

    const { result } = renderHook(() => useLogout(), { wrapper });

    // when
    act(() => {
      result.current();
    });

    // then
    await waitFor(() => {
      expect(logoutSpy).toHaveBeenCalledWith({ refresh_token: mockRefreshToken });
    });
  });

  it('clears store even if backend call fails', () => {
    // given
    server.use(http.post('*/auth/logout', () => HttpResponse.error()));

    const { result } = renderHook(() => useLogout(), { wrapper });

    // when
    act(() => {
      result.current();
    });

    // then
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.user).toBeNull();
  });
});
