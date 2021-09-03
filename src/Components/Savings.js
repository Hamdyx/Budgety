import React from 'react';

import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { AiOutlineDollar } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import '../App.css'; */
/* import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri'; */
import './Savings.css';

class Savings extends React.Component {
  render() {
    return (
      <Container className="main_box">
        <Row className="box_title_row">
          <Col xs={9}>
            <h5 className="box_title text-left">Savings</h5>
          </Col>
          <Col xs={3} className="card_add_col">
            <a href="#" className="h1 card_add text-right">
              +
            </a>
          </Col>
        </Row>
        <Row id="deposit_box" className="savings_category_item">
          <Col xs={4}>
            <AiOutlineDollar className="savings_icon" />
          </Col>
          <Col xs={{ span: 6 }}>
            <InputGroup>
              <FormControl
                className="savings_item_input"
                type="number"
                defaultValue={3500}
              />
            </InputGroup>
            <Form.Text className="text-muted savings_label_text text-left">
              Today's Deposit
            </Form.Text>
          </Col>
        </Row>
        <Row id="total_deposit_box" className="savings_category_item">
          <Col xs={4}>
            <AiOutlineDollar className="total_savings_icon" />
          </Col>
          <Col xs={6}>
            <InputGroup>
              <FormControl
                className="savings_item_input"
                type="number"
                defaultValue={35000}
              />
            </InputGroup>
            <Form.Text className="savings_label_text text-left">Bank</Form.Text>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Savings;
