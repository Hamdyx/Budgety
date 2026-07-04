import { Drawer, Layout, Spin } from 'antd';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';

import { ErrorBoundary } from '@/components/ErrorBoundary';

import { Sidebar } from '../Sidebar';
import { TopBar } from '../TopBar';

import styles from './AppLayout.module.css';

const { Content, Sider } = Layout;

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(globalThis.window !== undefined && globalThis.window.innerWidth < 768);

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
      <Layout className={styles.innerLayout}>
        <TopBar isMobile={isMobile} onMobileMenuOpen={() => setMobileOpen(true)} />
        <Content className={styles.content}>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className={styles.spinContainer}>
                  <Spin size="large" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
