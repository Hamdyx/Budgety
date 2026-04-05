import type { InvestmentCoin, InvestmentCoinCreate, InvestmentCoinUpdate } from '@/types/types';

import { apiFetch } from '@/api/client';

export function getInvestments(): Promise<InvestmentCoin[]> {
  return apiFetch<InvestmentCoin[]>('/investments');
}

export function getInvestment(id: number): Promise<InvestmentCoin> {
  return apiFetch<InvestmentCoin>(`/investments/${id}`);
}

export function createInvestment(data: InvestmentCoinCreate): Promise<InvestmentCoin> {
  return apiFetch<InvestmentCoin>('/investments', { method: 'POST', body: data });
}

export function updateInvestment(id: number, data: InvestmentCoinUpdate): Promise<InvestmentCoin> {
  return apiFetch<InvestmentCoin>(`/investments/${id}`, { method: 'PATCH', body: data });
}

export function deleteInvestment(id: number): Promise<void> {
  return apiFetch<void>(`/investments/${id}`, { method: 'DELETE' });
}
