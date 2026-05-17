import { DatePicker, Typography, Flex } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { BudgetCard } from '@/features/budget/components/BudgetCard';
import { TransactionsCard } from '@/features/budget/components/TransactionsCard';

import { ReportsCard } from '../ReportsCard';
import { SavingsCard } from '../SavingsCard';
import { WishlistCard } from '../WishlistCard';

import styles from './Overview.module.css';

const { Title } = Typography;

function Overview() {
  const [budgetMonth, setBudgetMonth] = useState<string | undefined>(undefined);

  return (
    <div className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Title level={4} className={styles.title}>
          Overview
        </Title>
        <DatePicker
          picker="month"
          allowClear
          placeholder="Filter by month"
          onChange={value => {
            setBudgetMonth(value ? dayjs(value).format('YYYY-MM') : undefined);
          }}
          className={styles.headerBtn}
        />
      </Flex>
      <div className={styles.grid}>
        <TransactionsCard month={budgetMonth} />
        <BudgetCard month={budgetMonth} />
        <SavingsCard />
        <ReportsCard />
        <WishlistCard />
      </div>
    </div>
  );
}

export default Overview;
