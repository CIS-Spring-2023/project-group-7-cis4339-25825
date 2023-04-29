<template>
  <div class="overflow-hidden">
    <!--the bar chart is created here-->
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>

<script>
// Import chart functionality from chart.js
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  // Variables accepted from parent components "HomeView.vue"
  props: {
    // labels are the events
    label: {
      type: Array
    },
    // chartData is the number of attendees for each event
    chartData: {
      type: Array
    },
  },
  // called when component is mounted in the DOM
  async mounted() {    
    // create an array that maps over each element in chartData and calls the getColor() function for each element, which assigns a random color for each element
    const backgroundColor = this.chartData.map(() => this.getColor())
    // create an array that maps over each color in backgroundColor array and replaces the alpha value (transparency of border) to "1" - fully opaque
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    // create a new chart, and apply the chart to <canvas> element in <template>
    await new Chart(this.$refs.attendanceChart, {     
      // chart will be a vertical bar chart 
      type: 'bar',
      // data for the chart
      data: {
        // labels array passed from "HomeView.vue" will be shown as labels for the chart
        labels: this.label,
        // chartData array passed from "HomeView.vue" will be shown as the bars on the chart
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: this.chartData
          }
        ]
      },
      // configuration options for the chart
      options: {
        scales: {
          // y-axis will increment by 1 step 
          y: {
            ticks: {
              stepSize: 1
            }
          },
          // x-axis won't display grid lines
          x: {
            gridLines: {
              display: false
            }
          }
        },
        plugins: {
          // hide the chart legend
          legend: {
            display: false
          }
        },
        //resize the chart to fit the container element
        responsive: true,
        // maintains aspect ratio of chart when resized
        maintainAspectRatio: true,
      }
    })
  },
  methods: {
    // method called when backgroundColor variable is created -> each element in chartData array gets assigned a random color for the chart
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
