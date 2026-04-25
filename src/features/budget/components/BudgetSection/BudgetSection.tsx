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

  return (
    <div className={styles.section}>
      <Row gutter={8} className={styles.buttonRow}>
        <Col span={12}>
          <Button block className={styles.expButton} data-active={budgetType === 'exp'} onClick={() => setBudgetType('exp')}>
            Expense
          </Button>
        </Col>
        <Col span={12}>
          <Button block className={styles.incButton} data-active={budgetType === 'inc'} onClick={() => setBudgetType('inc')}>
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
