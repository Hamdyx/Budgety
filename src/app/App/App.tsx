import { Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from '@/components/common/PrivateRoute';
import { Overview } from '@/features/overview/components/Overview';

import { AppLayout } from '../AppLayout';

import styles from './App.module.css';

const LoginPage = lazy(() => import('@/features/auth/components/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage/RegisterPage'));
const BudgetMain = lazy(() => import('@/features/budget/components/BudgetMain/BudgetMain'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage/BankPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/budget" element={<BudgetMain />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="*" element={<Overview />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
