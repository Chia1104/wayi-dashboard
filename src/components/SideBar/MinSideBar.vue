<script setup lang="ts">
import { MenuIcon, CloseIcon } from "@wanin/components/Icons";
import { defineProps, withDefaults } from "vue";

interface Props {
  activeSideBar: () => void;
  isSideBarOpen: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isSideBarOpen: false,
});
</script>

<template>
  <nav class="bg-light-blue-500 lg:ml-64 py-6 px-3">
    <div
      class="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
      <div class="lg:hidden">
        <button
          class="bg-white p-1 rounded-lg hover:bg-primary hover:text-white transition ease-in-out shadow-gray-500/50 shadow-xl fixed z-10"
          @click="props.activeSideBar">
          <MenuIcon />
        </button>
        <div
          class="absolute top-5 lg:hidden z-50 transition-all duration-300 ml-5"
          :class="props.isSideBarOpen ? 'left-64' : '-left-64'">
          <button
            class="bg-white p-1 rounded-lg hover:bg-primary hover:text-white transition ease-in-out shadow-gray-500/50 shadow-xl fixed z-10"
            @click="props.activeSideBar">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
