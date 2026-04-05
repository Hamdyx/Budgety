import type { MenuProps } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { OverviewIcon, BudgetIcon, LoanIcon } from '@/assets/icons';
import { useAuthStore } from '@/stores/authStore';

import styles from './Sidebar.module.css';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

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
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} className={styles.menu} />
      <div className={styles.logoutContainer}>
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
          items={[{ key: 'logout', icon: <LogoutOutlined />, label: 'Logout' }]}
          onClick={handleLogout}
          className={styles.menu}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
