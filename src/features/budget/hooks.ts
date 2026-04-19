import type { TransactionCreate, TransactionStatus, TransactionUpdate } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from './api';

const TRANSACTIONS_KEY = ['transactions'] as const;
const CATEGORIES_KEY = ['categories'] as const;
const CATEGORY_SUMMARY_KEY = ['categorySummary'] as const;

export function useTransactions(params?: { month?: string; status?: TransactionStatus }) {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, params],
    queryFn: () => getTransactions(params),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionCreate) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionUpdate }) => updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}
