import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import { deleteAccount } from './api';

export function useDeleteAccount() {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      logout();
      navigate('/register', { replace: true });
    },
  });
}
