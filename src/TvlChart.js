import React from 'react';
import { Line } from 'react-chartjs-2';

function TvlChart(props) {
  /* const labels = props.tvlValues.map((i, k) => 'action' + k); */
  const labels = props.tvlValues.map((i, k) => {
    console.log(i.Day);
    return `${i.Day}  ${i.Month}`;
  });
  /* const labels = ['January', 'February', 'March']; */
  const tvlValues = props.tvlValues.map((e) => e.TVL.slice(1));
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Value Locked',
        data: tvlValues,
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

export default TvlChart;
