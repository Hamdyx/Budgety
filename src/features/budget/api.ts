import type { Transaction, TransactionCreate, TransactionStatus, TransactionUpdate } from '@/types/types';

import { apiFetch } from '@/api/client';

export function getTransactions(params?: { month?: string; status?: TransactionStatus }): Promise<Transaction[]> {
  const searchParams = new URLSearchParams();
  if (params?.month) searchParams.set('month', params.month);
  if (params?.status) searchParams.set('status', params.status);
  const query = searchParams.toString();
  return apiFetch<Transaction[]>(`/transactions${query ? `?${query}` : ''}`);
}

export function getTransaction(id: string): Promise<Transaction> {
  return apiFetch<Transaction>(`/transactions/${id}`);
}

export function createTransaction(data: TransactionCreate): Promise<Transaction> {
  return apiFetch<Transaction>('/transactions', { method: 'POST', body: data });
}

export function updateTransaction(id: string, data: TransactionUpdate): Promise<Transaction> {
  return apiFetch<Transaction>(`/transactions/${id}`, { method: 'PATCH', body: data });
}

export function deleteTransaction(id: string): Promise<void> {
  return apiFetch<void>(`/transactions/${id}`, { method: 'DELETE' });
}
