import { http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { server } from '@/tests/server';

import { ApiRequestError, apiFetch } from './client';

const API = import.meta.env.VITE_API_URL;

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
    useAuthStore.setState({ token: 'test-token', user: { id: '1', email: 'a@b.com', username: 'u' } });
  });

  afterEach(() => {
    useAuthStore.setState({ token: null, user: null });
  });

  it('sends GET request and converts response to camelCase', async () => {
    // given
    server.use(http.get(`${API}/test`, () => HttpResponse.json({ foo_bar: 'baz' })));
    const data = await apiFetch<{ fooBar: string }>('/test');

    // then
    expect(data).toEqual({ fooBar: 'baz' });
  });

  it('sends POST request with snake_case body', async () => {
    // given
    server.use(
      http.post(`${API}/test`, async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body as Record<string, unknown>);
      })
    );
    const data = await apiFetch<{ my_key: string }>('/test', {
      method: 'POST',
      body: { myKey: 'value' },
    });
    // Response also gets camelCased

    // then
    expect(data).toEqual({ myKey: 'value' });
  });

  it('includes Authorization header when auth is true', async () => {
    let authHeader: string | null = null;
    // given
    server.use(
      http.get(`${API}/test`, ({ request }) => {
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
      http.get(`${API}/test`, ({ request }) => {
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
      http.get(`${API}/test`, ({ request }) => {
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
    server.use(http.delete(`${API}/test`, () => new HttpResponse(null, { status: 204 })));

    // when
    const result = await apiFetch('/test', { method: 'DELETE' });

    // then
    expect(result).toBeUndefined();
  });

  it('logs out and redirects on 401', async () => {
    // given
    const hrefSetter = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { href: '/' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window.location, 'href', {
      set: hrefSetter,
      get: () => '/',
      configurable: true,
    });

    server.use(http.get(`${API}/test`, () => new HttpResponse(null, { status: 401 })));

    // then
    await expect(apiFetch('/test')).rejects.toThrow('Session expired');
    expect(useAuthStore.getState().token).toBeNull();
    expect(hrefSetter).toHaveBeenCalledWith('/login');
  });

  it('throws ApiRequestError for non-ok responses', async () => {
    // given
    server.use(http.get(`${API}/test`, () => HttpResponse.json({ detail: 'Not found' }, { status: 404 })));

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
    server.use(http.get(`${API}/test`, () => HttpResponse.json({ message: 'Server error' }, { status: 500 })));
    try {
      await apiFetch('/test');
    } catch (e) {
      expect((e as ApiRequestError).detail).toBe('Server error');
    }
  });

  it('uses "Unknown error" when no detail or message', async () => {
    // given
    server.use(http.get(`${API}/test`, () => HttpResponse.json({}, { status: 500 })));
    try {
      await apiFetch('/test');
    } catch (e) {
      expect((e as ApiRequestError).detail).toBe('Unknown error');
    }
  });
});
