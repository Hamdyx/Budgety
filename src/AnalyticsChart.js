import React, { Suspense } from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Line } from 'react-chartjs-2';

class AnalyticsChart extends React.Component {
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
export default AnalyticsChart;
