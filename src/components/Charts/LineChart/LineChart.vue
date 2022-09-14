<script setup lang="ts">
import { use, graphic } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  AxisPointerComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, defineProps, withDefaults } from "vue";

use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  AxisPointerComponent,
]);

type XData = [
  Sun: "Sun" | "sun" | number,
  Mon: "Mon" | "mon" | number,
  Tue: "Tue" | "tue" | number,
  Wed: "Wed" | "wed" | number,
  Thu: "Thu" | "thu" | number,
  Fri: "Fri" | "fri" | number,
  Sat: "Sat" | "sat" | number
];

interface Props {
  taiwanData: number[];
  hongkongData: number[];
  macauData: number[];
  isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const option = ref({
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["台灣", "香港", "澳門"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as XData,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "台灣",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(128, 255, 165)",
          },
          {
            offset: 1,
            color: "rgb(1, 191, 236)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: props.taiwanData,
    },
    {
      name: "香港",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0, 221, 255)",
          },
          {
            offset: 1,
            color: "rgb(77, 119, 255)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: props.hongkongData,
    },
    {
      name: "澳門",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(55, 162, 255)",
          },
          {
            offset: 1,
            color: "rgb(116, 21, 219)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: props.macauData,
    },
  ],
});
</script>

<template>
  <VChart
    class="w-full h-[400px]"
    :option="option"
    autoresize
    :loading="props.isLoading" />
</template>
