import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button, Spin } from 'antd';
import { Suspense, lazy } from 'react';

import styles from './Overview.module.css';

const TransactionsCard = lazy(() => import('features/budget/components/TransactionsCard'));
const ReportsCard = lazy(() => import('./ReportsCard'));
const SchedulerCard = lazy(() => import('features/scheduler/components/SchedulerCard'));
const SavingsCard = lazy(() => import('./SavingsCard'));
const BankCard = lazy(() => import('features/bank/components/BankCard'));
const BudgetCard = lazy(() => import('features/budget/components/BudgetCard'));
const WishlistCard = lazy(() => import('./WishlistCard'));
const InvestmentCard = lazy(() => import('features/investment/components/InvestmentCard'));

const { Title } = Typography;

function Overview() {
  return (
    <div className={styles.container}>
      <Row justify="space-between" align="middle" className={styles.header}>
        <Col>
          <Title level={4} className={styles.title}>
            Overview
          </Title>
        </Col>
        <Col>
          <Button type="text" icon={<SearchOutlined />} className={styles.headerBtn} />
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Col>
      </Row>
      <Suspense fallback={<Spin size="large" />}>
        <div className={styles.grid}>
          <TransactionsCard />
          <ReportsCard />
          <SchedulerCard />
          <SavingsCard />
          <BankCard />
          <BudgetCard />
          <InvestmentCard />
          <WishlistCard />
        </div>
      </Suspense>
    </div>
  );
}

export default Overview;
