import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './BankPage.css';

const BalanceChart = React.lazy(() => import('./BalanceChart'));
const LoanChart = React.lazy(() => import('./LoanChart'));
const AnalyticsChart = React.lazy(() => import('./AnalyticsChart'));

class BankPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <Container id="bank_page">
        <Row>
          <Col md={6}>
            <Container className="bank_section">
              <Row>
                <Col>
                  <h4>Account Stats</h4>
                </Col>
              </Row>
              <Row>
                <Suspense fallback={<div>Loading...</div>}>
                  <BalanceChart />
                </Suspense>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container className="bank_section">
              <Row>
                <Col>
                  <h4>Analytics</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AnalyticsChart />
                  </Suspense>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button active>7 D</Button>
                </Col>
                <Col>
                  <Button>30 D</Button>
                </Col>
                <Col>
                  <Button>3 M</Button>
                </Col>
                <Col>
                  <Button>All</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Container className="bank_section">
              <Row>
                <Col>
                  <h4>Loan</h4>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <LoanChart values={[20000, 24000]} />
                  </Suspense>
                </Col>
                <Col md={6}>
                  <ul id="bank_items" className="text-muted">
                    <li className="red_dot">Due</li>
                    <li className="green_dot">Paid</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={3}>
            <Container className="bank_section">
              <Row>
                <Col>
                  <h4>Credit Card</h4>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <LoanChart values={[5000, 500]} />
                  </Suspense>
                </Col>
                <Col md={6}>
                  <ul id="bank_items" className="text-muted">
                    <li className="red_dot">Limit</li>
                    <li className="green_dot">Balance</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="bank_section">
              <Row>
                <Col>
                  <h4>Recent Activity</h4>
                </Col>
              </Row>
              <Row>
                <ul>
                  <li>activity 1</li>
                  <li>activity 2</li>
                  <li>activity 3</li>
                </ul>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BankPage;
