import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BankPage.css';

class BankChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Balance', 'Debt'],
        datasets: [
          {
            label: 'Bank Account',
            data: [5, 25],
            backgroundColor: ['#21bf73', '#FE5E54'],
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
    return <Bar data={this.state.data} options={this.state.options} />;
  }
}
export default BankChart;
