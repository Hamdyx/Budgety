import React, { useState } from 'react';

import { Container, Row, Col, Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import './TransactionsCard.css';

class Income {
	constructor(category, subCategory, value) {
		this.category = category;
		this.subCategory = subCategory;
		this.value = value;
	}
}

class Expense {
	constructor(category, subCategory, value) {
		this.category = category;
		this.subCategory = subCategory;
		this.value = value;
	}
}

function TransactionsModal() {
	const [show, setShow] = useState(false);
	const [type, setType] = useState('inc');
	const [category, setCategory] = useState('other');
	const [subCategory, setSubCategory] = useState('other');
	const [value, setValue] = useState('');
	const [trxDate, setTrxDate] = useState(new Date().toISOString().substr(0, 10));
	const [trxTime, setTrxTime] = useState(new Date().toISOString().substr(11, 5));
	const [details, setDetails] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleValue = (event) => setValue(event.target.value);
	const handleType = (event) => {
		var addBtn = document.querySelector('#trx_add_btn');
		let type = event.target.value;
		console.log(type);

		if (type === 'inc') {
			addBtn.classList.add('btn-income');
			addBtn.classList.remove('btn-expense');
		} else {
			addBtn.classList.add('btn-expense');
			addBtn.classList.remove('btn-income');
		}
		setType(type);
	};
	const handleCategory = (event) => setCategory(event.target.value);
	const handleSubCategory = (event) => setSubCategory(event.target.value);
	const handleDate = (event) => setTrxDate(event.target.value);
	const handleTime = (event) => setTrxTime(event.target.value);
	const handleDetails = (event) => setDetails(event.target.value);

	const trxOptions = {
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
			category: ['sub-category'],
		},
		category: {
			inc: ['sub-category'],
			exp: ['sub-category'],
		},
	};

	const clearFields = () => {
		setCategory('other');
		setSubCategory('other');
		setValue('');
		setTrxDate(new Date().toISOString().substr(0, 10));
		setTrxTime(new Date().toISOString().substr(11, 5));
		setDetails('');
	};

	const handleMainOptions = () => {
		const itemsList = trxOptions[type];

		const options = Object.keys(itemsList).map((i) => (
			<option key={i.slice(0, 4)} value={i}>
				{i.slice(0, 1).toUpperCase() + i.slice(1)}
			</option>
		));
		return options;
	};

	const handleSubOptions = () => {
		let itemsList = trxOptions[type];
		itemsList = itemsList[category];

		const options = itemsList.map((el) => (
			<option key={el.slice(0, 4)} value={el}>
				{el.slice(0, 1).toUpperCase() + el.slice(1)}
			</option>
		));

		return options;
	};

	const handleSubmit = () => {
		let objTest;
		type === 'inc'
			? (objTest = new Income(category, subCategory, value))
			: (objTest = new Expense(category, subCategory, value));

		console.log(objTest);
		clearFields();
	};

	return (
		<>
			<a
				key={'trx-mb' + 1}
				href="#"
				className="h1 card_add text-right"
				role="button"
				onClick={handleShow}
			>
				+
			</a>
			<Modal
				key={'trx-m' + 1}
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				centered
				id="transactions_modal"
			>
				<Modal.Header key={'trx-mh'} closeButton>
					<Modal.Title>All Transactions</Modal.Title>
				</Modal.Header>
				<Modal.Body key={'trx-mb'}>
					<Container id="trx_modal_body">
						<Row key={'mr' + 1}>
							<Col key={'trx-mc-1'} className="trx_income_tab">
								<Button value="inc" className="trx_type_btn" onClick={handleType}>
									Income
								</Button>
							</Col>
							<Col key={'trx-mc-2'} className="trx_expense_tab">
								<Button value="exp" className="trx_type_btn" onClick={handleType}>
									Expense
								</Button>
							</Col>
						</Row>
						<Row key={'mr' + 2}>
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

						<Row key={'mr' + 4}>
							<Col key={'trx-mc-3'} className="modal_input_col">
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
							<Col key={'trx-mc-4'} className="modal_input_col">
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

							<Col key={'trx-mc-5'} className="modal_input_col modal_align_end">
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

						<Row key={'mr' + 5}>
							<Col className="modal_input_col">
								<FloatingLabel label="Details">
									<Form.Control
										id="transactions_input_time"
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
				<Modal.Footer key={'trx-mf'}>
					<Button key={'trx-mfb-1'} variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						key={'trx-mfb-2'}
						id="trx_add_btn"
						className="btn-income"
						onClick={handleSubmit}
					>
						Add Trasnsaction
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

const TransactionsCard = () => {
	const items = [
		{
			id: 'item 1',
			icon: <FaBitcoin className="bitcoin_icon" />,
			iconClass: 'bitcoin_icon',
			labelTxt: 'Yield Farming',
			formTxt: 'Crypto',
		},
		{
			id: 'item 2',
			icon: <RiBankLine className="bank_icon" />,
			iconClass: 'bank_icon',
			labelTxt: 'Loan',
			formTxt: 'Bank',
		},
		{
			id: 'item 3',
			icon: <GiTakeMyMoney className="take_money_icon" />,
			iconClass: 'take_money_icon',
			labelTxt: 'Clothes',
			formTxt: 'Other',
		},
	];

	const getItemRows = () => {
		let itemList = items;
		itemList = itemList.map((el) => <TransactionItemRow key={el.id} data={el} />);
		return itemList;
	};

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

const TransactionItemRow = ({ data }) => {
	return (
		<Row className="transactions_category_item">
			<Col xs={2}>{data.icon}</Col>
			<Col>
				<p>{data.labelTxt}</p>
				<p className="text-muted transactions_label_text">{data.formTxt}</p>
			</Col>
			<Col className="text-right">
				<p className="income_item_text  transactions_item_input">{3000}</p>
			</Col>
		</Row>
	);
};

export default TransactionsCard;
