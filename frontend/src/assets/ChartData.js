export const ChartData = {
    type: "pie",
    data: {
      labels: [
        '77373',
        '77019',
        '77002',
        '77057'
      ],
      datasets: [{
        label: 'Registrants per Zip Code',
        data: [20, 48, 36, 39],
        backgroundColor: [
          'rgb(40, 40, 40)',
          'rgb(90, 40, 40)',
          'rgb(140, 40, 40)',
          'rgb(190, 40, 40)'
        ],
        hoverOffset: 2
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Registrants per Zip Code'
        }
      }
    }
  };

  export default ChartData;
