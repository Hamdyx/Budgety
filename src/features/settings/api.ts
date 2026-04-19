import { apiFetch } from '@/api/client';

export function deleteAccount(): Promise<void> {
  return apiFetch<void>('/auth/me', {
    method: 'DELETE',
  });
}
