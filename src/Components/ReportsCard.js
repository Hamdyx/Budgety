import React, { Suspense } from 'react';
/* import Utils from 'util';
import ReactDom from 'react-dom'; */
import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './App.css'; */

import { AiOutlineDollar } from 'react-icons/ai';
/* import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri'; */
import { GiCash } from 'react-icons/gi';

import { Line } from 'react-chartjs-2';

import './ReportsCard.css';

class ReportsCard extends React.Component {
  render() {
    return (
      <Container className="main_box">
        <Row className="box_title_row">
          <Col xs={9}>
            <h5 className="box_title text-left">Reports</h5>
          </Col>
          <Col xs={3} className="card_add_col">
            <a href="#" className="h1 card_add text-right">
              +
            </a>
          </Col>
        </Row>
        <Row className="reports_category_item">
          {/* <Form.Group controlId="category_transaction_form"></Form.Group> */}
          <Col xs={2}>
            <GiCash className="reports_worth_icon" />
          </Col>
          <Col xs={4}>
            <InputGroup>
              <FormControl
                type="number"
                defaultValue={3500}
                className="reports_input_item"
              />
            </InputGroup>
            <Form.Text className="text-muted reports_label_text">Worth</Form.Text>
          </Col>

          <Col xs={2}>
            <AiOutlineDollar className="spent_icon" />
          </Col>
          <Col xs={4}>
            <InputGroup>
              <FormControl
                type="number"
                defaultValue={3500}
                className="reports_input_item"
              />
            </InputGroup>
            <Form.Text className="text-muted reports_label_text">Spent</Form.Text>
          </Col>
        </Row>
        <Row className="reports_category_item">
          <Col xs={2}>
            <AiOutlineDollar className="earn_icon" />
          </Col>
          <Col xs={4}>
            <InputGroup>
              <FormControl
                type="number"
                defaultValue={3500}
                className="reports_input_item"
              />
            </InputGroup>
            <Form.Text className="text-muted reports_label_text">Earn</Form.Text>
          </Col>
        </Row>
        <Row className="reports_category_item">
          <Col className="reports_chart_col">
            <ReportsChart />
          </Col>
        </Row>
      </Container>
    );
  }
}

class ReportsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'june', 'Jul'],
        backgroundColor: '#0a533d',
        datasets: [
          {
            label: 'Worth',
            data: [100, 150, 200, 300, 325, 250, 350],
            fill: true,
            backgroundColor: '#0a533d',

            borderColor: '#2a9a67',
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: false,
            text: 'test',
          },
          legend: {
            display: false,
            labels: {
              color: '#2a9a67',
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      },
    };
  }

  render() {
    return (
      <Line
        data={this.state.data}
        options={this.state.options}
        height={100}
        width={250}
      />
    );
  }
}

export default ReportsCard;
