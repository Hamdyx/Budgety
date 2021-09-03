import React from 'react';
/* import ReactDom from 'react-dom'; */
import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './App.css'; */

/* import { AiOutlineDollar } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri'; */
import { GiCash } from 'react-icons/gi';
import InvestmentModal from './InvestmentModal';
import './InvestmentCard.css';
import '../App.css';

class InvestmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    /* console.log('card');
    console.log(this.wrapperRef); */
  }
  render() {
    return (
      <Container className="main_box">
        <Row className="box_title_row">
          <Col xs={9}>
            <h5 className="box_title text-left">Investment</h5>
          </Col>
          <Col xs={3} className="card_add_col">
            {/* <a href="#" className="h1 card_add text-right">
              +
            </a> */}
            <InvestmentModal wrapperRef={this.wrapperRef} />
          </Col>
        </Row>

        <Row className="investment_category_item">
          {/* <Form.Group controlId="category_transaction_form"></Form.Group> */}
          <Col xs={2}>
            <GiCash className="investment_worth_icon" />
          </Col>
          <Col xs={5} className="investment_market_value">
            <InputGroup>
              <FormControl
                type="number"
                value={3500}
                className="income_item_text investment_item_input"
                disabled
              />
            </InputGroup>
            <Form.Text className="text-muted investment_label_text">
              Market Value
            </Form.Text>
          </Col>

          <Col xs={5} className="investment_cash_balance">
            <InputGroup>
              <FormControl
                type="number"
                value={3500}
                className="income_item_text investment_item_input"
                disabled
              />
            </InputGroup>
            <Form.Text className="text-muted investment_label_text">
              Cash Balance
            </Form.Text>
          </Col>
        </Row>

        <Row className="investment_category_item">
          <Col xs={5} className="investment_btn_col">
            <a href="#" className="h6 investment_box_btn">
              Portfolio
            </a>
          </Col>
          <Col xs={{ span: 5, offset: 2 }} className="investment_btn_col text-right">
            <a href="#" className="h6 investment_box_btn">
              Transactions
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InvestmentCard;
