import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockTransactions, mockUser } from '@/tests/fixtures';

import { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction } from './api';

describe('budget/api', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('getTransactions returns all transactions', async () => {
    // when
    const data = await getTransactions();

    // then
    expect(data).toHaveLength(mockTransactions.length);
    expect(data[0].title).toBe('Monthly Salary');
  });

  it('getTransaction returns a single transaction', async () => {
    // when
    const data = await getTransaction('trx-1');

    // then
    expect(data.id).toBe('trx-1');
    expect(data.title).toBe('Monthly Salary');
  });

  it('createTransaction creates and returns a transaction', async () => {
    // when
    const data = await createTransaction({
      type: 'inc',
      title: 'New Income',
      value: 500,
      trxDate: '2024-02-01T10:00:00',
      categoryId: 1,
    });

    // then
    expect(data.id).toBe('trx-new');
    expect(data.title).toBe('New Income');
  });

  it('updateTransaction updates and returns a transaction', async () => {
    // when
    const data = await updateTransaction('trx-1', { title: 'Updated Title' });

    // then
    expect(data.id).toBe('trx-1');
    expect(data.title).toBe('Updated Title');
  });

  it('deleteTransaction completes without error', async () => {
    // then
    await expect(deleteTransaction('trx-1')).resolves.toBeUndefined();
  });
});
