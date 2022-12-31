import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

import { RiBillLine } from 'react-icons/ri';

const CategoryBox = ({ item }) => {
	const { category, spent, budget } = item

	return (
		<Container className="category-type" fluid>
			<Row>
				<Col sm={{ span: 4 }}>
					<section className="category-circular" style={{ width: 50, height: 50 }}>
						<CircularProgressbarWithChildren value={50}>
							<div className="category-icon">
								<RiBillLine />
							</div>
						</CircularProgressbarWithChildren>
					</section>
				</Col>
				<Col className="category-text">
					<h6>{category}</h6>
					<p>
						${spent}/${budget}
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default CategoryBox;
