<script setup lang="ts">
import {
  StatusCard,
  ActivityList,
  ActivityModal,
  ActivityItem,
} from "@wanin/components";
import { LineChart } from "@wanin/components/Charts";
import {
  NH3,
  NH2,
  useMessage,
  NSpin,
  NCalendar,
  NPopover,
  NInput,
  NDatePicker,
} from "naive-ui";
import { useStore } from "vuex";
import { onMounted, computed, ref, reactive } from "vue";
import { refreshToken } from "@wanin/helpers/firebase/auth/services";
import { type RootState } from "@wanin/store";
import { AddIcon } from "@wanin/components/Icons";
import { createNewActivity } from "@wanin/helpers/api";
import { getToday, getMediumDateTime } from "@wanin/utils/day.util";
import { z } from "zod";
import { useRoute } from "vue-router";
import { SlugSchema } from "@wanin/shared/schemas";

const route = useRoute();
const store = useStore<RootState>();
const chart = computed(() => store.state.chart);
const realCount = computed(() => store.state.data.realCount);
const fakeCount = computed(() => store.state.data.fakeCount);
const activities = computed(() => store.state.data.activities);
const addActivityModalVisible = computed(
  () => store.state.modal.addActivityModal.isOpen
);
const message = useMessage();
const nameModel = ref("");
const slugModel = ref("");
const endDateModel = ref(getMediumDateTime(getToday()));
const NameSchema = z.string().min(1).max(20);
const EndDateSchema = z.date().min(new Date());
const localState = reactive({
  isLoading: false,
});

onMounted(() => {
  refreshToken().then((token) => {
    store.dispatch("getCountGroupByRegionAndWeekAction", {
      token,
      activitySlug: route.params.slug,
    });
  });
});
if (chart.value.weekChart.isError) message.error(chart.value.weekChart.error);
const activeAddActivityModal = () =>
  store.dispatch("activeAddActivityModalAction");
const addActivity = async () => {
  if (!NameSchema.safeParse(nameModel.value).success) {
    message.warning("活動名稱不能為空");
    return;
  }
  if (!SlugSchema.safeParse(slugModel.value).success) {
    message.warning("請輸入有效的 Schema, 例如: example_activity");
    return;
  }
  if (!EndDateSchema.safeParse(new Date(endDateModel.value)).success) {
    message.warning("請選擇有效的結束日期");
    return;
  }
  try {
    localState.isLoading = true;
    const token = await refreshToken();
    const response = await createNewActivity(token, {
      name: nameModel.value,
      slug: slugModel.value,
      end_date: new Date(endDateModel.value),
    });
    if (response.data.status === "Success") {
      message.success("新增成功");
      await store.dispatch("activeAddActivityModalAction");
    } else message.warning("新增失敗");
    localState.isLoading = false;
  } catch (error) {
    message.error("新增失敗");
    localState.isLoading = false;
  }
};
const foo = {
  id: "1",
  name: "bar",
  slug: "bar",
  end_date: new Date(),
};
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 p-5 gap-y-20">
    <StatusCard title="註冊人數" class="lg:col-span-2 2xl:col-span-1">
      <div
        class="w-full h-full flex flex-col justify-center items-center gap-10">
        <div class="w-full flex flex-col justify-center items-center">
          <NH2 class="text-2xl w-text-bg-sec-half">實際人數</NH2>
          <NH3 class="text-4xl">
            {{ realCount || 0 }}
          </NH3>
        </div>
        <div class="w-full flex flex-col justify-center items-center">
          <NH2 class="text-2xl w-text-bg-sec-half">調整人數</NH2>
          <NH3 class="text-4xl">
            {{ fakeCount + realCount || 0 }}
          </NH3>
        </div>
      </div>
    </StatusCard>
    <NSpin :show="chart.weekChart.isLoading" class="lg:col-span-2">
      <StatusCard title="本週人數" class="h-[500px]">
        <LineChart
          v-if="chart.weekChart.isSuccess"
          :x-data="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
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
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 gap-y-20 mt-10">
    <StatusCard title="活動" class="col-span-2 xl:col-span-1">
      <NPopover trigger="hover" placement="bottom">
        <template #trigger>
          <button
            class="p-1 rounded-full hover:bg-primary hover:text-white transition ease-in-out absolute right-0 mr-5 text-gray-500"
            @click="activeAddActivityModal">
            <AddIcon class="w-6 h-6" />
          </button>
        </template>
        新增活動
      </NPopover>
      <div class="h-10" />
      <ActivityItem
        v-if="activities.length !== 0"
        :activity="
          activities.find((a) => a.slug === route.params.slug) || foo
        " />
      <NH3 class="pt-5 mt-5 m-0 text-gray-500"> 更多活動 : </NH3>
      <ActivityList :activities="activities" />
    </StatusCard>
    <StatusCard title="結束日期" class="p-10 pb-0 col-span-2 xl:col-span-1">
      <NCalendar class="h-[450px]" #="{ year, month, date }">
        <p class="text-gray-500 text-xs line-clamp-2">
          {{
            activities.find(
              (activity) =>
                new Date(activity.end_date).getFullYear() === year &&
                new Date(activity.end_date).getMonth() + 1 === month &&
                new Date(activity.end_date).getDate() === date
            )?.name
          }}
        </p>
      </NCalendar>
    </StatusCard>
  </div>
  <ActivityModal
    :is-loading="localState.isLoading"
    title="新增活動"
    positive-text="新增"
    :active-confirm="addActivity"
    :active-modal="activeAddActivityModal"
    :is-open="addActivityModalVisible">
    <NH3 class="mb-2"> 活動名稱 </NH3>
    <NInput
      v-model:value="nameModel"
      type="text"
      placeholder="請輸入活動名稱" />
    <NH3 class="mb-2"> DB Schema </NH3>
    <NInput
      v-model:value="slugModel"
      type="text"
      placeholder="example_activity" />
    <NH3 class="mb-2"> 結束日期 </NH3>
    <NDatePicker
      v-model:formatted-value="endDateModel"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      clearable />
  </ActivityModal>
</template>
