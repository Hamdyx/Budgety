import type { CategoryCreate, CategoryUpdate } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCategories, getCategorySummary, createCategory, updateCategory, deleteCategory } from './api';

const CATEGORIES_KEY = ['categories'] as const;
const CATEGORY_SUMMARY_KEY = ['categorySummary'] as const;

export function useCategories(month?: string) {
  return useQuery({
    queryKey: [...CATEGORIES_KEY, month],
    queryFn: () => getCategories(month),
  });
}

export function useCategorySummary(month?: string) {
  return useQuery({
    queryKey: [...CATEGORY_SUMMARY_KEY, month],
    queryFn: () => getCategorySummary(month),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreate) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORY_SUMMARY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) => updateCategory(id, data),
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
