import type { MenuProps } from 'antd';

import { BankOutlined, CrownOutlined, DollarOutlined, ProductOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
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
  const mode = useThemeStore(state => state.mode);
  const user = useAuthStore(state => state.user);

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
      ...(user?.isAdmin
        ? [
            {
              key: '/admin/users',
              icon: <CrownOutlined />,
              label: 'Admin',
            },
          ]
        : []),
    ],
    [user?.isAdmin]
  );

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    onNavigate?.();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} />
      <Menu theme={mode} mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} className={styles.menu} />
    </nav>
  );
}

export default Sidebar;
