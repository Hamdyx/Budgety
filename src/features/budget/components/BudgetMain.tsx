import { Row, Col, Button, Progress, Typography, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';

import { AddTrxForm } from './AddTrxForm';
import TransactionRow from './TransactionRow';
import CategoryMain from '../../category/components/CategoryMain';
import { fetchTrxs, selectAllTrx, selectTrxIds } from '../budgetSlice';

import styles from './BudgetMain.module.css';

const { Title } = Typography;

export const BudgetMain = () => {
  const allTrxIds = useSelector(selectTrxIds);
  const TrxRows = allTrxIds.map((id, i) => <TransactionRow key={i} trx_id={id} />);

  const dispatch = useAppDispatch();
  const budgetCircularFrames = {
    yearly: 10,
    monthly: 25,
    weekly: 50,
    daily: 30,
  };

  const budgetCircularContent = Object.entries(budgetCircularFrames).map(([timeframe, value], i) => (
    <Col key={i}>
      <BudgetFrame timeframe={timeframe} value={value} />
    </Col>
  ));

  useEffect(() => {
    dispatch(fetchTrxs());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <Row align="middle" gutter={16} className={styles.headerRow}>
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                Budget Feature
              </Title>
            </Col>
            {budgetCircularContent}
          </Row>
          <CategoryMain />
          <Row align="middle" gutter={16} className={styles.trxHeader}>
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                Recent Transactions
              </Title>
            </Col>
            <Col flex="auto">
              <Divider style={{ borderColor: '#545963' }} />
            </Col>
          </Row>
          {TrxRows}
        </div>
        <div className={styles.rightPanel}>
          <BudgetSection />
        </div>
      </div>
    </div>
  );
};

const BudgetSection = () => {
  const [budgetType, setBudgetType] = useState('inc');
  const allTrxs = useSelector(selectAllTrx);
  const incTrxs = allTrxs.filter((trx: any) => trx.type === 'inc');
  const expTrxs = allTrxs.filter((trx: any) => trx.type === 'exp');
  const content =
    budgetType === 'inc'
      ? incTrxs.map((trx, i) => <TransactionRow key={trx.id} trx_id={trx.id} />)
      : expTrxs.map((trx, i) => <TransactionRow key={trx.id} trx_id={trx.id} />);

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
