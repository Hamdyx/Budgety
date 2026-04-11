import type { MenuProps } from 'antd';

import { BankOutlined, DollarOutlined, LogoutOutlined, ProductOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

import styles from './Sidebar.module.css';

interface SidebarProps {
  onNavigate?: () => void;
}

function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const mode = useThemeStore(state => state.mode);

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '/',
        icon: <ProductOutlined />,
        label: 'Overview',
      },
      {
        key: '/budget',
        icon: <DollarOutlined />,
        label: 'Budget',
      },
      {
        key: '/bank',
        icon: <BankOutlined />,
        label: 'Bank',
      },
    ],
    []
  );

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} />
      <Menu theme={mode} mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} className={styles.menu} />
      <div className={styles.bottomSection}>
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
    </nav>
  );
}

export default Sidebar;
