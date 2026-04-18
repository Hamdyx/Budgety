import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockCategories } from '@/tests/fixtures';

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from './api';

describe('category/api', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('getCategories returns all categories', async () => {
    // when
    const data = await getCategories();

    // then
    expect(data).toHaveLength(mockCategories.length);
    expect(data[0].category).toBe('Salary');
  });

  it('getCategory returns a single category', async () => {
    // when
    const data = await getCategory(1);

    // then
    expect(data.id).toBe(1);
    expect(data.category).toBe('Salary');
  });

  it('createCategory creates and returns a category', async () => {
    // when
    const data = await createCategory({ category: 'Transport', type: 'expense', budget: 300 });

    // then
    expect(data.id).toBe(99);
    expect(data.category).toBe('Transport');
  });

  it('updateCategory updates and returns a category', async () => {
    // when
    const data = await updateCategory(1, { category: 'Updated Salary' });

    // then
    expect(data.id).toBe(1);
    expect(data.category).toBe('Updated Salary');
  });

  it('deleteCategory completes without error', async () => {
    // then
    await expect(deleteCategory(1)).resolves.toBeUndefined();
  });
});
