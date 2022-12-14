<script setup lang="ts">
import { ActivityCard } from "@wanin/components";
import { NH1, NPopover, NH3, NInput, NDatePicker, useMessage } from "naive-ui";
import cloud from "@wanin/assets/cloud.svg";
import background from "@wanin/assets/background.svg";
import { VERSION } from "@wanin/shared/constant";
import { computed, ref, onBeforeUnmount, reactive } from "vue";
import { createNewActivity } from "@wanin/helpers/api";
import { refreshToken } from "@wanin/helpers/firebase/auth/services";
import { ActivityCardLoader, ActivityModal } from "@wanin/components";
import { AddIcon } from "@wanin/components/Icons";
import { useStore } from "vuex";
import { RootState } from "@wanin/store";
import { getMediumDateTime, getToday } from "@wanin/utils/day.util";
import { z } from "zod";
import { SlugSchema } from "@wanin/shared/schemas";
import { useSubscription } from "@vue/apollo-composable";
import { SUSCRIP_ALL_ACTIVITIES } from "@wanin/helpers/GraphQL/subscriptions";
import { Activity } from "@wanin/shared/types";
import { useStorage } from "@vueuse/core";

interface SuscripActivity {
  activity: Activity[];
}

const activities = ref<any>([]);
const store = useStore<RootState>();
const message = useMessage();
const nameModel = ref("");
const slugModel = ref("");
const endDateModel = ref(getMediumDateTime(getToday()));
const NameSchema = z.string().min(1).max(20);
const EndDateSchema = z.date().min(new Date());
const slugPath = useStorage<Activity[] | any[]>("slugPath", [{ foo: "bar" }]);
const localState = reactive({
  isLoading: false,
});

const {
  loading: loadingActivities,
  onResult: onActivitiesResult,
  onError: onActivitiesError,
  restart: restartActivities,
  stop: stopActivities,
} = useSubscription<SuscripActivity>(SUSCRIP_ALL_ACTIVITIES, null, () => ({
  fetchPolicy: "no-cache",
}));

onActivitiesResult((result) => {
  activities.value = result?.data?.activity;
  slugPath.value = result?.data?.activity;
});

const activeAddActivityModal = () =>
  store.dispatch("activeAddActivityModalAction");
const addActivityModalVisible = computed(
  () => store.state.modal.addActivityModal.isOpen
);

const addActivity = async () => {
  if (!NameSchema.safeParse(nameModel.value).success) {
    message.warning("????????????????????????");
    return;
  }
  if (!SlugSchema.safeParse(slugModel.value).success) {
    message.warning("?????????????????? Schema, ??????: example_activity");
    return;
  }
  if (!EndDateSchema.safeParse(new Date(endDateModel.value)).success) {
    message.warning("??????????????????????????????");
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
      message.success("????????????");
      await store.dispatch("activeAddActivityModalAction");
    } else message.warning("????????????");
    localState.isLoading = false;
  } catch (error) {
    message.error("????????????");
    localState.isLoading = false;
  }
};

onActivitiesError(() => {
  message.error("Connection error");
  restartActivities();
});

onBeforeUnmount(() => {
  stopActivities();
});
</script>

<template>
  <div class="w-main w-container">
    <img
      :src="background"
      alt="background"
      class="w-full fixed top-0 left-0 -z-50" />
    <div class="flex justify-center items-center mb-10 self-start">
      <img :src="cloud" alt="cloud" class="w-14 h-14 mr-5" />
      <NH1>????????????</NH1>
      <NPopover trigger="hover" placement="bottom">
        <template #trigger>
          <button
            class="p-1 rounded-full hover:bg-primary hover:text-white transition ease-in-out ml-5 text-gray-500"
            @click="activeAddActivityModal">
            <AddIcon class="w-6 h-6" />
          </button>
        </template>
        ????????????
      </NPopover>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      <ActivityCardLoader v-if="loadingActivities" />
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="(activity as any)" />
    </div>
    <ActivityModal
      :is-loading="localState.isLoading"
      title="????????????"
      positive-text="??????"
      :active-confirm="addActivity"
      :active-modal="activeAddActivityModal"
      :is-open="addActivityModalVisible">
      <NH3 class="mb-2"> ???????????? </NH3>
      <NInput
        v-model:value="nameModel"
        type="text"
        placeholder="?????????????????????" />
      <NH3 class="mb-2"> DB Schema </NH3>
      <NInput
        v-model:value="slugModel"
        type="text"
        placeholder="example_activity" />
      <NH3 class="mb-2"> ???????????? </NH3>
      <NDatePicker
        v-model:formatted-value="endDateModel"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        clearable />
    </ActivityModal>
  </div>
  <footer class="w-footer">
    <span>?? {{ new Date().getFullYear() }} Wanin - v{{ VERSION }}</span>
  </footer>
</template>
