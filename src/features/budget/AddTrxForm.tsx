import React, { useState } from 'react';
import { useAppDispatch } from 'app/store';
import { addNewTrx } from './budgetSlice';
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

export const AddTrxForm = () => {
	const [show, setShow] = useState(false);

	const [form] = Form.useForm();

	const dispatch = useAppDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxSumbit = async (values: any) => {
		console.log('handleTrxSumbit', { values, date: values.trxDate.toDate() });
		dispatch(
			addNewTrx({
				...values,
				id: new Date().toISOString(),
				trxDate: values.trxDate.toDate().toISOString(),
			})
		);
		handleClose();
	};

	return (
		<>
			<Button className="addTrx-btn" onClick={handleShow}>
				Add Transaction
			</Button>
			<Modal
				title="Add New Transaction"
				open={show}
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
					size="large"
					initialValues={{ type: 'inc' }}
					name="add_transaction"
					onFinish={handleTrxSumbit}
					onValuesChange={(values) =>
						console.log('add_transaction form', { values })
					}
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
								<Input />
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
								<InputNumber />
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
								/>
							</Form.Item>
						</Col>
						<Col>
							<p className="mt-3">Categories</p>
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
