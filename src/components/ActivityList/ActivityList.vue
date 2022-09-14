<script setup lang="ts">
import { defineProps } from "vue";
import type { Activity } from "@wanin/shared/types";
import ActivityItem from "./ActivityItem.vue";

interface Props {
  activities: Activity[];
}
const props = defineProps<Props>();
</script>

<template>
  <div class="w-full grid grid-cols-1">
    <ActivityItem
      v-for="activity in props.activities.slice(0, 3)"
      :key="activity.id"
      :activity="activity" />
  </div>
</template>
