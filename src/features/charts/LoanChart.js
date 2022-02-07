import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoanChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				labels: ['Deposits', 'Loans'],
				datasets: [
					{
						label: 'Bank Account',
						data: props.values,
						backgroundColor: ['#FE5E54', '#21bf73'],
						hoverOffset: 4,
						radius: '85%',
						cutout: '65%',
					},
				],
			},
			options: {
				borderWidth: 0,
				indexAxis: 'y',
				maintainAspectRatio: false,

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
				width={100}
				height={100}
				options={this.state.options}
			/>
		);
	}
}
export default LoanChart;
