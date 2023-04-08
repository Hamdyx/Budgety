import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Form, Input, InputNumber, Modal } from 'antd';
import { useAppDispatch } from 'app/store';
import { addNewCategory } from './categorySlice';

function AddCategory() {
	const dispatch = useAppDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		form.submit();
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = (values: any) => {
		dispatch(addNewCategory(values));
		form.resetFields();
	};
	const onFinishFailed = (errorInfo: any) => {
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
				okText="Submit"
			>
				<Form
					form={form}
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
				</Form>
			</Modal>
		</Col>
	);
}

export default AddCategory;
