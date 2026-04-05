import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/store';
import SectionHeader from '@/components/common/SectionHeader';

import AddCategory from './AddCategory';
import CategoryBox from './CategoryBox';
import { fetchCategories, selectAllCategories } from '../categorySlice';

export const CategoryMain = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <SectionHeader title="Categories" extra={<AddCategory />} />
      <Row gutter={[16, 16]}>
        {categories.map(el => (
          <Col key={el.id} xs={24} sm={8}>
            <CategoryBox id={el?.id} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryMain;
