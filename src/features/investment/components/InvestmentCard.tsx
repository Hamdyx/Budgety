import { DollarOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { useState } from 'react';

import InvestmentModal from './InvestmentModal';

const InvestmentCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card
        title="Investment"
        extra={<Button type="text" icon={<PlusOutlined />} style={{ color: '#696c70', fontSize: '1.5rem' }} onClick={() => setModalOpen(true)} />}
        styles={{ body: { padding: '12px 16px' } }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Market Value" value={3500} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
          </Col>
          <Col span={12}>
            <Statistic title="Cash Balance" value={3500} prefix={<DollarOutlined style={{ color: '#4d7cfd' }} />} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 12 }}>
          <Col span={12}>
            <Button type="link" style={{ padding: 0, color: '#21bf73' }}>
              Portfolio
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button type="link" style={{ padding: 0, color: '#21bf73' }}>
              Transactions
            </Button>
          </Col>
        </Row>
      </Card>
      <InvestmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default InvestmentCard;
