import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import {
	fetchCategories,
	selectAllCategories,
} from '../category/categorySlice';
import CategoryBox from './CategoryBox';
import AddCategory from './AddCategory';

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 2,
		}}
	/>
);

export const CategoryMain = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectAllCategories);

	const categoriesItems = categories.map((el, i) => (
		<Col key={i} sm={{ span: 4 }}>
			<CategoryBox item={el} />
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
