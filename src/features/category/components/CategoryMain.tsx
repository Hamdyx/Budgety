import { useEffect } from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';

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
      <Row align="middle" gutter={8}>
        <Col>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Categories
          </Typography.Title>
        </Col>
        <Col>
          <AddCategory />
        </Col>
        <Col flex="auto">
          <Divider style={{ borderColor: '#545963' }} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {categories.map((el, i) => (
          <Col key={i} xs={24} sm={8}>
            <CategoryBox id={el?.id} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryMain;
