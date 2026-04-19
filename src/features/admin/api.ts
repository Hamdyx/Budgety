import type { User } from '@/types/types';

import { apiFetch } from '@/api/client';

export function getUsers(): Promise<User[]> {
  return apiFetch<User[]>('/admin/users');
}

export function deleteUser(id: string): Promise<void> {
  return apiFetch<void>(`/admin/users/${id}`, {
    method: 'DELETE',
  });
}
