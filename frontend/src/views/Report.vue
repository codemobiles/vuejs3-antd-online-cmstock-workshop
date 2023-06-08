<template>
  <a-row>
    <a-col :span="24">
      <BarChart />
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'
export default defineComponent({
  components: { BarChart }
})
</script>
