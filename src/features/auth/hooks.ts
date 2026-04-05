import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import { login, register } from './api';

export function useLogin() {
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: data => {
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      setAuth(data.accessToken, {
        id: payload.sub,
        email: '',
        username: '',
      });
      navigate('/', { replace: true });
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });
}
