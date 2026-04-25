import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { changePassword, updateProfile } from '@/features/auth/api';
import { useAuthStore } from '@/stores/authStore';
import { useCurrencyStore } from '@/stores/currencyStore';

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

export function useUpdateProfile() {
  const setUser = useAuthStore(state => state.setUser);
  const setCurrency = useCurrencyStore(state => state.setCurrency);
  const currency = useCurrencyStore(state => state.currency);

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: user => {
      setUser(user);
      setCurrency(user.currency ?? currency);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
