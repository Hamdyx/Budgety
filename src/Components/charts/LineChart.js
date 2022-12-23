import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Line } from 'react-chartjs-2';

const LineChart = ({ labelsArr, data, colors, width = 250, height = 100 }) => {
	const state = {
		data: {
			labels: labelsArr,
			backgroundColor: '#0a533d',
			datasets: [
				{
					label: 'Worth',
					data: data,
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

	// return <Line data={state.data} options={state.options} width={width} height={height} />;
};
export default LineChart;
