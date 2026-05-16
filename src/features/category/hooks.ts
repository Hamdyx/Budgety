import type { CategoryCreate, CategoryUpdate } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useExchangeRates } from '@/hooks/useExchangeRates';
import { useCurrencyStore } from '@/stores/currencyStore';
import { fromUSD, toUSD } from '@/utils/currency';

import { getCategories, getCategorySummary, createCategory, updateCategory, deleteCategory } from './api';

const CATEGORIES_KEY = ['categories'] as const;
const CATEGORY_SUMMARY_KEY = ['categorySummary'] as const;

export function useCategories(month?: string) {
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useQuery({
    queryKey: [...CATEGORIES_KEY, month],
    queryFn: () => getCategories(month),
    select: categories =>
      categories.map(category => ({
        ...category,
        budget: rates ? fromUSD(category.budget, currency, rates) : category.budget,
        actual: rates ? fromUSD(category.actual, currency, rates) : category.actual,
      })),
  });
}

export function useCategorySummary(month?: string) {
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useQuery({
    queryKey: [...CATEGORY_SUMMARY_KEY, month],
    queryFn: () => getCategorySummary(month),
    select: summaries =>
      summaries.map(summary => ({
        ...summary,
        budget: rates ? fromUSD(summary.budget, currency, rates) : summary.budget,
        actual: rates ? fromUSD(summary.actual, currency, rates) : summary.actual,
        remaining: rates ? fromUSD(summary.remaining, currency, rates) : summary.remaining,
      })),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useMutation({
    mutationFn: (data: CategoryCreate) => {
      if (data.budget !== undefined && rates) {
        const budgetCurrency = data.budgetCurrency ?? currency;
        const budgetInUSD = toUSD(data.budget, budgetCurrency, rates);
        return createCategory({ ...data, originalBudget: data.budget, budget: budgetInUSD, budgetCurrency });
      }
      return createCategory({ ...data, budgetCurrency: data.budgetCurrency ?? currency });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const currency = useCurrencyStore(state => state.currency);
  const { data: rates } = useExchangeRates();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) => {
      if (data.budget !== undefined && rates) {
        const budgetCurrency = data.budgetCurrency ?? currency;
        const updatedData = { ...data, originalBudget: data.budget, budget: toUSD(data.budget, budgetCurrency, rates), budgetCurrency };
        return updateCategory(id, updatedData);
      }
      return updateCategory(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}
