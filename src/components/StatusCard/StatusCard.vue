<script setup lang="ts">
import { NH3 } from "naive-ui";
import { defineProps } from "vue";

interface Props {
  title: string;
  titleStyle?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
    class="w-full min-h-[300px] rounded-2xl bg-white shadow-gray-200 shadow-2xl relative p-5">
    <div class="w-full flex justify-center">
      <div
        class="w-[80%] h-[70px] rounded-2xl bg-primary shadow-primary shadow-2xl absolute -top-5 p-5"
        :class="props.titleStyle">
        <NH3 class="text-white">
          {{ props.title || "Title" }}
        </NH3>
      </div>
    </div>
    <div class="w-full h-full mt-14 pb-14">
      <slot />
    </div>
  </div>
</template>
