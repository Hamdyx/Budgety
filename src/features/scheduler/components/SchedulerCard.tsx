import { PlusOutlined } from '@ant-design/icons';
import { Card, Calendar, Button } from 'antd';

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
