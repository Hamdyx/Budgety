import { Layout, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';

import Sidebar from './Sidebar';

import styles from './App.module.css';

const Overview = lazy(() => import('@/features/overview/components/Overview'));
const InvestmentPage = lazy(() => import('@/features/investment/components/InvestmentPage'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage'));
const BudgetMain = lazy(() =>
  import('@/features/budget/components/BudgetMain').then(module => ({
    default: module.BudgetMain,
  }))
);
const LoginPage = lazy(() => import('@/features/auth/components/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage'));

const { Content } = Layout;

function AppLayout() {
  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Content className={styles.content}>
        <Suspense
          fallback={
            <div className={styles.spinContainer}>
              <Spin size="large" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
}

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
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="*" element={<Overview />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
