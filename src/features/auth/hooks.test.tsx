import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { server } from '@/tests/server';

import { useLogin, useLogout } from './hooks';

function wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
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

  it('skips API call when refreshToken is null', () => {
    // given
    useAuthStore.setState({ token: mockToken, refreshToken: null, user: mockUser });
    const logoutSpy = vi.fn();
    server.use(
      http.post('*/auth/logout', () => {
        logoutSpy();
        return new HttpResponse(null, { status: 204 });
      })
    );
    const { result } = renderHook(() => useLogout(), { wrapper });

    // when
    act(() => {
      result.current();
    });

    // then
    expect(logoutSpy).not.toHaveBeenCalled();
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
  });
});

describe('useLogin', () => {
  it('defaults email, username, isAdmin when JWT omits them', async () => {
    // given
    const header = btoa(JSON.stringify({ alg: 'HS256' }));
    const body = btoa(JSON.stringify({ sub: 'user-1', exp: 9999999999 }));
    const minimalJwt = `${header}.${body}.sig`;
    server.use(
      http.post('*/auth/login', () =>
        HttpResponse.json({
          access_token: minimalJwt,
          refresh_token: 'refresh-tok',
          token_type: 'bearer',
        })
      )
    );
    const { result } = renderHook(() => useLogin(), { wrapper });

    // when
    act(() => {
      result.current.mutate({ email: 'a@b.com', password: 'pass' });
    });

    // then
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    const state = useAuthStore.getState();
    expect(state.user?.email).toBe('');
    expect(state.user?.username).toBe('');
    expect(state.user?.isAdmin).toBe(false);
  });
});
