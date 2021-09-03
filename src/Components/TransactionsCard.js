import React, { useState } from 'react';

import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './App.css'; */

import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import './TransactionsCard.css';
/* import { Dropdown } from 'bootstrap'; */
/* import { Modal } from 'bootstrap'; */

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
  const [category, setCategory] = useState('category');
  const [subCategory, setSubCategory] = useState('sub-category');
  const [value, setValue] = useState('');
  const [trxDate, setTrxDate] = useState(new Date().toISOString().substr(0, 10));
  const [trxTime, setTrxTime] = useState(new Date().toISOString().substr(11, 5));
  const [details, setDetails] = useState('');

  const [subList, setSubList] = useState('sub-category');

  const [subWork, setSubWork] = useState(['salary', 'project', 'bonus']);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleValue = (event) => setValue(event.target.value);
  const handleType = (event) => {
    var addBtn = document.querySelector('#trx_add_btn');
    let type = event.target.value;
    console.log(type);

    if (type == 'inc') {
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
      category: ['sub-category'],
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

    /* work: {
      inc: ['salary', 'bonus', 'freelance-project'],
      exp: ['work-fees', 'freelance-project-fees', 'tools-subscription'],
    },
    savings: {
      inc: ['deposit'],
      exp: ['withdraw'],
    }, */
    /* investment: {
      inc: ['sell'],
      exp: ['buy'],
    }, */
    /*  bank: {
      inc: ['cash_back', 'redeem_points'],
      exp: ['loan', 'credit_card'],
    }, */
    category: {
      inc: ['sub-category'],
      exp: ['sub-category'],
    },
  };

  const clearFields = () => {
    setCategory('category');
    /* setSubCategory('sub-category'); */
    setValue('');
    setTrxDate(new Date().toISOString().substr(0, 10));
    setTrxTime(new Date().toISOString().substr(11, 5));
    setDetails('');
  };

  /*   const getSubOptions = () => {
    var 
  } */

  const handleMainOptions = () => {
    var list1 = trxOptions[type];
    // console.log(list1);
    var optionsArr = [];
    Object.keys(list1).forEach((i) => {
      optionsArr.push(
        <option key={i.slice(0, 4)} value={i}>
          {i.slice(0, 1).toUpperCase() + i.slice(1)}
        </option>
      );
    });
    return optionsArr;
  };

  const handleSubOptions = () => {
    /* var list1 = ['sub-category', 'salary', 'loan', 'bills', 'clothes']; */
    var list1 = trxOptions[type];
    list1 = list1[category];
    list1.map((op) => {
      <option key={op.slice(0, 4)} value="op">
        op
      </option>;
    });

    var optionsList = [];

    list1.forEach((i) => {
      optionsList.push(
        <option key={i.slice(0, 4)} value="i">
          {i.slice(0, 1).toUpperCase() + i.slice(1)}
        </option>
      );
    });

    /* console.log(list1);
    console.log(optionsList);
    console.log(category);
    console.log(value); */

    return optionsList;
  };

  const handleSubmit = () => {
    /* if (category != 'category' && subCategory != 'sub-category' && value > 0) {
     
    } */
    console.log(type);
    console.log(category);
    console.log(subCategory);
    console.log(value);
    console.log(trxDate);
    console.log(trxTime);
    console.log(details);
    let objTest;
    type == 'inc'
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
                <Form.Control
                  as="select"
                  id="transactions_input_category"
                  value={category}
                  className="transactions_modal_input"
                  onChange={handleCategory}
                >
                  {handleMainOptions()}
                </Form.Control>
              </Col>
            </Row>
            <Row key={'mr' + 3}>
              <Col className="modal_input_col">
                <Form.Control
                  as="select"
                  id="transactions_input_subcategory"
                  className="transactions_modal_input"
                  value={subCategory}
                  onChange={handleSubCategory}
                >
                  {handleSubOptions()}
                </Form.Control>
              </Col>
            </Row>
            <Row key={'mr' + 4}>
              <Col key={'trx-mc-3'} md={4} className="modal_input_col">
                <Form.Control
                  type="number"
                  placeholder="Value"
                  id="transactions_input_value"
                  className="transactions_modal_input"
                  value={value}
                  onChange={handleValue}
                  required
                ></Form.Control>
              </Col>
              <Col key={'trx-mc-4'} md={4} className="modal_input_col">
                <Form.Control
                  type="date"
                  id="transactions_input_date"
                  className="transactions_modal_input"
                  min="2021-01-01"
                  value={trxDate}
                  onChange={handleDate}
                ></Form.Control>
              </Col>

              <Col key={'trx-mc-5'} md={3.5} className="modal_input_col modal_align_end">
                <Form.Control
                  type="time"
                  id="transactions_input_time"
                  className="transactions_modal_input "
                  value={trxTime}
                  onChange={handleTime}
                ></Form.Control>
              </Col>
            </Row>

            <Row key={'mr' + 5}>
              <Col className="modal_input_col">
                <Form.Control
                  id="transactions_input_time"
                  type="text-area"
                  className="transactions_modal_input"
                  placeholder="Details"
                  value={details}
                  onChange={handleDetails}
                ></Form.Control>
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

class TransactionItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.data,
    };
  }

  render() {
    return (
      <Row className="transactions_category_item">
        <Col xs={2}>{this.state.item.icon}</Col>
        <Col xs={6}>
          <Form.Label>{this.state.item.labelTxt}</Form.Label>
          <Form.Text className="text-muted transactions_label_text">
            {this.state.item.formTxt}
          </Form.Text>
        </Col>
        <Col xs={{ span: 4 }}>
          <p className="income_item_text text-right transactions_item_input">{3000}</p>
          {/*   <Form.Control
            className="income_item_text text-right transactions_item_input"
            type="number"
            value={3500}
          /> */}
        </Col>
      </Row>
    );
  }
}

class TransactionsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          icon: <FaBitcoin className="bitcoin_icon" />,
          iconClass: 'bitcoin_icon',
          labelTxt: 'Yield Farming',
          formTxt: 'Crypto',
        },
        {
          icon: <RiBankLine className="bank_icon" />,
          iconClass: 'bank_icon',
          labelTxt: 'Loan',
          formTxt: 'Bank',
        },
        {
          icon: <GiTakeMyMoney className="take_money_icon" />,
          iconClass: 'take_money_icon',
          labelTxt: 'Clothes',
          formTxt: 'Other',
        },
      ],
    };
  }

  componentDidMount() {
    this.getItemRows = this.getItemRows.bind(this);
  }

  getItemRows() {
    let itemList = this.state.items;
    /*  itemList.map((el, id) => {
      <TransactionItemRow key={el.labelTxt + id} data={el} />;
    }); */

    console.log(itemList);
    console.log('*' * 10);
    return <TransactionItemRow key="a1" data={itemList[0]} />;
  }

  render() {
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
        <TransactionItemRow key={1} data={this.state.items[0]} />
        <TransactionItemRow key={2} data={this.state.items[1]} />
        <TransactionItemRow key={3} data={this.state.items[2]} />
      </Container>
    );
  }
}

export default TransactionsCard;
