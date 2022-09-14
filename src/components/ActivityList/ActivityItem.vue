<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import type { Activity } from "@wanin/shared/types";
import { NH3, NH2, useMessage, NInput, NDatePicker, NPopover } from "naive-ui";
import { getMediumDateTime, getShortDate } from "@wanin/utils/day.util";
import { EditIcon } from "@wanin/components/Icons";
import { ActivityModal } from "@wanin/components";
import { z } from "zod";
import { refreshToken } from "@wanin/helpers/firebase/auth/services";
import { updateActivity } from "@wanin/helpers/api";

interface Props {
  activity: Activity;
}
const NameSchema = z.string().min(1).max(20).optional();
const EndDateSchema = z.date().optional();
const message = useMessage();
const props = defineProps<Props>();
const localState = reactive({
  isOpen: false,
  isLoading: false,
});
const nameModel = ref(props.activity.name);
const endDateModel = ref(getMediumDateTime(props.activity.end_date));
const activeModal = () => (localState.isOpen = !localState.isOpen);
const activeConfirm = async () => {
  if (!NameSchema.safeParse(nameModel.value).success) {
    message.warning("請輸入有效的名稱");
    return;
  }
  if (!EndDateSchema.safeParse(new Date(endDateModel.value)).success) {
    message.warning("請選擇有效的結束日期");
    return;
  }
  try {
    localState.isLoading = true;
    const token = await refreshToken();
    const response = await updateActivity(token, props.activity.id as number, {
      name: nameModel.value,
      end_date: new Date(endDateModel.value),
    });
    if (response.data.status === "Success") {
      message.success("更改成功");
      localState.isOpen = false;
    } else message.warning("更改失敗");
    localState.isLoading = false;
  } catch (error) {
    message.error("更改失敗");
    localState.isLoading = false;
  }
};
</script>

<template>
  <div
    class="w-full h-[95px] border-b-2 border-gray-200 flex justify-between items-center pb-2">
    <div>
      <NH2 class="pt-3 text-gray-600">{{ props.activity.name }}</NH2>
      <p class="text-gray-500">
        結束日期： {{ getShortDate(props.activity.end_date) }}
      </p>
    </div>
    <NPopover trigger="hover" placement="bottom">
      <template #trigger>
        <button
          class="mr-3 p-1 rounded-full hover:bg-primary hover:text-white transition ease-in-out text-gray-500"
          @click="activeModal">
          <EditIcon />
        </button>
      </template>
      更新活動
    </NPopover>
  </div>
  <ActivityModal
    :is-loading="localState.isLoading"
    positive-text="更新"
    :active-confirm="activeConfirm"
    :active-modal="activeModal"
    :is-open="localState.isOpen"
    title="更新活動">
    <NH3 class="mb-2"> 活動名稱 </NH3>
    <NInput
      v-model:value="nameModel"
      type="text"
      placeholder="請輸入活動名稱" />
    <NH3 class="mb-2"> 結束日期 </NH3>
    <NDatePicker
      v-model:formatted-value="endDateModel"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      clearable />
  </ActivityModal>
</template>
