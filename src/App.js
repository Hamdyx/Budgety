import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* import Route from 'react'; */
/* import ReactDom from 'react-dom'; */
import { Container, Row, Col } from 'react-bootstrap';
/* import Calendar from 'react-calendar'; */
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Components/Sidebar';
/* import Overview from './Overview'; */
import BankCard from './BankCard';
import WishlistCard from './WishlistCard';
import TransactionsCard from './Components/TransactionsCard';
import Savings from './Components/Savings';
import ReportsCard from './Components/ReportsCard';
import Budget from './Components/Budget';
import InvestmentCard from './Components/InvestmentCard';
import Overview from './Overview';
import InvestmentPage from './InvestmentPage';
import BankPage from './BankPage';
import {BudgetMain} from './features/budget/BudgetMain';

import { BiSearch } from 'react-icons/bi';

import 'react-calendar/dist/Calendar.css';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: <Overview />,
    };
    this.overview = () => <Overview />;
    this.investment = () => <InvestmentPage />;

    this.searchIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    );
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange() {
    var curr = this.state.currentPage;
    console.log(curr);
    console.log(curr.type.name);
    curr = curr.type.name == 'Overview' ? <InvestmentPage /> : curr;
    this.setState({ currentPage: curr });
  }

  render() {
    return (
      <Container fluid id="overview_container">
        <Row id="page_container">
          <Router>
            <Col xs={12} lg={2} id="sidebar_box">
              <Sidebar changePage={this.handlePageChange} />
            </Col>
            <Col id="main_content">
              <Switch>
                <Route path="/" exact component={Overview} />
                <Route path="/budget" exact component={BudgetMain} />
                <Route path="/investment" component={InvestmentPage} />
                <Route path="/bank" component={BankPage} />
              </Switch>
            </Col>
          </Router>
        </Row>
      </Container>
    );
  }
}

export default App;
