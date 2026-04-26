import type { ReactNode } from 'react';

import { Typography } from 'antd';

import styles from './AuthLayout.module.css';

const { Title } = Typography;

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Budgety
        </Title>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
