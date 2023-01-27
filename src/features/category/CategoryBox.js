import React, { useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { RiBillLine } from 'react-icons/ri';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Row, Space } from 'antd';

const CategoryBox = ({ item }) => {
	const { category, spent = 0, budget } = item;
	const [disabled, setDisabled] = useState(true);

	const editCategory = (ev) => {
		console.log('editCategory', { ev });
		setDisabled((prev) => !prev);
	};
	const onFinish = (ev) => {
		console.log('onFinish', { ev });
	};
	const onFinishFailed = (ev) => {
		console.log('onFinishFailed', { ev });
	};

	return (
		<div className="category_box" fluid>
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
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					disabled={disabled}
				>
					<Space>
						<div
							className="category-circular"
							style={{ width: 50, height: 50 }}
						>
							<CircularProgressbarWithChildren value={50}>
								<div className="category-icon">
									<RiBillLine />
								</div>
							</CircularProgressbarWithChildren>
						</div>
						<Form.Item name="category">
							<Input />
						</Form.Item>
						<Button
							onClick={editCategory}
							disabled={false}
							className="category_edit_btn"
						>
							<EditOutlined />
						</Button>
					</Space>
					<Space className="category-data">
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
					</Space>
				</Form>
			</Row>
		</div>
	);
};

export default CategoryBox;
