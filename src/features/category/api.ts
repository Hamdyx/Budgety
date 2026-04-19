import type { Category, CategoryCreate, CategorySummary, CategoryUpdate } from '@/types/types';

import { apiFetch } from '@/api/client';

export function getCategories(month?: string): Promise<Category[]> {
  const query = month ? `?month=${month}` : '';
  return apiFetch<Category[]>(`/categories${query}`);
}

export function getCategory(id: number, month?: string): Promise<Category> {
  const query = month ? `?month=${month}` : '';
  return apiFetch<Category>(`/categories/${id}${query}`);
}

export function getCategorySummary(month?: string): Promise<CategorySummary[]> {
  const query = month ? `?month=${month}` : '';
  return apiFetch<CategorySummary[]>(`/categories/summary${query}`);
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
