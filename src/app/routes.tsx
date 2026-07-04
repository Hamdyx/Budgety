/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { AdminRoute } from '@/components/AdminRoute';
import { PrivateRoute } from '@/components/PrivateRoute';
import { SuspenseLayout } from '@/components/SuspenseLayout';
import { Overview } from '@/features/overview/components/Overview';

import { AppLayout } from './AppLayout';

const LoginPage = lazy(() => import('@/features/auth/components/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/components/ForgotPasswordPage/ForgotPasswordPage'));
const VerifyOtpPage = lazy(() => import('@/features/auth/components/VerifyOtpPage/VerifyOtpPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/components/ResetPasswordPage/ResetPasswordPage'));
const BudgetMain = lazy(() => import('@/features/budget/components/BudgetMain/BudgetMain'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage/BankPage'));
const SettingsPage = lazy(() => import('@/features/settings/components/SettingsPage/SettingsPage'));
const AdminUsersPage = lazy(() => import('@/features/admin/components/AdminUsersPage/AdminUsersPage'));

export const routeConfig: RouteObject[] = [
  {
    element: <SuspenseLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/verify-otp', element: <VerifyOtpPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/', element: <Overview /> },
              { path: '/budget', element: <BudgetMain /> },
              { path: '/bank', element: <BankPage /> },
              { path: '/settings', element: <SettingsPage /> },
              {
                element: <AdminRoute />,
                children: [{ path: '/admin/users', element: <AdminUsersPage /> }],
              },
              { path: '*', element: <Overview /> },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);
