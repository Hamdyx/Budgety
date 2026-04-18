/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router-dom';

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';
import { SuspenseLayout } from '@/components/SuspenseLayout';
import { Overview } from '@/features/overview/components/Overview';

import { AppLayout } from './AppLayout';

const LoginPage = lazy(() => import('@/features/auth/components/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage/RegisterPage'));
const BudgetMain = lazy(() => import('@/features/budget/components/BudgetMain/BudgetMain'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage/BankPage'));

export const routeConfig: RouteObject[] = [
  {
    element: <SuspenseLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/', element: <Overview /> },
              { path: '/budget', element: <BudgetMain /> },
              { path: '/bank', element: <BankPage /> },
              { path: '*', element: <Overview /> },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);
