import { Row, Col, Spin } from 'antd';

import SectionHeader from '@/components/common/SectionHeader';

import { useCategories } from '../../hooks';
import AddCategory from '../AddCategory/AddCategory';
import CategoryBox from '../CategoryBox/CategoryBox';

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
