import type { Transaction } from '@/types/types';

import { Row, Col, Button } from 'antd';
import { useState } from 'react';

import { AddTrxForm } from '../AddTrxForm';
import { TransactionRow } from '../TransactionRow';

import styles from './BudgetSection.module.css';

const BudgetSection = ({ transactions }: { transactions: Transaction[] }) => {
  const [budgetType, setBudgetType] = useState('inc');
  const incTrxs = transactions.filter(trx => trx.type === 'inc');
  const expTrxs = transactions.filter(trx => trx.type === 'exp');
  const content =
    budgetType === 'inc' ? incTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />) : expTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />);

  const expenseStyle =
    budgetType === 'exp'
      ? { background: 'var(--color-danger)', borderColor: 'var(--color-danger)', color: '#fff' }
      : { background: 'transparent', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' };

  const incomeStyle =
    budgetType === 'inc'
      ? { background: 'var(--color-success)', borderColor: 'var(--color-success)', color: '#fff' }
      : { background: 'transparent', borderColor: 'var(--color-success)', color: 'var(--color-success)' };

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

export default BudgetSection;
