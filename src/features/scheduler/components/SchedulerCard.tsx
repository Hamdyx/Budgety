import { Calendar } from 'antd';

import OverviewCard from '@/components/common/OverviewCard';

const SchedulerCard = () => (
  <OverviewCard title="Scheduler" styles={{ body: { padding: '4px 8px' } }}>
    <Calendar fullscreen={false} />
  </OverviewCard>
);

export default SchedulerCard;
