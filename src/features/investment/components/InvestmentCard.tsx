import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Statistic, Button } from 'antd';
import { useMemo, useState } from 'react';

import { OverviewCard } from '@/components/common/OverviewCard';

import InvestmentModal from './InvestmentModal';
import { useInvestments } from '../hooks';

import styles from './InvestmentCard.module.css';

const InvestmentCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: investments = [] } = useInvestments();

  const totals = useMemo(() => {
    const totalBuy = investments.reduce((sum, c) => sum + c.buyAmount, 0);
    const totalSell = investments.reduce((sum, c) => sum + c.sellAmount, 0);
    return { totalBuy, totalSell };
  }, [investments]);

  return (
    <>
      <OverviewCard title="Investment" onAdd={() => setModalOpen(true)}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Market Value" value={totals.totalSell} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
          </Col>
          <Col span={12}>
            <Statistic title="Cash Balance" value={totals.totalBuy} prefix={<DollarOutlined style={{ color: '#4d7cfd' }} />} />
          </Col>
        </Row>
        <Row gutter={16} className={styles.linkRow}>
          <Col span={12}>
            <Button type="link" className={styles.portfolioLink}>
              Portfolio
            </Button>
          </Col>
          <Col span={12} className={styles.textRight}>
            <Button type="link" className={styles.portfolioLink}>
              Transactions
            </Button>
          </Col>
        </Row>
      </OverviewCard>
      <InvestmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default InvestmentCard;
