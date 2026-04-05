import type { ApiError } from '@/types/types';

import { useAuthStore } from '@/stores/authStore';

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

  if (response.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = '/login';
    throw new ApiRequestError(401, 'Session expired');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiRequestError(response.status, data.detail ?? data.message ?? 'Unknown error');
  }

  return toCamelCase<T>(data);
}
