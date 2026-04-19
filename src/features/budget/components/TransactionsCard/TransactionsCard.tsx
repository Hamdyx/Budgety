import { Spin, Empty } from 'antd';

import { OverviewCard } from '@/components/OverviewCard';
import { useTransactions } from '@/features/budget/hooks';
import { useCategories } from '@/features/category/hooks';

import { TransactionItem } from '../TransactionItem';

interface TransactionsCardProps {
  month?: string;
}

const TransactionsCard = ({ month }: TransactionsCardProps) => {
  const { data: transactions = [], isLoading: trxLoading } = useTransactions(month ? { month } : undefined);
  const { data: categories = [], isLoading: catLoading } = useCategories(month);

  if (trxLoading || catLoading) {
    return (
      <OverviewCard title="All Transactions">
        <Spin />
      </OverviewCard>
    );
  }

  const categoryMap = new Map(categories.map(category => [category.id, category.name]));

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
