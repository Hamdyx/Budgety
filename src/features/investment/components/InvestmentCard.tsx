import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Statistic, Button } from 'antd';
import { useState } from 'react';

import OverviewCard from '@/components/common/OverviewCard';

import InvestmentModal from './InvestmentModal';

import styles from './InvestmentCard.module.css';

const InvestmentCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <OverviewCard title="Investment" onAdd={() => setModalOpen(true)}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Market Value" value={3500} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
          </Col>
          <Col span={12}>
            <Statistic title="Cash Balance" value={3500} prefix={<DollarOutlined style={{ color: '#4d7cfd' }} />} />
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
