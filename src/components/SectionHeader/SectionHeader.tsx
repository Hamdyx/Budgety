import type { ReactNode } from 'react';

import { Col, Divider, Flex, Typography } from 'antd';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  extra?: ReactNode;
  gap?: number;
}

const SectionHeader = ({ title, extra, gap = 8 }: SectionHeaderProps) => (
  <Divider titlePlacement="start" className={styles.divider}>
    <Flex align="center" justify="space-between" gap={gap}>
      <Typography.Title level={5} className={styles.title}>{title}</Typography.Title>
      {extra && <Col>{extra}</Col>}
    </Flex>
  </Divider>
);

export default SectionHeader;
