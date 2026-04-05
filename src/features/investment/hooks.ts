import type { InvestmentCoinCreate, InvestmentCoinUpdate } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getInvestments, createInvestment, updateInvestment, deleteInvestment } from './api';

const INVESTMENTS_KEY = ['investments'] as const;

export function useInvestments() {
  return useQuery({
    queryKey: INVESTMENTS_KEY,
    queryFn: getInvestments,
  });
}

export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InvestmentCoinCreate) => createInvestment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENTS_KEY });
    },
  });
}

export function useUpdateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: InvestmentCoinUpdate }) => updateInvestment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENTS_KEY });
    },
  });
}

export function useDeleteInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInvestment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENTS_KEY });
    },
  });
}
