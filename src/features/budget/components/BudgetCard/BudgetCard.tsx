import { FileTextOutlined } from '@ant-design/icons';
import { Row, Col, Divider, Typography, Spin } from 'antd';

import { OverviewCard } from '@/components/OverviewCard';
import { useTransactions } from '@/features/budget/hooks';
import { useCategories } from '@/features/category/hooks';
import { useCurrencyFormatter } from '@/utils/currency';

import styles from './BudgetCard.module.css';

const { Text } = Typography;

interface BudgetCardProps {
  month?: string;
}

const BudgetCard = ({ month }: BudgetCardProps) => {
  const { data: categories = [], isLoading: categoryLoading } = useCategories(month);
  const { data: transactions = [], isLoading: transactionLoading } = useTransactions(month ? { month } : undefined);
  const formatCurrency = useCurrencyFormatter();

  if (categoryLoading || transactionLoading) {
    return (
      <OverviewCard title="Budget">
        <Spin />
      </OverviewCard>
    );
  }

  const totalIncome = transactions.filter(transaction => transaction.type === 'inc').reduce((sum, transaction) => sum + transaction.value, 0);
  const totalExpense = transactions.filter(transaction => transaction.type === 'exp').reduce((sum, transaction) => sum + transaction.value, 0);

  const incomeBudget = categories.filter(category => category.type === 'income').reduce((sum, category) => sum + category.budget, 0);
  const expenseBudget = categories.filter(category => category.type === 'expense').reduce((sum, category) => sum + category.budget, 0);

  const incomeRemaining = incomeBudget - totalIncome;
  const expenseRemaining = expenseBudget - totalExpense;

  return (
    <OverviewCard title="Budget">
      {/* Income */}
      <Row justify="space-between" align="middle">
        <Col>
          <Text>Income</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {formatCurrency(totalIncome)} of {formatCurrency(incomeBudget)}
          </Text>
        </Col>
        <Col className={styles.textRight}>
          <Text className={incomeRemaining >= 0 ? styles.successText : styles.dangerText}>{formatCurrency(Math.abs(incomeRemaining))}</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {incomeRemaining >= 0 ? 'remaining' : 'over'}
          </Text>
        </Col>
      </Row>
      <Divider className={styles.incomeDivider} />

      {/* Expense */}
      <Row justify="space-between" align="middle">
        <Col>
          <Text>Expense</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {formatCurrency(totalExpense)} of {formatCurrency(expenseBudget)}
          </Text>
        </Col>
        <Col className={styles.textRight}>
          <Text className={expenseRemaining >= 0 ? styles.successText : styles.dangerText}>{formatCurrency(Math.abs(expenseRemaining))}</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {expenseRemaining >= 0 ? 'remaining' : 'over'}
          </Text>
        </Col>
      </Row>

      <Divider />

      {/* Category items */}
      {categories.map(category => {
        const remaining = category.budget - category.actual;
        return (
          <Row key={category.id} align="middle" className={styles.itemRow}>
            <Col span={3}>
              <FileTextOutlined className={styles.categoryIcon} data-type={category.type} />
            </Col>
            <Col flex="auto">
              <Text>{category.name}</Text>
              <br />
              <Text type="secondary" className={styles.smallText}>
                {category.type}
              </Text>
            </Col>
            <Col className={styles.textRight}>
              <Text className={remaining >= 0 ? styles.successText : styles.dangerText}>{formatCurrency(Math.abs(remaining))}</Text>
              <br />
              <Text type="secondary" className={styles.smallText}>
                {remaining >= 0 ? (category.type === 'income' ? 'expected' : 'available') : 'over'}
              </Text>
            </Col>
          </Row>
        );
      })}
    </OverviewCard>
  );
};

export default BudgetCard;
