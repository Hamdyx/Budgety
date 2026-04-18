/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router-dom';

import { Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { PrivateRoute } from '@/components/common/PrivateRoute';
import { Overview } from '@/features/overview/components/Overview';

import { AppLayout } from './AppLayout';

import styles from './App/App.module.css';

const LoginPage = lazy(() => import('@/features/auth/components/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage/RegisterPage'));
const BudgetMain = lazy(() => import('@/features/budget/components/BudgetMain/BudgetMain'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage/BankPage'));

function SuspenseLayout() {
  return (
    <Suspense
      fallback={
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}

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
