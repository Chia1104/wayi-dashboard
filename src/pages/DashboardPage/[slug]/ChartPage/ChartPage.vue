<script setup lang="ts">
import { PieChart, LineChart } from "@wanin/components/Charts";
import { StatusCard } from "@wanin/components";
import { NH2, useMessage, NSpin } from "naive-ui";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import { refreshToken } from "@wanin/helpers/firebase/auth/services";
import { type RootState } from "@wanin/store";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore<RootState>();
const chart = computed(() => store.state.chart);
const message = useMessage();
onMounted(() => {
  refreshToken().then((token) => {
    store.dispatch("getCountGroupByRegionAndWeekAction", {
      token,
      activitySlug: route.params.slug,
    });
    store.dispatch("getTotalCountGroupByRegionAction", {
      token,
      activitySlug: route.params.slug,
    });
  });
});
if (chart.value.pieChart.isError) message.error(chart.value.pieChart.error);
if (chart.value.weekChart.isError) message.error(chart.value.weekChart.error);
</script>

<template>
  <div>
    <NH2>註冊人數</NH2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-10 p-5">
      <NSpin :show="chart.pieChart.isLoading">
        <StatusCard title="地區分布" class="h-[500px]">
          <PieChart
            v-if="chart.pieChart.isSuccess"
            :is-loading="chart.pieChart.isLoading"
            title="地區分布"
            :data="[
              {
                name: '台灣',
                value:
                  (chart.pieChart.data?.data &&
                    chart.pieChart.data?.data[2].count) ||
                  0,
              },
              {
                name: '香港',
                value:
                  (chart.pieChart.data?.data &&
                    chart.pieChart.data?.data[0].count) ||
                  0,
              },
              {
                name: '澳門',
                value:
                  (chart.pieChart.data?.data &&
                    chart.pieChart.data?.data[1].count) ||
                  0,
              },
            ]" />
        </StatusCard>
      </NSpin>
      <NSpin :show="chart.weekChart.isLoading">
        <StatusCard title="本週人數" class="h-[500px]">
          <LineChart
            v-if="chart.weekChart.isSuccess"
            :is-loading="chart.weekChart.isLoading"
            :taiwan-data="[
              parseInt(chart.weekChart.data?.data?.taiwan[0]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[1]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[2]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[3]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[4]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[5]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.taiwan[6]?.count || '0'),
            ]"
            :hongkong-data="[
              parseInt(chart.weekChart.data?.data?.hongkong[0]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[1]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[2]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[3]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[4]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[5]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.hongkong[6]?.count || '0'),
            ]"
            :macau-data="[
              parseInt(chart.weekChart.data?.data?.macau[0]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[1]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[2]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[3]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[4]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[5]?.count || '0'),
              parseInt(chart.weekChart.data?.data?.macau[6]?.count || '0'),
            ]" />
        </StatusCard>
      </NSpin>
    </div>
  </div>
</template>
