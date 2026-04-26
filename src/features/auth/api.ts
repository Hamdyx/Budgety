import type {
  AuthResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  User,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
} from '@/types/types';

import { apiFetch } from '@/api/client';

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export function register(data: RegisterRequest): Promise<User> {
  return apiFetch<User>('/auth/register', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export function refreshTokens(refreshToken: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    auth: false,
  });
}

export function logoutApi(refreshToken: string): Promise<void> {
  return apiFetch<void>('/auth/logout', {
    method: 'POST',
    body: { refreshToken },
  });
}

export function forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export function verifyResetOtp(data: VerifyResetOtpRequest): Promise<VerifyResetOtpResponse> {
  return apiFetch<VerifyResetOtpResponse>('/auth/verify-reset-otp', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export function resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export function updateProfile(data: UpdateProfileRequest): Promise<User> {
  return apiFetch<User>('/auth/me', {
    method: 'PATCH',
    body: data,
  });
}

export function changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/auth/change-password', {
    method: 'POST',
    body: data,
  });
}
