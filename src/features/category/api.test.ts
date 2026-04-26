import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockCategories, mockCategorySummary, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';

import { getCategories, getCategory, getCategorySummary, createCategory, updateCategory, deleteCategory } from './api';

describe('category/api', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('getCategories returns all categories', async () => {
    // when
    const data = await getCategories();

    // then
    expect(data).toHaveLength(mockCategories.length);
    expect(data[0].name).toBe('Salary');
  });

  it('getCategories passes month query param', async () => {
    // when
    const data = await getCategories('2024-01');

    // then
    expect(data).toHaveLength(mockCategories.length);
  });

  it('getCategory returns a single category', async () => {
    // when
    const data = await getCategory(1);

    // then
    expect(data.id).toBe(1);
    expect(data.name).toBe('Salary');
  });

  it('getCategory passes month query param', async () => {
    // when
    const data = await getCategory(1, '2024-01');

    // then
    expect(data.id).toBe(1);
  });

  it('getCategorySummary returns summary data', async () => {
    // when
    const data = await getCategorySummary();

    // then
    expect(data).toHaveLength(mockCategorySummary.length);
    expect(data[0].name).toBe('Salary');
    expect(data[0]).toHaveProperty('remaining');
  });

  it('getCategorySummary passes month query param', async () => {
    // when
    const data = await getCategorySummary('2024-01');

    // then
    expect(data).toHaveLength(mockCategorySummary.length);
  });

  it('createCategory creates and returns a category', async () => {
    // when
    const data = await createCategory({ name: 'Transport', type: 'expense', budget: 300 });

    // then
    expect(data.id).toBe(99);
    expect(data.name).toBe('Transport');
  });

  it('updateCategory updates and returns a category', async () => {
    // when
    const data = await updateCategory(1, { name: 'Updated Salary' });

    // then
    expect(data.id).toBe(1);
    expect(data.name).toBe('Updated Salary');
  });

  it('deleteCategory completes without error', async () => {
    // then
    await expect(deleteCategory(1)).resolves.toBeUndefined();
  });
});
