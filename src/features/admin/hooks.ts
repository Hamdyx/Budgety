import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteUser, getUsers } from './api';

const USERS_KEY = ['admin', 'users'] as const;

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
