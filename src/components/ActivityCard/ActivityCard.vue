<script setup lang="ts">
import { defineProps } from "vue";
import { NH2, NH3 } from "naive-ui";
import { getShortDate } from "@wanin/utils/day.util";
import type { Activity } from "@wanin/shared/types";
import { CubeTransparentIcon } from "@wanin/components/icons";

interface Props {
  activity: Activity;
}
defineProps<Props>();
</script>

<template>
  <router-link
    :to="`/dashboard/${activity.slug}`"
    class="w-full rounded-xl shadow-lg hover:shadow-2xl shadow-gray-300 py-0 p-5 bg-white flex flex-col group hover:-translate-y-1.5 duration-300 transition ease-in-out">
    <div class="flex items-center gap-3">
      <CubeTransparentIcon class="w-7 h-7" />
      <NH2 class="w-text-bg-sec-half line-clamp-1">{{ activity.name }}</NH2>
    </div>
    <hr class="mt-5" />
    <NH3 class="self-start"
      >結束日期：{{ getShortDate(activity.end_date) }}</NH3
    >
  </router-link>
</template>
