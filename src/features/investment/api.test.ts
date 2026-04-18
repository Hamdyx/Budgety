import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockInvestments } from '@/tests/fixtures';

import { getInvestments, getInvestment, createInvestment, updateInvestment, deleteInvestment } from './api';

describe('investment/api', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('getInvestments returns all investments', async () => {
    // when
    const data = await getInvestments();

    // then
    expect(data).toHaveLength(mockInvestments.length);
    expect(data[0].name).toBe('BTC');
  });

  it('getInvestment returns a single investment', async () => {
    // when
    const data = await getInvestment(1);

    // then
    expect(data.id).toBe(1);
    expect(data.name).toBe('BTC');
  });

  it('createInvestment creates and returns an investment', async () => {
    // when
    const data = await createInvestment({
      name: 'SOL',
      buyPrice: 100,
      buyAmount: 500,
      sellPrice: 120,
    });

    // then
    expect(data.id).toBe(99);
    expect(data.name).toBe('SOL');
  });

  it('updateInvestment updates and returns an investment', async () => {
    // when
    const data = await updateInvestment(1, { buyPrice: 50000 });

    // then
    expect(data.id).toBe(1);
  });

  it('deleteInvestment completes without error', async () => {
    // then
    await expect(deleteInvestment(1)).resolves.toBeUndefined();
  });
});
