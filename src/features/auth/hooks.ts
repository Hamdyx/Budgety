import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { decodeJwtPayload } from '@/utils/jwt';

import { forgotPassword, login, logoutApi, register, resetPassword, verifyResetOtp } from './api';

export function useLogin() {
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: data => {
      const payload = decodeJwtPayload(data.accessToken);
      setAuth(data.accessToken, data.refreshToken, {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
        isAdmin: payload.is_admin,
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

export function useLogout() {
  const refreshToken = useAuthStore(state => state.refreshToken);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  return useCallback(() => {
    if (refreshToken) {
      logoutApi(refreshToken).catch(() => {});
    }
    logout();
    navigate('/login', { replace: true });
  }, [refreshToken, logout, navigate]);
}

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_data, variables) => {
      navigate('/verify-otp', { state: { email: variables.email }, replace: true });
    },
  });
}

export function useVerifyResetOtp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyResetOtp,
    onSuccess: data => {
      navigate('/reset-password', { state: { resetToken: data.resetToken }, replace: true });
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });
}
