<template>
    <div>
      <canvas id="dash-pie-chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js'
  import ChartData from '../assets/ChartData.js'
  Chart.register(...registerables);
  export default {
    name: 'DataChart',
    data() {
      return {
        ChartData: ChartData
      }
    },
    mounted() {
      const ctx = document.getElementById('dash-pie-chart');
      new Chart(ctx, this.ChartData);
    }
  }
  </script>
  
