import { http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { mockAuthResponseSnake, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { server } from '@/tests/server';

import { ApiRequestError, apiFetch } from './client';

function makeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.test-signature`;
}

describe('ApiRequestError', () => {
  it('uses string detail as message', () => {
    const err = new ApiRequestError(400, 'Bad request');
    // then
    expect(err.message).toBe('Bad request');
    expect(err.status).toBe(400);
    expect(err.detail).toBe('Bad request');
    expect(err.name).toBe('ApiRequestError');
  });

  it('uses "Validation error" for array detail', () => {
    const detail = [{ loc: ['body', 'email'], msg: 'invalid', type: 'value_error' }];
    const err = new ApiRequestError(422, detail);
    // then
    expect(err.message).toBe('Validation error');
    expect(err.detail).toEqual(detail);
  });
});

describe('apiFetch', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'test-token', refreshToken: mockRefreshToken, user: mockUser });
  });

  afterEach(() => {
    useAuthStore.setState({ token: null, refreshToken: null, user: null });
  });

  it('sends GET request and converts response to camelCase', async () => {
    // given
    server.use(http.get('*/test', () => HttpResponse.json({ foo_bar: 'baz' })));

    // when
    const data = await apiFetch<{ fooBar: string }>('/test');

    // then
    expect(data).toEqual({ fooBar: 'baz' });
  });

  it('sends POST request with snake_case body', async () => {
    // given
    server.use(
      http.post('*/test', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body as Record<string, unknown>);
      })
    );

    // when
    const data = await apiFetch<{ my_key: string }>('/test', {
      method: 'POST',
      body: { myKey: 'value' },
    });

    // then
    expect(data).toEqual({ myKey: 'value' });
  });

  it('includes Authorization header when auth is true', async () => {
    let authHeader: string | null = null;
    // given
    server.use(
      http.get('*/test', ({ request }) => {
        authHeader = request.headers.get('Authorization');
        return HttpResponse.json({});
      })
    );

    // when
    await apiFetch('/test');

    // then
    expect(authHeader).toBe('Bearer test-token');
  });

  it('omits Authorization header when auth is false', async () => {
    let authHeader: string | null = null;
    // given
    server.use(
      http.get('*/test', ({ request }) => {
        authHeader = request.headers.get('Authorization');
        return HttpResponse.json({});
      })
    );

    // when
    await apiFetch('/test', { auth: false });

    // then
    expect(authHeader).toBeNull();
  });

  it('omits Authorization header when no token', async () => {
    // given
    useAuthStore.setState({ token: null });
    let authHeader: string | null = null;
    server.use(
      http.get('*/test', ({ request }) => {
        authHeader = request.headers.get('Authorization');
        return HttpResponse.json({});
      })
    );

    // when
    await apiFetch('/test');

    // then
    expect(authHeader).toBeNull();
  });

  it('returns undefined for 204 responses', async () => {
    // given
    server.use(http.delete('*/test', () => new HttpResponse(null, { status: 204 })));

    // when
    const result = await apiFetch('/test', { method: 'DELETE' });

    // then
    expect(result).toBeUndefined();
  });

  it('refreshes token and retries on 401', async () => {
    // given — first call returns 401, second (after refresh) returns 200
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ result: 'ok' });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const data = await apiFetch<{ result: string }>('/test');

    // then
    expect(data).toEqual({ result: 'ok' });
    expect(callCount).toBe(2);
    expect(useAuthStore.getState().token).toBe(mockToken);
    expect(useAuthStore.getState().refreshToken).toBe(mockRefreshToken);
  });

  it('logs out and redirects when refresh fails', async () => {
    // given
    const hrefSetter = vi.fn();
    Object.defineProperty(globalThis, 'location', {
      value: { href: '/' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis.location, 'href', {
      set: hrefSetter,
      get: () => '/',
      configurable: true,
    });

    server.use(
      http.get('*/test', () => new HttpResponse(null, { status: 401 })),
      http.post('*/auth/refresh', () => new HttpResponse(null, { status: 401 }))
    );

    // then
    await expect(apiFetch('/test')).rejects.toThrow('Session expired');
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().refreshToken).toBeNull();
    expect(hrefSetter).toHaveBeenCalledWith('/login');
  });

  it('logs out when no refresh token is available', async () => {
    // given
    useAuthStore.setState({ refreshToken: null });
    const hrefSetter = vi.fn();
    Object.defineProperty(globalThis, 'location', {
      value: { href: '/' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis.location, 'href', {
      set: hrefSetter,
      get: () => '/',
      configurable: true,
    });

    server.use(http.get('*/test', () => new HttpResponse(null, { status: 401 })));

    // then
    await expect(apiFetch('/test')).rejects.toThrow('Session expired');
    expect(useAuthStore.getState().token).toBeNull();
    expect(hrefSetter).toHaveBeenCalledWith('/login');
  });

  it('throws ApiRequestError for non-ok responses', async () => {
    // given
    server.use(http.get('*/test', () => HttpResponse.json({ detail: 'Not found' }, { status: 404 })));

    // then
    await expect(apiFetch('/test')).rejects.toThrow(ApiRequestError);
    try {
      await apiFetch('/test');
    } catch (e) {
      expect((e as ApiRequestError).status).toBe(404);
      expect((e as ApiRequestError).detail).toBe('Not found');
    }
  });

  it('uses data.message when detail is not present', async () => {
    // given
    server.use(http.get('*/test', () => HttpResponse.json({ message: 'Server error' }, { status: 500 })));

    // then
    try {
      await apiFetch('/test');
    } catch (e) {
      expect((e as ApiRequestError).detail).toBe('Server error');
    }
  });

  it('uses "Unknown error" when no detail or message', async () => {
    // given
    server.use(http.get('*/test', () => HttpResponse.json({}, { status: 500 })));

    // then
    try {
      await apiFetch('/test');
    } catch (e) {
      expect((e as ApiRequestError).detail).toBe('Unknown error');
    }
  });

  it('sets currency store when refresh token contains currency', async () => {
    // given
    const tokenWithCurrency = makeJwt({
      sub: 'user-1',
      email: 'test@example.com',
      username: 'testuser',
      is_admin: false,
      currency: 'EUR',
      exp: 9999999999,
    });
    const refreshWithCurrency = makeJwt({ sub: 'user-1', exp: 9999999999, type: 'refresh' });
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ ok: true });
      }),
      http.post('*/auth/refresh', () =>
        HttpResponse.json({
          access_token: tokenWithCurrency,
          refresh_token: refreshWithCurrency,
          token_type: 'bearer',
        })
      )
    );

    // when
    await apiFetch('/test');

    // then
    expect(useCurrencyStore.getState().currency).toBe('EUR');
  });

  it('uses fallback values when JWT payload is missing fields', async () => {
    // given
    const minimalToken = makeJwt({ sub: 'user-1', exp: 9999999999 });
    const minimalRefresh = makeJwt({ sub: 'user-1', exp: 9999999999, type: 'refresh' });
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ ok: true });
      }),
      http.post('*/auth/refresh', () =>
        HttpResponse.json({
          access_token: minimalToken,
          refresh_token: minimalRefresh,
          token_type: 'bearer',
        })
      )
    );

    // when
    await apiFetch('/test');

    // then
    const state = useAuthStore.getState();
    expect(state.user).toEqual({
      id: 'user-1',
      email: '',
      username: '',
      isAdmin: false,
    });
  });

  it('logs out when refresh throws a network error', async () => {
    // given
    const hrefSetter = vi.fn();
    Object.defineProperty(globalThis, 'location', {
      value: { href: '/' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis.location, 'href', {
      set: hrefSetter,
      get: () => '/',
      configurable: true,
    });

    server.use(
      http.get('*/test', () => new HttpResponse(null, { status: 401 })),
      http.post('*/auth/refresh', () => HttpResponse.error())
    );

    // then
    await expect(apiFetch('/test')).rejects.toThrow('Session expired');
    expect(useAuthStore.getState().token).toBeNull();
    expect(hrefSetter).toHaveBeenCalledWith('/login');
  });

  it('deduplicates concurrent refresh calls on multiple 401s', async () => {
    // given
    let refreshCallCount = 0;
    let testCallCount = 0;
    server.use(
      http.get('*/test', () => {
        testCallCount++;
        if (testCallCount <= 2) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ result: 'ok' });
      }),
      http.post('*/auth/refresh', () => {
        refreshCallCount++;
        return HttpResponse.json(mockAuthResponseSnake);
      })
    );

    // when
    const [result1, result2] = await Promise.all([apiFetch<{ result: string }>('/test'), apiFetch<{ result: string }>('/test')]);

    // then
    expect(refreshCallCount).toBe(1);
    expect(result1).toEqual({ result: 'ok' });
    expect(result2).toEqual({ result: 'ok' });
  });

  it('throws when token is null after successful refresh', async () => {
    // given
    let cleared = false;
    const unsub = useAuthStore.subscribe(state => {
      if (state.token === mockToken && !cleared) {
        cleared = true;
        useAuthStore.setState({ token: null });
      }
    });

    server.use(
      http.get('*/test', () => new HttpResponse(null, { status: 401 })),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // then
    await expect(apiFetch('/test')).rejects.toThrow('Session expired');
    unsub();
  });

  it('retries POST request with body after 401 refresh', async () => {
    // given
    let callCount = 0;
    let retryBody: unknown = null;
    server.use(
      http.post('*/test', async ({ request }) => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        retryBody = await request.json();
        return HttpResponse.json({ created: true });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const data = await apiFetch<{ created: boolean }>('/test', {
      method: 'POST',
      body: { myKey: 'value' },
    });

    // then
    expect(data).toEqual({ created: true });
    expect(retryBody).toEqual({ my_key: 'value' });
  });

  it('returns undefined when retry response is 204', async () => {
    // given
    let callCount = 0;
    server.use(
      http.delete('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return new HttpResponse(null, { status: 204 });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const result = await apiFetch('/test', { method: 'DELETE' });

    // then
    expect(result).toBeUndefined();
    expect(callCount).toBe(2);
  });

  it('throws when retry response is not ok', async () => {
    // given
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ detail: 'Forbidden' }, { status: 403 });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const error = await apiFetch('/test').catch(e => e);

    // then
    expect(error).toBeInstanceOf(ApiRequestError);
    expect((error as ApiRequestError).status).toBe(403);
    expect((error as ApiRequestError).detail).toBe('Forbidden');
  });

  it('uses message fallback when retry response has no detail', async () => {
    // given
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({ message: 'Not allowed' }, { status: 403 });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const error = await apiFetch('/test').catch(e => e);

    // then
    expect(error).toBeInstanceOf(ApiRequestError);
    expect((error as ApiRequestError).detail).toBe('Not allowed');
  });

  it('uses Unknown error fallback when retry response has no detail or message', async () => {
    // given
    let callCount = 0;
    server.use(
      http.get('*/test', () => {
        callCount++;
        if (callCount === 1) return new HttpResponse(null, { status: 401 });
        return HttpResponse.json({}, { status: 500 });
      }),
      http.post('*/auth/refresh', () => HttpResponse.json(mockAuthResponseSnake))
    );

    // when
    const error = await apiFetch('/test').catch(e => e);

    // then
    expect(error).toBeInstanceOf(ApiRequestError);
    expect((error as ApiRequestError).detail).toBe('Unknown error');
  });
});
