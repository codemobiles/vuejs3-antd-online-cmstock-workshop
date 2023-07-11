<template>
  <a-row>
    <a-col :span="24">
      <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
        <template #title>
          <span class="tw-font-bold tw-text-[1.5rem]"> Overview </span>
        </template>
        <LineChart ref="lineRef" :chartData="testData" :options="options" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  data: Array,
});

const lineRef = ref();
const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Overview",
    },
  },
});

const testData = {
  labels: [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: props.data as any,
      backgroundColor: [
        "#7A306C",
        "#8E8DBE",
        "#A9E4EF",
        "#81F495",
        "#96F550",
        "#EF476F",
        "#FFD166",
        "#06D6A0",
        "#118AB2",
        "#073B4C",
        "#0B132B",
        "#96F550",
      ],
    },
  ],
};
</script>
