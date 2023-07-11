<template>
  <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
    <template #title>
      <span class="tw-font-bold tw-text-[0.8rem]"> Profit this day </span>
      <span class="tw-font-bold tw-text-[1.5rem] tw-block">
        {{ filters.currency(1999) }}
      </span>
    </template>
    <BarChart
      v-bind:="barChartProps"
      :options="options"
      class="tw-h-full md:tw-max-h-[200px]"
    />
  </a-card>
</template>

<script lang="ts" setup>
import { Chart, registerables } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
import filters from "@/services/filters";

Chart.register(...registerables);

const props = defineProps({
  data: Array,
});
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Monthly",
    },
  },
};

const chartData = {
  labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  datasets: [
    {
      data: props.data as any,
      backgroundColor: [
        "#EF476F",
        "#FFD166",
        "#7A306C",
        "#8E8DBE",
        "#A9E4EF",
        "#81F495",
        "#96F550",
      ],
    },
  ],
};

const { barChartProps, barChartRef } = useBarChart({
  chartData,
});
</script>
