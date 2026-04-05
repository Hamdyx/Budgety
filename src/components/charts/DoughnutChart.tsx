import type { ChartProps } from '@/types/types';

// import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ labelsArr, data, colors, width = 100, height = 100 }: ChartProps) => {
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

  // return (
  // 	// <Doughnut data={_state.data} options={_state.options} width={width} height={height} />
  // );
  void _state;
  void width;
  void height;
  return null;
};

export default DoughnutChart;
