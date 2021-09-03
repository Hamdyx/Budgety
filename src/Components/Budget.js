import React from 'react';
/* import ReactDom from 'react-dom'; */
import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
/* import { AiOutlineDollar } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri'; */
import { BsHouse } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';
import { MdLocalGroceryStore } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import Savings from './Savings';
import TransactionsCard from './TransactionsCard'; */
import '../App.css';
import './Budget.css';

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 0.75,
      width: '100%',
      borderColor: color,
      margin: '0.25rem 0 0.25rem 0',
    }}
  />
);

class Budget extends React.Component {
  render() {
    return (
      <Container className="main_box">
        <Row id="budget_title_row" className="box_title_row">
          <Col xs={9}>
            <h5 className="text-left">Budget</h5>
          </Col>
          <Col xs={3} className="card_add_col">
            <a href="#" className="h1 card_add text-right">
              +
            </a>
          </Col>
        </Row>

        <Container id="budget_top">
          <Row id="income_container" className="income_category_item">
            <Col xs={{ span: 7 }}>
              <InputGroup>
                <Form.Label>Income</Form.Label>
              </InputGroup>
              <Form.Text className="text-muted budget_label_text text-left">
                $58,660.00 of $1,345.54
              </Form.Text>
            </Col>
            <Col xs={{ span: 5 }}>
              <InputGroup>
                <FormControl
                  className="budget_input"
                  type="number"
                  defaultValue={6969.42}
                  className="text-right budget_item_input"
                />
              </InputGroup>
              <Form.Text className="text-muted budget_label_text text-right">
                Over
              </Form.Text>
            </Col>
          </Row>
          <ColoredLine color="#21bf73" />

          <Row id="expense_container" className="expense_category_item">
            <Col xs={{ span: 7 }}>
              <InputGroup>
                <Form.Label>Expense</Form.Label>
              </InputGroup>
              <Form.Text className="text-muted budget_label_text text-left">
                $696 of $6969
              </Form.Text>
            </Col>
            <Col xs={{ span: 5 }}>
              <InputGroup>
                <FormControl
                  id="budget_input"
                  type="number"
                  defaultValue={6969.42}
                  className="text-right budget_item_input"
                />
              </InputGroup>
              <Form.Text className="text-muted budget_label_text text-right">
                Over
              </Form.Text>
            </Col>
          </Row>
        </Container>

        <Container id="budget_items">
          <Row className="budget_category_item">
            {/* <Form.Group controlId="category_transaction_form"></Form.Group> */}
            <Col xs={2} className="mt-1">
              <MdLocalGroceryStore className="budget_category_icon groceries_icon" />
            </Col>
            <Col xs={6} className="mt-2">
              <Form.Label className="text-left">Groceries</Form.Label>
              <Form.Text className="text-muted transactions_label_text text-left">
                Food & Drinking
              </Form.Text>
            </Col>
            <Col xs={{ span: 4 }} className="text-right">
              <InputGroup>
                <Form.Control
                  className="income_item_text budget_item_input"
                  type="number"
                  defaultValue={7600.0}
                />
              </InputGroup>
              <Form.Text className="text-muted budget_label_text">Available</Form.Text>
            </Col>
          </Row>
          <Row className="budget_category_item">
            {/* <Form.Group controlId="category_transaction_form"></Form.Group> */}
            <Col xs={2} className="mt-1">
              <BsHouse className="budget_category_icon house_icon" />
            </Col>
            <Col xs={6} className="mt-2">
              <Form.Label className="text-left">House Rent</Form.Label>
              <Form.Text className="text-muted budget_label_text text-left">
                Utilities
              </Form.Text>
            </Col>
            <Col xs={{ span: 4 }} className="text-right">
              <InputGroup className="budget_item_input">
                <Form.Control
                  className="income_item_text budget_item_input"
                  type="number"
                  defaultValue={7600.0}
                />
              </InputGroup>
              <Form.Text className="text-muted budget_label_text">Available</Form.Text>
            </Col>
          </Row>
          <Row className="budget_category_item">
            <Col xs={2} className="mt-1">
              <RiBillLine className="bill_icon" />
            </Col>
            <Col xs={6} className="mt-2">
              <Form.Label>Internet</Form.Label>
              <Form.Text className="text-muted budget_label_text text-left">
                Bills
              </Form.Text>
            </Col>
            <Col xs={{ span: 4 }}>
              <InputGroup className="budget_item_input">
                <Form.Control
                  className="income_item_text budget_item_input"
                  type="number"
                  defaultValue={3500}
                />
              </InputGroup>
              <Form.Text className="text-muted budget_label_text text-right">
                Available
              </Form.Text>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Budget;
