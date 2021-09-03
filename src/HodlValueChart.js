import React from 'react';
import { Line } from 'react-chartjs-2';

function HodlValueChart(props) {
  const labels = props.values.map((i, k) => 'action' + k);
  /* const labels = ['January', 'February', 'March']; */
  const holdValues = props.values.map((e) => e.TVL.slice(1));
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Value Locked',
        data: holdValues,
        fill: false,
        borderColor: 'rgba(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  /* console.log(props.tvlValues);
  console.log(labels);
  console.log(tvlValues); */
  return <Line data={data} />;
}

export default HodlValueChart;
