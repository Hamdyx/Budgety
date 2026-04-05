import { Row, Col, Spin } from 'antd';

import SectionHeader from '@/components/common/SectionHeader';

import AddCategory from './AddCategory';
import CategoryBox from './CategoryBox';
import { useCategories } from '../hooks';

export const CategoryMain = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <SectionHeader title="Categories" extra={<AddCategory />} />
      <Row gutter={[16, 16]}>
        {categories.map(el => (
          <Col key={el.id} xs={24} sm={8}>
            <CategoryBox category={el} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryMain;
