import { Result } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

function ComingSoon({ title = 'Coming Soon', subtitle = 'This feature is currently in progress.' }: ComingSoonProps) {
  return <Result icon={<ClockCircleOutlined />} title={title} subTitle={subtitle} />;
}

export default ComingSoon;
