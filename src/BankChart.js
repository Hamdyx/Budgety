import React, { Suspense } from 'react';
/* import Utils from 'util';
import ReactDom from 'react-dom'; */
import { Container, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BankCard.css';

class BankChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Deposits', 'Loans', 'Credit Card'],
        datasets: [
          {
            label: 'Bank Account',
            data: [5, 25, 10],
            backgroundColor: ['#21bf73', '#FE5E54', '#F7C025'],
            hoverOffset: 4,
            radius: '85%',
            cutout: '65%',
          },
        ],
      },
      options: {
        borderWidth: 0,
        indexAxis: 'y',

        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,

            labels: {
              color: '#2a9a67',
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <Doughnut
        data={this.state.data}
        options={this.state.options}
        width={20}
        height={10}
      />
    );
  }
}
export default BankChart;
