import { useState, useEffect } from 'react';
import { Row, Col, Button, Progress, Typography, Divider } from 'antd';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';

import { AddTrxForm } from './AddTrxForm';
import { fetchTrxs, selectAllTrx, selectTrxIds } from '../budgetSlice';
import TransactionRow from './TransactionRow';
import CategoryMain from '../../category/components/CategoryMain';

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
    <div style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          <Row align="middle" gutter={16} style={{ marginBottom: 16 }}>
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                Budget Feature
              </Title>
            </Col>
            {budgetCircularContent}
          </Row>
          <CategoryMain />
          <Row align="middle" gutter={16} style={{ margin: '16px 0 8px' }}>
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
        </Col>
        <Col xs={24} sm={8}>
          <BudgetSection />
        </Col>
      </Row>
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
      ? incTrxs.map((trx: any, i) => <TransactionRow key={i} trx_id={trx.id} />)
      : expTrxs.map((trx: any, i) => <TransactionRow key={i} trx_id={trx.id} />);

  return (
    <div style={{ background: '#2a2d32', borderRadius: 8, padding: 16 }}>
      <Row gutter={8} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Button block type={budgetType === 'exp' ? 'primary' : 'default'} danger={budgetType === 'exp'} onClick={() => setBudgetType('exp')}>
            Expense
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            type={budgetType === 'inc' ? 'primary' : 'default'}
            onClick={() => setBudgetType('inc')}
            style={budgetType === 'inc' ? { background: '#21bf73', borderColor: '#21bf73' } : {}}
          >
            Income
          </Button>
        </Col>
      </Row>
      {content}
      <AddTrxForm />
    </div>
  );
};

const BudgetFrame = ({ timeframe, value }: { timeframe: string; value: number }) => (
  <div style={{ width: 80, textAlign: 'center' }}>
    <Progress type="circle" percent={value} size={70} />
    <div style={{ marginTop: 4, fontSize: 12, color: '#fbfcfe' }}>{timeframe}</div>
  </div>
);
