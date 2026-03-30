import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';
import { ColoredLine } from 'Components/common/ColoredLine';

import AddCategory from './AddCategory';
import CategoryBox from './CategoryBox';
import { fetchCategories, selectAllCategories } from './categorySlice';


export const CategoryMain = () => {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectAllCategories);

	const categoriesItems = categories.map((el, i) => (
		<Col key={i} sm={{ span: 4 }}>
			<CategoryBox id={el?.id} />
		</Col>
	));

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<Row>
				<Col sm={{ span: 2 }}>
					<h5>Categories</h5>
				</Col>
				<AddCategory />
				<Col>
					<ColoredLine color={'#545963'} />
				</Col>
			</Row>
			<Row className="category-row">{categoriesItems}</Row>
		</>
	);
};

export default CategoryMain;
