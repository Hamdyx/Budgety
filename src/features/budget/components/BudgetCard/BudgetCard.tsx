import { FileTextOutlined } from '@ant-design/icons';
import { Row, Col, Divider, Typography, Spin } from 'antd';

import OverviewCard from '@/components/common/OverviewCard';
import { useTransactions } from '@/features/budget/hooks';
import { useCategories } from '@/features/category/hooks';

import styles from './BudgetCard.module.css';

const { Text } = Typography;

const BudgetCard = () => {
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const { data: transactions = [], isLoading: trxLoading } = useTransactions();

  if (catLoading || trxLoading) {
    return (
      <OverviewCard title="Budget">
        <Spin />
      </OverviewCard>
    );
  }

  const totalIncome = transactions.filter(t => t.type === 'inc').reduce((sum, t) => sum + t.value, 0);
  const totalExpense = transactions.filter(t => t.type === 'exp').reduce((sum, t) => sum + t.value, 0);

  const incomeBudget = categories.filter(c => c.type === 'income').reduce((sum, c) => sum + c.budget, 0);
  const expenseBudget = categories.filter(c => c.type === 'expense').reduce((sum, c) => sum + c.budget, 0);

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
            ${totalIncome.toLocaleString()} of ${incomeBudget.toLocaleString()}
          </Text>
        </Col>
        <Col className={styles.textRight}>
          <Text className={incomeRemaining >= 0 ? styles.successText : styles.dangerText}>${Math.abs(incomeRemaining).toLocaleString()}</Text>
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
            ${totalExpense.toLocaleString()} of ${expenseBudget.toLocaleString()}
          </Text>
        </Col>
        <Col className={styles.textRight}>
          <Text className={expenseRemaining >= 0 ? styles.successText : styles.dangerText}>${Math.abs(expenseRemaining).toLocaleString()}</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {expenseRemaining >= 0 ? 'remaining' : 'over'}
          </Text>
        </Col>
      </Row>

      <Divider />

      {/* Category items */}
      {categories.map(cat => {
        const remaining = cat.budget - cat.spent;
        return (
          <Row key={cat.id} align="middle" className={styles.itemRow}>
            <Col span={3}>
              <FileTextOutlined style={{ fontSize: 20, color: cat.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)' }} />
            </Col>
            <Col flex="auto">
              <Text>{cat.category}</Text>
              <br />
              <Text type="secondary" className={styles.smallText}>
                {cat.type}
              </Text>
            </Col>
            <Col className={styles.textRight}>
              <Text className={remaining >= 0 ? styles.successText : styles.dangerText}>${Math.abs(remaining).toLocaleString()}</Text>
              <br />
              <Text type="secondary" className={styles.smallText}>
                {remaining >= 0 ? 'available' : 'over'}
              </Text>
            </Col>
          </Row>
        );
      })}
    </OverviewCard>
  );
};

export default BudgetCard;
