import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Radio,
	Row,
} from 'antd';
import { useAppDispatch } from 'app/store';
import { selectAllCategories } from 'features/category/categorySlice';
import { addNewTrx } from './budgetSlice';

export const AddTrxForm = () => {
	const categories = useSelector(selectAllCategories);
	const [isAddTrxModalOpen, setIsAddTrxModalOpen] = useState(false);

	const [form] = Form.useForm();

	const dispatch = useAppDispatch();

	const handleClose = () => setIsAddTrxModalOpen(false);
	const handleShow = () => setIsAddTrxModalOpen(true);

	const handleTrxSumbit = async (values: any) => {
		dispatch(
			addNewTrx({
				...values,
				id: new Date().toISOString(),
				trxDate: values.trxDate.toDate().toISOString(),
			})
		);
		handleClose();
	};

	useEffect(() => {
		console.log('useEffect', { categories });
	}, [categories]);
	return (
		<>
			<Button className="addTrx-btn" onClick={handleShow}>
				Add Transaction
			</Button>
			<Modal
				title="Add New Transaction"
				open={isAddTrxModalOpen}
				onCancel={handleClose}
				className="budget-trx-modal"
				footer={
					<>
						<Button type="ghost" onClick={handleClose}>
							Close
						</Button>
					</>
				}
			>
				<Form
					form={form}
					layout={'vertical'}
					name="add_transaction"
					size="large"
					initialValues={{
						type: 'inc',
						trxDate: dayjs(),
					}}
					onFinish={handleTrxSumbit}
					onValuesChange={(values) =>
						console.log('add_transaction form', { values })
					}
					requiredMark={false}
				>
					<Row>
						<Col span={24}>
							<Form.Item name="type">
								<Radio.Group buttonStyle="solid" className="trx_type_radio">
									<Radio.Button className="radio_inc" value="inc">
										INCOME
									</Radio.Button>
									<Radio.Button className="radio_exp" value="exp">
										EXPENSE
									</Radio.Button>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>
					<Row className="mt-3" gutter={12}>
						<Col>
							<Form.Item
								name="title"
								label="Title"
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input placeholder="input transaction title, name" />
							</Form.Item>
							<Form.Item
								name="value"
								label="Value"
								rules={[
									{
										required: true,
									},
								]}
							>
								<InputNumber placeholder="input transaction value" />
							</Form.Item>
							<Form.Item
								name="trxDate"
								label="Date"
								rules={[
									{
										required: true,
									},
								]}
							>
								<DatePicker
									format="DD MMM YYYY - HH:mm"
									showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
									placeholder="select transaction date"
								/>
							</Form.Item>
						</Col>
						<Col>
							{categories.length > 0 && (
								<Form.Item
									name="category"
									label="Category"
									rules={[
										{
											required: true,
										},
									]}
								>
									<Radio.Group>
										{categories.map(({ id, category }) => (
											<Radio.Button key={id} value={id}>
												{category}
											</Radio.Button>
										))}
									</Radio.Group>
								</Form.Item>
							)}
						</Col>
					</Row>
					<Form.Item wrapperCol={{ offset: 17, span: 7 }}>
						<Button type="primary" htmlType="submit">
							Save Changes
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
