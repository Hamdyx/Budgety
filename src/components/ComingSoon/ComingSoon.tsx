import { ClockCircleOutlined } from '@ant-design/icons';
import { Result } from 'antd';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

function ComingSoon({ title = 'Coming Soon', subtitle = 'This feature is currently in progress.' }: ComingSoonProps) {
  return <Result icon={<ClockCircleOutlined />} title={title} subTitle={subtitle} />;
}

export default ComingSoon;
