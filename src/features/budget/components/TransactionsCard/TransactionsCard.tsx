import type { Transaction } from '@/types/types';

import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Spin, Empty } from 'antd';

import OverviewCard from '@/components/common/OverviewCard';
import { useTransactions } from '@/features/budget/hooks';
import { useCategories } from '@/features/category/hooks';

import styles from './TransactionsCard.module.css';

const { Text } = Typography;

const TransactionItem = ({ trx, categoryName }: { trx: Transaction; categoryName: string }) => {
  const color = trx.type === 'inc' ? 'var(--color-success)' : 'var(--color-danger)';

  return (
    <Row align="middle" className={styles.itemRow}>
      <Col span={3}>
        <DollarOutlined style={{ fontSize: 20, color }} />
      </Col>
      <Col flex="auto">
        <Text>{trx.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {categoryName}
        </Text>
      </Col>
      <Col>
        <Text style={{ color }}>${trx.value.toLocaleString()}</Text>
      </Col>
    </Row>
  );
};

const TransactionsCard = () => {
  const { data: transactions = [], isLoading: trxLoading } = useTransactions();
  const { data: categories = [], isLoading: catLoading } = useCategories();

  if (trxLoading || catLoading) {
    return (
      <OverviewCard title="All Transactions">
        <Spin />
      </OverviewCard>
    );
  }

  const categoryMap = new Map(categories.map(c => [c.id, c.category]));

  return (
    <OverviewCard title="All Transactions">
      {transactions.length === 0 ? (
        <Empty description="No transactions yet" />
      ) : (
        transactions.slice(0, 5).map(trx => <TransactionItem key={trx.id} trx={trx} categoryName={categoryMap.get(trx.categoryId) ?? 'Unknown'} />)
      )}
    </OverviewCard>
  );
};

export default TransactionsCard;
