import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Spin } from 'antd';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useThemeStore } from '@/stores/themeStore';

import { Sidebar } from '../Sidebar';

import styles from './AppLayout.module.css';

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
            data-testid="themeToggleButton"
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

export default AppLayout;
