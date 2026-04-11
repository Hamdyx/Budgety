import { Typography, Flex } from 'antd';

import { BudgetCard } from '@/features/budget/components/BudgetCard';
import { TransactionsCard } from '@/features/budget/components/TransactionsCard';

import styles from './Overview.module.css';

const { Title } = Typography;

function Overview() {
  return (
    <div className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Title level={4} className={styles.title}>
          Overview
        </Title>
      </Flex>
      <div className={styles.grid}>
        <TransactionsCard />
        <BudgetCard />
      </div>
    </div>
  );
}

export default Overview;
