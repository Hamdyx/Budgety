import type { Category, CategoryCreate, CategoryUpdate } from '@/types/types';

import { apiFetch } from '@/api/client';

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/categories');
}

export function getCategory(id: number): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`);
}

export function createCategory(data: CategoryCreate): Promise<Category> {
  return apiFetch<Category>('/categories', { method: 'POST', body: data });
}

export function updateCategory(id: number, data: CategoryUpdate): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, { method: 'PATCH', body: data });
}

export function deleteCategory(id: number): Promise<void> {
  return apiFetch<void>(`/categories/${id}`, { method: 'DELETE' });
}
