import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

import { RiBillLine } from 'react-icons/ri';

const CategoryBox = ({ category }) => {
	const title = category[0];
	const budget = category[1];
	const spent = budget.spent;
	const limit = budget.limit;
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
					<h6>{title}</h6>
					<p>
						${spent}/${limit}
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default CategoryBox;
