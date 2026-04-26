import type { MenuProps } from 'antd';

import { LogoutOutlined, MenuOutlined, MoonOutlined, SettingOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '@/features/auth/hooks';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

import styles from './TopBar.module.css';

const { Header } = Layout;

interface TopBarProps {
  isMobile: boolean;
  onMobileMenuOpen: () => void;
}

function TopBar({ isMobile, onMobileMenuOpen }: TopBarProps) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const mode = useThemeStore(state => state.mode);
  const toggleMode = useThemeStore(state => state.toggleMode);
  const user = useAuthStore(state => state.user);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: 'username',
      label: <span className={styles.usernameLabel}>{user?.username}</span>,
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  const avatarLetter = user?.username?.charAt(0).toUpperCase() ?? <UserOutlined />;

  return (
    <Header className={styles.header}>
      {isMobile && <Button type="text" icon={<MenuOutlined />} onClick={onMobileMenuOpen} className={styles.iconButton} aria-label="Open menu" />}
      <Button
        type="text"
        icon={mode === 'dark' ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleMode}
        className={styles.iconButton}
        aria-label="Toggle theme"
        data-testid="themeToggleButton"
      />
      <Dropdown
        menu={{ items: profileMenuItems }}
        trigger={['click']}
        placement="bottomRight"
        classNames={{
          root: styles.userDropdown,
        }}
      >
        <Button className={styles.avatarButton} aria-label="Open profile menu">
          <Avatar className={styles.avatar}>{avatarLetter}</Avatar>
        </Button>
      </Dropdown>
    </Header>
  );
}

export default TopBar;
