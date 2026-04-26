import { Typography, Spin, DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { CategoryMain } from '../../../category/components/CategoryMain';
import { useTransactions } from '../../hooks';
import { BudgetSection } from '../BudgetSection';

import styles from './BudgetMain.module.css';

const { Title } = Typography;

const BudgetMain = () => {
  const [budgetMonth, setBudgetMonth] = useState<string>(dayjs().format('YYYY-MM'));
  const { data: allTrxs = [], isLoading } = useTransactions({ month: budgetMonth });

  if (isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <Flex align="center" gap={16} className={styles.headerRow}>
            <Title level={5}>Budget</Title>
            <DatePicker picker="month" value={dayjs(budgetMonth, 'YYYY-MM')} onChange={value => setBudgetMonth(value!.format('YYYY-MM'))} allowClear={false} />
          </Flex>
          <CategoryMain month={budgetMonth} />
        </div>
        <div className={styles.rightPanel}>
          <BudgetSection transactions={allTrxs} />
        </div>
      </div>
    </div>
  );
};

export default BudgetMain;
