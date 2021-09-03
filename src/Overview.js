import React from 'react';
import ReactDom from 'react-dom';
import { Container, Row, Col, Button, Form, Card, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Overview.css';
import BankCard from './BankCard';
import WishlistCard from './WishlistCard';
import TransactionsCard from './Components/TransactionsCard';
import Savings from './Components/Savings';
import ReportsCard from './Components/ReportsCard';
import Budget from './Components/Budget';
import InvestmentCard from './Components/InvestmentCard';
import SchedulerCard from './Components/SchedulerCard';
import { BiSearch } from 'react-icons/bi';
import Calendar from 'react-calendar';
import '../node_modules/react-calendar/dist/Calendar.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container id="overview_container">
        <Row id="main_header">
          <Col xs={6} className="text-left">
            <h4 className="overview_main_title">Overview</h4>
          </Col>
          <Col
            className="text-right"
            md={{ offset: 4, span: 1 }}
            xs={{ span: 2, offset: 2 }}
          >
            <a href="#" className="overview_search" role="button">
              {/* {this.searchIcon} */}
              <BiSearch className="search_icon" />
            </a>
          </Col>
          <Col xs={2} md={{ offset: 0, span: 1 }} className="text-right">
            <a href="#" className="overview_add" role="button">
              +
            </a>
          </Col>
        </Row>

        {/* <Col xs={4}>
          <Calendar />
        </Col> */}

        <Row>
          <Col md={4} id="transactions_box">
            <TransactionsCard />
          </Col>
          <Col md={4} id="reports_box">
            <ReportsCard />
          </Col>
          <Col md={4} id="scheduler_box">
            <SchedulerCard className="container main_box" />
          </Col>
        </Row>
        <Container fluid>
          <Row>
            <Col md={8} id="overview_left">
              <Container fluid id="left_boxes_container">
                <Row>
                  <Col md={6} id="savings_box">
                    <Savings />
                  </Col>
                  <Col md={6} id="bank_box">
                    <BankCard />
                  </Col>
                  {/* <Col md={4}>
                  <Budget />
                </Col> */}
                </Row>
                <Row>
                  <Col md={6}>
                    <InvestmentCard />
                  </Col>
                  <Col md={6} id="wishlist_box">
                    <WishlistCard />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={4} id="overview_right">
              <Container id="height_test" fluid>
                <Row id="height_test_2">
                  <Col id="budget_box">
                    <Budget />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Overview;
