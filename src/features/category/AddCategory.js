import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Form, Input, InputNumber, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { addNewCategory } from './categorySlice';

function AddCategory() {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = (values) => {
		dispatch(addNewCategory(values));
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Col sm={{ span: 1 }}>
			<Button className="budget-add-btn" onClick={showModal}>
				+
			</Button>
			<Modal
				title="Add Category"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Category"
						name="category"
						rules={[
							{
								required: true,
								message: 'Please input your category!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Budget"
						name="budget"
						rules={[
							{
								required: true,
								message: 'Please input your Budget!',
							},
						]}
					>
						<InputNumber />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary">Submit</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Col>
	);
}

export default AddCategory;
