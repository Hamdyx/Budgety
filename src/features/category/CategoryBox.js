import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Button, Form, Input, InputNumber, Row, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiBillLine } from 'react-icons/ri';
import {
	deleteCategory,
	selectCategoryById,
	updateCategory,
} from './categorySlice';

const CategoryBox = ({ id }) => {
	const {
		category,
		spent = 0,
		budget,
	} = useSelector((state) => selectCategoryById(state, id));
	const [disabled, setDisabled] = useState(true);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const editCategory = () => {
		!disabled && form.submit();
		setDisabled((prev) => !prev);
	};

	const handleDeleteCategory = () => {
		console.log('deleteCategory', { id });
		dispatch(deleteCategory(id));
	};

	const onFinish = (cat) => {
		console.log('onFinish', { cat });
		dispatch(updateCategory({ id, ...cat }));
	};

	return (
		<div className="category_box">
			<Row>
				<Form
					form={form}
					name="category"
					initialValues={{
						remember: true,
						category,
						spent,
						budget,
					}}
					onFinish={onFinish}
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
						<Form.Item name="category" className="category_title">
							<Input />
						</Form.Item>
						<Space size={4}>
							{!disabled && (
								<Button
									onClick={handleDeleteCategory}
									disabled={false}
									className="category_btn --delete"
								>
									<DeleteOutlined />
								</Button>
							)}
							<Button
								onClick={editCategory}
								disabled={false}
								className="category_btn --edit"
							>
								<EditOutlined />
							</Button>
						</Space>
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
