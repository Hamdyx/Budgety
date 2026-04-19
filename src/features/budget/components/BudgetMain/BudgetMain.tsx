import { Row, Col, Typography, Spin, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SectionHeader } from '@/components/SectionHeader';

import { CategoryMain } from '../../../category/components/CategoryMain';
import { useTransactions } from '../../hooks';
import { BudgetSection } from '../BudgetSection';
import { TransactionRow } from '../TransactionRow';

import styles from './BudgetMain.module.css';

const { Title } = Typography;

const BudgetMain = () => {
  const [month, setMonth] = useState<string>(dayjs().format('YYYY-MM'));
  const { data: allTrxs = [], isLoading } = useTransactions({ month });
  const TrxRows = allTrxs.map(trx => <TransactionRow key={trx.id} trx={trx} />);

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
            <Col>
              <DatePicker
                picker="month"
                value={dayjs(month, 'YYYY-MM')}
                onChange={d => setMonth(d ? d.format('YYYY-MM') : dayjs().format('YYYY-MM'))}
                allowClear={false}
              />
            </Col>
          </Row>
          <CategoryMain month={month} />
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

export default BudgetMain;
