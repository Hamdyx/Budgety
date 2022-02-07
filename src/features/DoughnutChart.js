import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ labelsArr, data, colors }) => {
	const _state = {
		data: {
			labels: labelsArr,
			datasets: [
				{
					label: 'Bank Account',
					data: data,
					backgroundColor: colors,
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

	return (
		<Doughnut data={_state.data} options={_state.options} width={200} height={200} />
	);
};

export default DoughnutChart;
