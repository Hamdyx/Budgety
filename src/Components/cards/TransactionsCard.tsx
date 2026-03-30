import type {
	TransactionItemData,
	TransactionOptionMap,
	TransactionType,
} from 'types/types';

import { useState, type ChangeEvent, type MouseEvent } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FloatingLabel,
	Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBitcoin } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { RiBankLine } from 'react-icons/ri';

import './TransactionsCard.css';

class Income {
	category: string;
	subCategory: string;
	value: string;

	constructor(category: string, subCategory: string, value: string) {
		this.category = category;
		this.subCategory = subCategory;
		this.value = value;
	}
}

class Expense {
	category: string;
	subCategory: string;
	value: string;

	constructor(category: string, subCategory: string, value: string) {
		this.category = category;
		this.subCategory = subCategory;
		this.value = value;
	}
}

function TransactionsModal() {
	const [show, setShow] = useState(false);
	const [type, setType] = useState<TransactionType>('inc');
	const [category, setCategory] = useState('other');
	const [subCategory, setSubCategory] = useState('other');
	const [value, setValue] = useState('');
	const [trxDate, setTrxDate] = useState(new Date().toISOString().slice(0, 10));
	const [trxTime, setTrxTime] = useState(
		new Date().toISOString().slice(11, 16)
	);
	const [details, setDetails] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleValue = (event: ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value);
	const handleType = (event: MouseEvent<HTMLButtonElement>) => {
		const addBtn = document.querySelector(
			'#trx_add_btn'
		) as HTMLButtonElement | null;
		const nextType = (event.currentTarget.value || 'inc') as TransactionType;

		if (addBtn) {
			if (nextType === 'inc') {
				addBtn.classList.add('btn-income');
				addBtn.classList.remove('btn-expense');
			} else {
				addBtn.classList.add('btn-expense');
				addBtn.classList.remove('btn-income');
			}
		}

		setType(nextType);
	};

	const handleCategory = (event: ChangeEvent<HTMLSelectElement>) =>
		setCategory(event.target.value);
	const handleSubCategory = (event: ChangeEvent<HTMLSelectElement>) =>
		setSubCategory(event.target.value);
	const handleDate = (event: ChangeEvent<HTMLInputElement>) =>
		setTrxDate(event.target.value);
	const handleTime = (event: ChangeEvent<HTMLInputElement>) =>
		setTrxTime(event.target.value);
	const handleDetails = (event: ChangeEvent<HTMLInputElement>) =>
		setDetails(event.target.value);

	const trxOptions: TransactionOptionMap = {
		inc: {
			work: ['salary', 'bonus', 'freelance-project'],
			savings: ['deposit'],
			investment: ['sell'],
			bank: ['cash-back', 'redeem-points'],
			other: ['other'],
		},
		exp: {
			work: ['work-fees', 'freelance-project-fees', 'tools-subscription'],
			savings: ['withdraw'],
			investment: ['buy'],
			bank: ['loan', 'credit-card'],
			shopping: ['clothes', 'groceries', 'electrocins', 'health care'],
			utility: [
				'electric bill',
				'gas bill',
				'rent',
				'internet bill',
				'water bill',
				'landline bill',
				'mobile bill',
			],
			other: ['other'],
		},
	};

	const clearFields = () => {
		setCategory('other');
		setSubCategory('other');
		setValue('');
		setTrxDate(new Date().toISOString().slice(0, 10));
		setTrxTime(new Date().toISOString().slice(11, 16));
		setDetails('');
	};

	const handleMainOptions = () => {
		const itemsList = trxOptions[type];
		return Object.keys(itemsList).map((item) => (
			<option key={item} value={item}>
				{item.slice(0, 1).toUpperCase() + item.slice(1)}
			</option>
		));
	};

	const handleSubOptions = () => {
		const itemsList = trxOptions[type][category] ?? ['other'];
		return itemsList.map((item) => (
			<option key={item} value={item}>
				{item.slice(0, 1).toUpperCase() + item.slice(1)}
			</option>
		));
	};

	const handleSubmit = () => {
		const created =
			type === 'inc'
				? new Income(category, subCategory, value)
				: new Expense(category, subCategory, value);

		console.log(created, details);
		clearFields();
	};

	return (
		<>
			<button
				type="button"
				className="h1 card_add text-right"
				onClick={handleShow}
			>
				+
			</button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				centered
				id="transactions_modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>All Transactions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container id="trx_modal_body">
						<Row>
							<Col className="trx_income_tab">
								<Button
									value="inc"
									className="trx_type_btn"
									onClick={handleType}
								>
									Income
								</Button>
							</Col>
							<Col className="trx_expense_tab">
								<Button
									value="exp"
									className="trx_type_btn"
									onClick={handleType}
								>
									Expense
								</Button>
							</Col>
						</Row>
						<Row>
							<Col className="modal_input_col">
								<FloatingLabel label="Category">
									<Form.Select
										id="transactions_input_category"
										className="transactions_modal_input"
										value={category}
										onChange={handleCategory}
										required
									>
										{handleMainOptions()}
									</Form.Select>
								</FloatingLabel>
							</Col>
							<Col className="modal_input_col">
								<FloatingLabel label="Sub-Category">
									<Form.Select
										id="transactions_input_subcategory"
										className="transactions_modal_input"
										value={subCategory}
										onChange={handleSubCategory}
										required
									>
										{handleSubOptions()}
									</Form.Select>
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col className="modal_input_col">
								<FloatingLabel label="Value">
									<Form.Control
										id="transactions_input_value"
										className="transactions_modal_input"
										type="number"
										placeholder="Value"
										value={value}
										onChange={handleValue}
										required
									/>
								</FloatingLabel>
							</Col>
							<Col className="modal_input_col">
								<FloatingLabel label="Date">
									<Form.Control
										id="transactions_input_date"
										className="transactions_modal_input"
										type="date"
										min="2021-01-01"
										value={trxDate}
										onChange={handleDate}
										required
									/>
								</FloatingLabel>
							</Col>

							<Col className="modal_input_col modal_align_end">
								<FloatingLabel label="Time">
									<Form.Control
										id="transactions_input_time"
										className="transactions_modal_input "
										type="time"
										value={trxTime}
										onChange={handleTime}
										required
									/>
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col className="modal_input_col">
								<FloatingLabel label="Details">
									<Form.Control
										id="transactions_input_details"
										className="transactions_modal_input"
										placeholder="Details"
										value={details}
										onChange={handleDetails}
									/>
								</FloatingLabel>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						id="trx_add_btn"
						className="btn-income"
						onClick={handleSubmit}
					>
						Add Transaction
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

const TransactionsCard = () => {
	const items: TransactionItemData[] = [
		{
			id: 'item-1',
			icon: <FaBitcoin className="bitcoin_icon" />,
			iconClass: 'bitcoin_icon',
			labelTxt: 'Yield Farming',
			formTxt: 'Crypto',
		},
		{
			id: 'item-2',
			icon: <RiBankLine className="bank_icon" />,
			iconClass: 'bank_icon',
			labelTxt: 'Loan',
			formTxt: 'Bank',
		},
		{
			id: 'item-3',
			icon: <GiTakeMyMoney className="take_money_icon" />,
			iconClass: 'take_money_icon',
			labelTxt: 'Clothes',
			formTxt: 'Other',
		},
	];

	const getItemRows = () =>
		items.map((item) => <TransactionItemRow key={item.id} data={item} />);

	return (
		<Container className="main_box">
			<Row className="box_title_row">
				<Col xs={9}>
					<h5 className="box_title text-left">All Transactions</h5>
				</Col>
				<Col xs={3} className="card_add_col">
					<TransactionsModal />
				</Col>
			</Row>
			{getItemRows()}
		</Container>
	);
};

const TransactionItemRow = ({ data }: { data: TransactionItemData }) => {
	return (
		<Row className="transactions_category_item">
			<Col xs={2}>{data.icon}</Col>
			<Col>
				<p>{data.labelTxt}</p>
				<p className="text-muted transactions_label_text">{data.formTxt}</p>
			</Col>
			<Col className="text-right">
				<p className="income_item_text  transactions_item_input">3000</p>
			</Col>
		</Row>
	);
};

export default TransactionsCard;
