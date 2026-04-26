import type { ApiError } from '@/types/types';

import { useAuthStore } from '@/stores/authStore';
import { decodeJwtPayload } from '@/utils/jwt';

import { toCamelCase, toSnakeCase } from './caseConverter';

const BASE_URL = import.meta.env.VITE_API_URL;

export class ApiRequestError extends Error {
  status: number;
  detail: ApiError['detail'];

  constructor(status: number, detail: ApiError['detail']) {
    const message = typeof detail === 'string' ? detail : 'Validation error';
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.detail = detail;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

let refreshPromise: Promise<void> | null = null;

async function tryRefresh(): Promise<boolean> {
  const { refreshToken, logout } = useAuthStore.getState();
  if (!refreshToken) {
    logout();
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      logout();
      return false;
    }

    const data = toCamelCase<{ accessToken: string; refreshToken: string }>(await response.json());
    const payload = decodeJwtPayload(data.accessToken);
    useAuthStore.getState().setAuth(data.accessToken, data.refreshToken, {
      id: payload.sub,
      email: payload.email ?? '',
      username: payload.username ?? '',
      isAdmin: payload.is_admin ?? false,
    });
    return true;
  } catch {
    logout();
    return false;
  }
}

export async function apiFetch<T>(path: string, { method = 'GET', body, auth = true }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = useAuthStore.getState().token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(toSnakeCase(body)) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (response.status === 401 && auth) {
    if (!refreshPromise) {
      refreshPromise = tryRefresh()
        .then(success => {
          if (!success) {
            window.location.href = '/login';
            throw new ApiRequestError(401, 'Session expired');
          }
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;

    const newToken = useAuthStore.getState().token;
    if (!newToken) {
      throw new ApiRequestError(401, 'Session expired');
    }

    const retryHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newToken}`,
    };

    const retryResponse = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: retryHeaders,
      body: body ? JSON.stringify(toSnakeCase(body)) : undefined,
    });

    if (retryResponse.status === 204) {
      return undefined as T;
    }

    const retryData = await retryResponse.json();

    if (!retryResponse.ok) {
      throw new ApiRequestError(retryResponse.status, retryData.detail ?? retryData.message ?? 'Unknown error');
    }

    return toCamelCase<T>(retryData);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiRequestError(response.status, data.detail ?? data.message ?? 'Unknown error');
  }

  return toCamelCase<T>(data);
}
