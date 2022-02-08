import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

const BarChart = ({ labelsArr, data, colors, width = 100, height = 100 }) => {
	let state = {
		data: {
			labels: labelsArr,
			datasets: [
				{
					label: 'Bank Account',
					data: data,
					backgroundColor: colors,
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

	return <Bar data={state.data} options={state.options} />;
};
export default BarChart;
