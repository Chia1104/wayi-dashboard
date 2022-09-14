<script setup lang="ts">
import MinSideBar from "./MinSideBar.vue";
import { NH2, NPopover, NPopconfirm } from "naive-ui";
import { defineProps, withDefaults } from "vue";
import {
  HomeIcon,
  ListIcon,
  CountIcon,
  PieChartIcon,
  LogoutIcon,
} from "@wanin/components/Icons";
import { useRoute } from "vue-router";

interface Props {
  title?: string;
  activityName: string;
  handleLogout: () => void;
  email: string;
  isSideBarOpen: boolean;
  activeSideBar: () => void;
  version?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Wanin",
  email: "",
  isSideBarOpen: false,
  version: "",
});
const route = useRoute();
</script>

<template>
  <MinSideBar
    :is-side-bar-open="isSideBarOpen"
    :active-side-bar="activeSideBar" />
  <div
    class="h-screen fixed flex-col top-0 md:left-0 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300 text-gray-500"
    :class="props.isSideBarOpen ? 'left-0' : '-left-64'">
    <div
      class="flex-col items-stretch min-h-full flex-nowrap px-0 relative items-center">
      <NH2 class="m-0">{{ title }}</NH2>
      <div class="flex flex-col h-full">
        <hr class="my-4 min-w-full" />
        <ul class="flex-col min-w-full flex list-none">
          <router-link
            :to="`/dashboard/${activityName}`"
            class="rounded-lg mb-4 p-2 hover:bg-primary hover:text-white transition ease-in-out flex gap-2"
            :class="
              route.path === `/dashboard/${activityName}` &&
              'bg-primary text-white'
            ">
            <HomeIcon class="w-5 h-5" />
            資訊主頁
          </router-link>
          <router-link
            :to="`/dashboard/${activityName}/player-list`"
            :class="
              route.path === `/dashboard/${activityName}/player-list` &&
              'bg-primary text-white'
            "
            class="rounded-lg mb-4 p-2 hover:bg-primary hover:text-white transition ease-in-out flex gap-2">
            <ListIcon class="w-5 h-5" />
            註冊表單
          </router-link>
          <router-link
            :to="`/dashboard/${activityName}/fake-count`"
            :class="
              route.path === `/dashboard/${activityName}/fake-count` &&
              'bg-primary text-white'
            "
            class="rounded-lg mb-4 p-2 hover:bg-primary hover:text-white transition ease-in-out flex gap-2">
            <CountIcon class="w-5 h-5" />
            註冊人數
          </router-link>
          <router-link
            :to="`/dashboard/${activityName}/chart`"
            :class="
              route.path === `/dashboard/${activityName}/chart` &&
              'bg-primary text-white'
            "
            class="rounded-lg mb-4 p-2 hover:bg-primary hover:text-white transition ease-in-out flex gap-2">
            <PieChartIcon class="w-5 h-5" />
            圖表
          </router-link>
        </ul>
        <div class="absolute bottom-0">
          <NPopover>
            <template #trigger>
              <p class="mb-2 line-clamp-1 w-link px-2">您好，{{ email }}</p>
            </template>
            <span>{{ email }}</span>
          </NPopover>
          <NPopconfirm @positive-click="handleLogout()">
            <template #trigger>
              <button
                class="py-1 px-2 rounded-lg hover:bg-red-200 transition text-gray-500 flex justify-center items-center">
                登出
                <span class="ml-1">
                  <LogoutIcon />
                </span>
              </button>
            </template>
            <span> 您確定要登出嗎？ </span>
          </NPopconfirm>
          <p class="text-gray-400">{{ version }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
