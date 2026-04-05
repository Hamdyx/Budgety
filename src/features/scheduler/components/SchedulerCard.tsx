import { Card, Calendar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SchedulerCard = () => (
  <Card
    title="Scheduler"
    extra={<Button type="text" icon={<PlusOutlined />} style={{ color: '#696c70', fontSize: '1.5rem' }} />}
    styles={{ body: { padding: '4px 8px' } }}
  >
    <Calendar fullscreen={false} />
  </Card>
);

export default SchedulerCard;
