import type { MenuProps } from 'antd';

import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { OverviewIcon, BudgetIcon, LoanIcon } from '@/assets/icons';

import styles from './Sidebar.module.css';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Sider breakpoint="md" collapsedWidth={60} className={styles.sider} width={200}>
      <div className={styles.logo} />
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} className={styles.menu} />
    </Sider>
  );
}

export default Sidebar;
