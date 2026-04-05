import type { AuthResponse, RegisterRequest, User } from '@/types/types';

import { apiFetch } from '@/api/client';

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export function register(data: RegisterRequest): Promise<User> {
  return apiFetch<User>('/auth/register', {
    method: 'POST',
    body: data,
    auth: false,
  });
}
