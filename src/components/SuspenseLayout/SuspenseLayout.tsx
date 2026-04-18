import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './SuspenseLayout.module.css';

function SuspenseLayout() {
  return (
    <Suspense
      fallback={
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}

export default SuspenseLayout;
