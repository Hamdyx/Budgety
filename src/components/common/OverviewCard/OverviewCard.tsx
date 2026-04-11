import type { CardProps } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

interface OverviewCardProps extends CardProps {
  onAdd?: () => void;
}

const OverviewCard = ({ onAdd, extra, children, styles: stylesProp, ...rest }: OverviewCardProps) => (
  <Card
    extra={extra ?? (onAdd && <Button type="text" icon={<PlusOutlined />} className="card-extra-btn" onClick={onAdd} />)}
    styles={{ body: { padding: '12px 16px' }, ...stylesProp }}
    {...rest}
  >
    {children}
  </Card>
);

export default OverviewCard;
