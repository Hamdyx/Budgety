import React from 'react';
import ReactDom from 'react-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Nav,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './App.css'; */

import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import { FaCar } from 'react-icons/fa';
import './WishlistCard.css';

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 50,
      width: '0.5%',
      borderColor: color,
      margin: '0.25rem 0 0.25rem 0',
    }}
  />
);

class WishlistCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="main_box">
        <Row className="box_title_row">
          <Col xs={9}>
            <h5 className="box_title text-left">Wishlist</h5>
          </Col>
          <Col xs={3} className="card_add_col">
            <a href="#" className="h1 card_add text-right">
              +
            </a>
          </Col>
        </Row>
        <Row className="wishlist_category_item">
          <Col xs={{ span: 4, offset: 2 }} className="wishlist_value">
            <FormControl
              type="number"
              value={3500}
              className="income_item_text text-right wishlist_item_input"
              disabled
            />

            <Form.Text className="text-muted investment_label_text text-right">
              Value
            </Form.Text>
          </Col>
          <ColoredLine color="#363a3e" />
          <Col xs={4} className="wishlist_spent">
            <FormControl
              type="number"
              value={3500}
              className="income_item_text wishlist_item_input"
              disabled
            />

            <Form.Text className="text-muted investment_label_text">Spent</Form.Text>
          </Col>
        </Row>
        <Row className="wishlist_category_item">
          <Col xs={2}>
            <FaCar className="car_icon" />
          </Col>
          <Col xs={6}>
            <Form.Label>Car</Form.Label>
            <Form.Text className="text-muted wishlist_label_text">Other</Form.Text>
          </Col>
          <Col xs={{ span: 4 }}>
            <Form.Control
              className="income_item_text text-center wishlist_item_input"
              type="number"
              value={3500}
              disabled
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WishlistCard;
