import type { Transaction } from '@/types/types';

import { Row, Col, Button } from 'antd';
import { useState } from 'react';

import { AddTransactionForm } from '../AddTransactionForm';
import { TransactionRow } from '../TransactionRow';

import styles from './BudgetSection.module.css';

const BudgetSection = ({ transactions }: { transactions: Transaction[] }) => {
  const [budgetType, setBudgetType] = useState('inc');
  const incomeTransactions = transactions.filter(transaction => transaction.type === 'inc');
  const expenseTransactions = transactions.filter(transaction => transaction.type === 'exp');
  const content =
    budgetType === 'inc'
      ? incomeTransactions.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} />)
      : expenseTransactions.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} />);

  return (
    <div className={styles.section}>
      <Row gutter={8} className={styles.buttonRow}>
        <Col span={12}>
          <Button block color="danger" variant={budgetType === 'exp' ? 'solid' : 'outlined'} onClick={() => setBudgetType('exp')}>
            Expense
          </Button>
        </Col>
        <Col span={12}>
          <Button block color="primary" variant={budgetType === 'inc' ? 'solid' : 'outlined'} onClick={() => setBudgetType('inc')}>
            Income
          </Button>
        </Col>
      </Row>
      <div className={styles.sectionContent}>{content}</div>
      <AddTransactionForm />
    </div>
  );
};

export default BudgetSection;
