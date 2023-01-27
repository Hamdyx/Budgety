import React from 'react';
import {
	Container,
	//  Row, Col
} from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { RiBillLine } from 'react-icons/ri';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';

const CategoryBox = ({ item }) => {
	const { category, spent = 0, budget } = item;

	const editCategory = (ev) => {
		console.log('editCategory', { ev });
	};

	return (
		<>
			<Container className="category-type" fluid>
				<Row>
					<Form
						name="category"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 16,
						}}
						initialValues={{
							remember: true,
							category,
							spent,
							budget,
						}}
						// onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Row>
							<Col sm={{ span: 8 }}>
								<section
									className="category-circular"
									style={{ width: 50, height: 50 }}
								>
									<CircularProgressbarWithChildren value={50}>
										<div className="category-icon">
											<RiBillLine />
										</div>
									</CircularProgressbarWithChildren>
								</section>
							</Col>
							<Col sm={{ span: 12 }}>
								<Form.Item
									// label="Category"
									name="category"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col sm={{ span: 4 }} className="category_edit_icon">
								<Button onClick={editCategory}>
									<EditOutlined />
								</Button>
							</Col>
							<Row>
								<Col className="category-text">
									<Row>
										<Col>
											<Form.Item name="spent">
												<InputNumber
													prefix="$"
													formatter={(value) =>
														`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
													}
													controls={false}
													bordered={false}
												/>
											</Form.Item>
										</Col>
										<Col>
											<Form.Item name="budget">
												<InputNumber
													prefix="$"
													formatter={(value) =>
														`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
													}
													controls={false}
													bordered={false}
												/>
											</Form.Item>
										</Col>
									</Row>
								</Col>
							</Row>
						</Row>
					</Form>
				</Row>
			</Container>

			<Container className="category-type" fluid>
				<Row>
					<Col sm={{ span: 4 }}>
						<section
							className="category-circular"
							style={{ width: 50, height: 50 }}
						>
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
		</>
	);
};

export default CategoryBox;
