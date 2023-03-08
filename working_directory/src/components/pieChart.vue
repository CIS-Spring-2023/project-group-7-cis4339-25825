<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    props: {
        label: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    mounted() {
      const ctx = document.getElementById('myChart').getContext('2d')
      const backgroundColor = this.chartData.map(() => this.getColor())
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      )
      this.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: this.label,
            datasets: [
            {
                borderWidth: 1,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                data: this.chartData
            }
            ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Clients by Zip Code',
            },
            legend: {
              display: false,
            },
          },
        },
      });
    },
    methods: {
        getColor() {
        let channel = () => Math.random() * 255
        return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
        }
  },
    watch: {
    // watch for changes to the data and update the chart
    chartData: {
      handler(newData) {
        this.myChart.data = newData;
        this.myChart.update();
      },
      deep: true
    }
  }
  };
  </script>
  