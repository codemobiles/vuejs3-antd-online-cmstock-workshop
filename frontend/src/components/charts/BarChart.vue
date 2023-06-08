<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
<script lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { defineComponent, reactive } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  setup() {
    const chartData = reactive({
      labels: ['January', 'February', 'March'],
      datasets: [{ data: [40, 20, 12] }]
    })
    const chartOptions = reactive({
      responsive: true
    })
    return {
      chartData,
      chartOptions
    }
  }
})
</script>
