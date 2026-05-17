import type { TransactionCreate, TransactionStatus, TransactionUpdate } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useExchangeRates } from '@/hooks/useExchangeRates';
import { useCurrencyStore } from '@/stores/currencyStore';
import { fromUSD, toUSD } from '@/utils/currency';

import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from './api';

const TRANSACTIONS_KEY = ['transactions'] as const;
const CATEGORIES_KEY = ['categories'] as const;
const CATEGORY_SUMMARY_KEY = ['categorySummary'] as const;

export function useTransactions(params?: { month?: string; status?: TransactionStatus }) {
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, params],
    queryFn: () => getTransactions(params),
    select: transactions =>
      transactions.map(transaction => ({
        ...transaction,
        value: rates ? fromUSD(transaction.value, currency, rates) : transaction.value,
      })),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const { data: rates } = useExchangeRates();

  return useMutation({
    mutationFn: (data: TransactionCreate) => {
      const valueInUSD = rates ? toUSD(data.value, data.currency, rates) : data.value;
      return createTransaction({ ...data, originalValue: data.value, value: valueInUSD });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionUpdate }) => {
      if (data.value !== undefined && rates) {
        const transactionCurrency = data.currency ?? currency;
        const updatedData = { ...data, originalValue: data.value, value: toUSD(data.value, transactionCurrency, rates) };
        return updateTransaction(id, updatedData);
      }
      return updateTransaction(id, data);
    },
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
