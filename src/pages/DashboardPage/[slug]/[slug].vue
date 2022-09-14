<script setup lang="ts">
import {
  NBackTop,
  NBreadcrumb,
  NBreadcrumbItem,
  NDropdown,
  useMessage,
} from "naive-ui";
import { SideBar } from "@wanin/components";
import { useRoute, useRouter } from "vue-router";
import HomePage from "./HomePage";
import { useSubscription } from "@vue/apollo-composable";
import {
  suscripFakeCount,
  suscripRealCount,
  SUSCRIP_ALL_ACTIVITIES,
} from "@wanin/helpers/GraphQL/subscriptions";
import { useStore } from "vuex";
import { onBeforeUnmount, computed, ref } from "vue";
import { type RootState } from "@wanin/store";
import type { Activity, FakeCount, RealCount } from "@wanin/shared/types";
import { VERSION } from "@wanin/shared/constant";
import { useStorage } from "@vueuse/core";

interface SuscripActivity {
  activity: Activity[];
}

const slugPath = useStorage<Activity[] | any[]>("slugPath", [{ foo: "bar" }]);
const route = useRoute();
const router = useRouter();
const store = useStore<RootState>();
const message = useMessage();
const {
  onResult: onFakeResult,
  onError: onFakeError,
  restart: restartFake,
  stop: stopFake,
} = useSubscription<FakeCount>(
  suscripFakeCount(route.params.slug as string),
  null,
  () => ({
    fetchPolicy: "no-cache",
  })
);
const {
  onResult: onRealResult,
  onError: onRealError,
  restart: restartReal,
  stop: stopReal,
} = useSubscription<RealCount>(
  suscripRealCount(route.params.slug as string),
  null,
  () => ({
    fetchPolicy: "no-cache",
  })
);
const {
  onResult: onActivitiesResult,
  onError: onActivitiesError,
  restart: restartActivities,
  stop: stopActivities,
} = useSubscription<SuscripActivity>(SUSCRIP_ALL_ACTIVITIES, null, () => ({
  fetchPolicy: "no-cache",
}));

const activityName = computed(
  () =>
    slugPath.value.find((slug) => slug.slug === route.params.slug)?.name ||
    "活動名稱"
);
const isSideBarOpen = computed(() => store.state.sideBar.isOpen);
const logout = () =>
  store.dispatch("logoutAction").then(() => router.push("/login"));
const email = computed(() => store.state.auth.user?.email || "");
const handleSideBarOpen = () => store.dispatch("activeSideBarAction");
const dropDownOptions = ref(
  slugPath.value.map((activity) => ({
    label: activity.name,
    key: activity.slug,
  }))
);

const handleDropdownSelect = (key: string) => {
  router.push(`/dashboard/${key}`);
};

onFakeResult((result) => {
  store.dispatch("setFakeCountAction", result?.data?.register_count[0]?.count);
});
onFakeError(() => {
  message.error("Connection error");
  restartFake();
});
onRealResult((result) => {
  store.dispatch(
    "setRealCountAction",
    result?.data?.register?.aggregate?.count
  );
});
onRealError(() => {
  message.error("Connection error");
  restartReal();
});
onActivitiesResult((result) => {
  store.dispatch("setActivitiesAction", result?.data?.activity);
  slugPath.value = result?.data?.activity;
});
onActivitiesError(() => {
  message.error("Connection error");
  restartActivities();
});

onBeforeUnmount(() => {
  stopFake();
  stopReal();
  stopActivities();
});
</script>

<template>
  <SideBar
    :title="(slugPath.find((slug) => slug.slug === route.params.slug)?.name as string)"
    :activity-name="(route.params.slug as string)"
    :version="`v ${VERSION}`"
    :email="email"
    :is-side-bar-open="isSideBarOpen"
    :active-side-bar="handleSideBarOpen"
    :handle-logout="logout" />
  <NBackTop :right="30" />
  <div class="md:ml-64 p-10 pt-0 mb-10">
    <!-- <NImage v-once width="200" :src="logo" preview-disabled /> -->
    <div class="mt-10" />
    <div class="w-full mb-10">
      <NBreadcrumb>
        <NBreadcrumbItem href="/admin/dashboard">管理系統</NBreadcrumbItem>

        <NBreadcrumbItem :href="`/admin/dashboard/${route.params.slug}`">
          <NDropdown :options="dropDownOptions" @select="handleDropdownSelect">
            <div class="trigger">
              {{ activityName }}
            </div>
          </NDropdown>
        </NBreadcrumbItem>
        <NBreadcrumbItem v-if="route.path === `/dashboard/${route.params.slug}`"
          >資訊主頁</NBreadcrumbItem
        >
        <NBreadcrumbItem
          v-if="route.path === `/dashboard/${route.params.slug}/player-list`"
          >註冊表單</NBreadcrumbItem
        >
        <NBreadcrumbItem
          v-if="route.path === `/dashboard/${route.params.slug}/fake-count`"
          >註冊人數</NBreadcrumbItem
        >
        <NBreadcrumbItem
          v-if="route.path === `/dashboard/${route.params.slug}/chart`"
          >圖表</NBreadcrumbItem
        >
      </NBreadcrumb>
    </div>
    <HomePage v-if="route.path === `/dashboard/${route.params.slug}`" />
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
