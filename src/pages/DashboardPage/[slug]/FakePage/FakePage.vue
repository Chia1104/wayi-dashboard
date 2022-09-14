<script setup lang="ts">
import { NH2, NH3, useMessage, NButton } from "naive-ui";
import { StatusCard } from "@wanin/components";
import { useMutation } from "@vue/apollo-composable";
import { mutationUpdateFakeCount } from "@wanin/helpers/GraphQL/mutations";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { type RootState } from "@wanin/store";
import { useRoute } from "vue-router";

const route = useRoute();
const {
  mutate: update_count,
  onDone,
  onError,
} = useMutation(mutationUpdateFakeCount(route.params.slug as string));
const update_fake_string = ref("");
const store = useStore<RootState>();
const message = useMessage();
const realCount = computed(() => store.state.data.realCount);
const fakeCount = computed(() => store.state.data.fakeCount);
const handleUpdateCount = () => {
  const int_value = parseInt(update_fake_string.value);
  if (isNaN(int_value)) {
    message.warning("請輸入有效的數字");
    return;
  }
  if (int_value < 0) {
    message.warning("數字必須大於等於 0");
    return;
  }

  update_count({
    count: int_value,
  });
};
onDone(() => message.success("更新成功"));
onError((error) => {
  message.error(error.message);
});
</script>

<template>
  <div>
    <NH2>註冊人數</NH2>
    <div
      class="w-full lg:w-[700px] xl:w-[900px] grid grid-cols-1 lg:grid-cols-2 mx-auto gap-10 mt-16 gap-y-24">
      <StatusCard title="實際人數">
        <div class="w-full h-full flex justify-center items-center">
          <NH3 class="text-4xl">
            {{ realCount || 0 }}
          </NH3>
        </div>
      </StatusCard>
      <StatusCard title="調整人數">
        <div class="w-full h-full flex justify-center items-center flex-col">
          <NH3 class="text-4xl">
            {{ fakeCount + realCount || 0 }}
          </NH3>
          <input
            id="fake_count_text"
            v-model="update_fake_string"
            type="text"
            name="rot13_text"
            class="w-full md:w-[70%] p-3 border border-gray-300 rounded-lg my-5 mx-auto"
            :placeholder="`已灌水人數： ${fakeCount.toString()}`" />
          <NButton class="mt-4" :disabled="false" @click="handleUpdateCount">
            更新
          </NButton>
        </div>
      </StatusCard>
    </div>
  </div>
</template>
