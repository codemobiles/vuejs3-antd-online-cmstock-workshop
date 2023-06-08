<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24" :md="16">
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <LineChart :data="lineData" class="tw-h-full" />
        </a-col>
        <a-col :span="24">
          <a-button type="primary" @click="shuffleData"> Shuffle </a-button>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24" :md="8" class="tw-h-full">
      <a-row align="space-between" justify="center" class="tw-h-full" :gutter="[20, 20]">
        <a-col :span="24">
          <PieChart :data="pieData" class=" tw-h-full md:tw-max-h-[45vh] tw-overflow-auto"
        /></a-col>
        <a-col :span="24">
          <BarChart :data="barData" class="tw-h-full md:tw-max-h-[45vh] tw-overflow-auto"
        /></a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
export default defineComponent({
  components: { BarChart, LineChart, PieChart },
  setup() {
    const lineData = ref([30, 40, 60, 70, 5, 35, 12, 75, 42, 33, 10, 2])
    const barData = ref([30, 40, 60, 70, 5, 10, 10])
    const pieData = ref([30, 40, 60])
    const shuffleData = () => {
      let array = ref([lineData, barData, pieData])
      for (let [index, dataset] of array.value.entries()) {
        let tempDataset = dataset.value

        for (let i = tempDataset.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[tempDataset[i], tempDataset[j]] = [tempDataset[j], tempDataset[i]]
        }
        array.value[index].value = tempDataset
      }
    }
    return {
      shuffleData,
      lineData,
      barData,
      pieData
    }
  }
})
</script>
