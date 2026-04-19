import { Row, Col, Spin } from 'antd';

import { SectionHeader } from '@/components/SectionHeader';

import { useCategories } from '../../hooks';
import { AddCategory } from '../AddCategory';
import { CategoryBox } from '../CategoryBox';

const CategoryMain = ({ month }: { month?: string }) => {
  const { data: categories = [], isLoading } = useCategories(month);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <SectionHeader title="Categories" extra={<AddCategory />} />
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col key={category.id} xs={24} sm={8}>
            <CategoryBox category={category} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryMain;
