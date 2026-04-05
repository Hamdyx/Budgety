import type { Transaction } from '@/types/types';

import { Row, Col, Button, Progress, Typography, Spin } from 'antd';
import { useState } from 'react';

import SectionHeader from '@/components/common/SectionHeader';

import { AddTrxForm } from './AddTrxForm';
import TransactionRow from './TransactionRow';
import CategoryMain from '../../category/components/CategoryMain';
import { useTransactions } from '../hooks';

import styles from './BudgetMain.module.css';

const { Title } = Typography;

export const BudgetMain = () => {
  const { data: allTrxs = [], isLoading } = useTransactions();
  const TrxRows = allTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />);

  const budgetCircularFrames = {
    yearly: 10,
    monthly: 25,
    weekly: 50,
    daily: 30,
  };

  const budgetCircularContent = Object.entries(budgetCircularFrames).map(([timeframe, value]) => (
    <Col key={timeframe}>
      <BudgetFrame timeframe={timeframe} value={value} />
    </Col>
  ));

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
          <Row align="middle" gutter={16} className={styles.headerRow}>
            <Col>
              <Title level={5}>Budget Feature</Title>
            </Col>
            {budgetCircularContent}
          </Row>
          <CategoryMain />
          <SectionHeader title="Recent Transactions" />
          {TrxRows}
        </div>
        <div className={styles.rightPanel}>
          <BudgetSection transactions={allTrxs} />
        </div>
      </div>
    </div>
  );
};

const BudgetSection = ({ transactions }: { transactions: Transaction[] }) => {
  const [budgetType, setBudgetType] = useState('inc');
  const incTrxs = transactions.filter(trx => trx.type === 'inc');
  const expTrxs = transactions.filter(trx => trx.type === 'exp');
  const content =
    budgetType === 'inc' ? incTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />) : expTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />);

  const expenseStyle =
    budgetType === 'exp'
      ? { background: '#fd5e53', borderColor: '#fd5e53', color: '#fff' }
      : { background: 'transparent', borderColor: '#fd5e53', color: '#fd5e53' };

  const incomeStyle =
    budgetType === 'inc'
      ? { background: '#21bf73', borderColor: '#21bf73', color: '#fff' }
      : { background: 'transparent', borderColor: '#21bf73', color: '#21bf73' };

  return (
    <div className={styles.section}>
      <Row gutter={8} className={styles.buttonRow}>
        <Col span={12}>
          <Button block style={expenseStyle} onClick={() => setBudgetType('exp')}>
            Expense
          </Button>
        </Col>
        <Col span={12}>
          <Button block style={incomeStyle} onClick={() => setBudgetType('inc')}>
            Income
          </Button>
        </Col>
      </Row>
      <div className={styles.sectionContent}>{content}</div>
      <AddTrxForm />
    </div>
  );
};

const BudgetFrame = ({ timeframe, value }: { timeframe: string; value: number }) => (
  <div className={styles.frame}>
    <Progress type="circle" percent={value} size={70} />
    <div className={styles.frameLabel}>{timeframe}</div>
  </div>
);
