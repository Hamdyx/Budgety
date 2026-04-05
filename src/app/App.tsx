import { Layout, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';

import styles from './App.module.css';

const Overview = lazy(() => import('features/overview/components/Overview'));
const InvestmentPage = lazy(() => import('features/investment/components/InvestmentPage'));
const BankPage = lazy(() => import('features/bank/components/BankPage'));
const BudgetMain = lazy(() =>
  import('features/budget/components/BudgetMain').then(module => ({
    default: module.BudgetMain,
  }))
);

const { Content } = Layout;

function App() {
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
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/budget" element={<BudgetMain />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
