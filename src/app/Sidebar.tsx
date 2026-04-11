import type { MenuProps } from 'antd';

import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, Switch } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { OverviewIcon, BudgetIcon, LoanIcon } from '@/assets/icons';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

import styles from './Sidebar.module.css';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const mode = useThemeStore(state => state.mode);
  const toggleMode = useThemeStore(state => state.toggleMode);

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '/',
        icon: <OverviewIcon />,
        label: 'Overview',
      },
      {
        key: '/budget',
        icon: <BudgetIcon />,
        label: 'Budget',
      },
      {
        key: '/bank',
        icon: <LoanIcon />,
        label: 'Bank',
      },
    ],
    []
  );

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Sider breakpoint="md" collapsedWidth={60} className={styles.sider} width={200}>
      <div className={styles.logo} />
      <Menu theme={mode} mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} className={styles.menu} />
      <div className={styles.bottomSection}>
        <div className={styles.themeToggle}>
          <Switch checked={mode === 'dark'} onChange={toggleMode} checkedChildren={<MoonOutlined />} unCheckedChildren={<SunOutlined />} />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: mode === 'dark' ? { darkItemHoverBg: 'rgba(253, 94, 83, 0.2)' } : { itemHoverBg: 'rgba(220, 38, 38, 0.08)' },
            },
          }}
        >
          <Menu
            theme={mode}
            mode="inline"
            selectable={false}
            items={[{ key: 'logout', icon: <LogoutOutlined />, label: 'Logout' }]}
            onClick={handleLogout}
            className={styles.menu}
          />
        </ConfigProvider>
      </div>
    </Sider>
  );
}

export default Sidebar;
