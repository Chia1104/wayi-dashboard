<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { NModal, NSpin } from "naive-ui";

interface Props {
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  activeModal: () => void;
  activeConfirm: () => void;
  positiveText?: string;
}
withDefaults(defineProps<Props>(), {
  positiveText: "確認",
  isOpen: false,
  isLoading: false,
});
</script>

<template>
  <NModal
    :show="isOpen"
    preset="dialog"
    :title="title"
    :positive-text="positiveText"
    negative-text="取消"
    :on-close="activeModal"
    :on-negative-click="activeModal"
    :on-positive-click="activeConfirm"
    :on-mask-click="activeModal">
    <NSpin :show="isLoading">
      <template #header>
        <div>{{ title }}</div>
      </template>
      <slot />
    </NSpin>
  </NModal>
</template>
