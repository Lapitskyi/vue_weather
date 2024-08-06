<script>

import Chart from 'chart.js/auto';

export default {
  name: "Chart",
  props:{
    days:[],
    labels:[]
  },

  mounted() {
    const ctx = document.getElementById('myChart');

     new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          enabled: false,
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
</script>


<template>

  <div>
    <canvas id="myChart"></canvas>
  </div>

</template>
