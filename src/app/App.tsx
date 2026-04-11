import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Spin } from 'antd';
import { Suspense, lazy, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';
import { useThemeStore } from '@/stores/themeStore';

import Sidebar from './Sidebar';

import styles from './App.module.css';

const Overview = lazy(() => import('@/features/overview/components/Overview'));
const InvestmentPage = lazy(() => import('@/features/investment/components/InvestmentPage'));
const BankPage = lazy(() => import('@/features/bank/components/BankPage'));
const BudgetMain = lazy(() =>
  import('@/features/budget/components/BudgetMain/BudgetMain').then(module => ({
    default: module.BudgetMain,
  }))
);
const LoginPage = lazy(() => import('@/features/auth/components/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterPage'));

const { Content, Sider } = Layout;

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const mode = useThemeStore(state => state.mode);
  const toggleMode = useThemeStore(state => state.toggleMode);

  const handleBreakpoint = (broken: boolean) => {
    setIsMobile(broken);
    if (!broken) setMobileOpen(false);
  };

  return (
    <Layout className={styles.layout}>
      <Sider width={200} breakpoint="md" collapsedWidth={0} collapsed={isMobile} trigger={null} onBreakpoint={handleBreakpoint} className={styles.sider}>
        <Sidebar />
      </Sider>
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        size={240}
        title={null}
        closable
        styles={{ body: { padding: 0 } }}
        rootClassName={styles.mobileDrawer}
      >
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </Drawer>
      <Layout>
        <div className={styles.topBar}>
          {isMobile && (
            <Button type="text" icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} className={styles.topBarButton} aria-label="Open menu" />
          )}
          <div className={styles.topBarSpacer} />
          <Button
            type="text"
            icon={mode === 'dark' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleMode}
            className={styles.topBarButton}
            aria-label="Toggle theme"
          />
        </div>
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
