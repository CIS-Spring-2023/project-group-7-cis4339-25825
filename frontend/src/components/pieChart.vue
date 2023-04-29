<template>
  <div class="overflow-hidden">
    <!--the pie chart is created here-->
    <canvas id="myPieChart" class="p-10"></canvas>
  </div>
  </template>
  
  <script>
  //import chart functionality 
  import { Chart } from 'chart.js';
  
  export default {
    //accept variables from parent component "HomeView.vue"
    props: {
      // variable passed down to store the labels (the zip codes) of the pie chart
        label: {
            type: Array
        },
        //variable passed down to store the number of clients for each zip code for the pie chart
        chartData: {
            type: Array
        }
    },
    // lifecycle hook that fires when this component is mounted
    mounted() {
      // create a variable that gets the canvas element where the pie chart will be rendered and make it 2-dimensional
      const ctx = document.getElementById('myPieChart').getContext('2d')
      // create an array that maps over each element in chartData and calls the getColor() function for each element, which assigns a random color for each element
      const backgroundColor = this.chartData.map(() => this.getColor())
      // create an array that maps over each color in backgroundColor array and replaces the alpha value (transparency of border) to "1" - fully opaque
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      )
      // create the pie chart
      this.myChart = new Chart(ctx, {
        // type of chart = pie
        type: 'pie',
        //data for the chart
        data: {
          // pie chart labels will be the zip codes that were passed down from "HomeView.vue" to this component
            labels: this.label,
            // pie chart data will be the number of clients for each zip code, which was passed down from "HomeView.vue" to this component
            datasets: [
            {
                borderWidth: 1,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                data: this.chartData
            }
            ]
        },
        // configuration options for the pie chart
        options: {
          //resize the chart to fit the container element
          responsive: true,
          plugins: {
            // display a title for the pie chart
            title: {
              display: false,
            },
            // do not show a legend for the pie chart
            legend: {
              display: false,
            },
          },
        },
      });
    },
    methods: {
      // method called when backgroundColor variable is created -> each element in chartData array gets assigned a random color for the chart
        getColor() {
        let channel = () => Math.random() * 255
        return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
        }
  },
    watch: {
    // watch for changes to the data and update the chart -> so if new clients are added, existing clients are deleted, or zip codes are updated, this chart will update
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
  