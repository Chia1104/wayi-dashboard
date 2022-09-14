<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  zhTW,
  dateZhTW,
} from "naive-ui";
import { themeOverrides } from "@wanin/config/theme.config";
import { auth } from "@wanin/helpers/firebase/firebase.config";
import { useStore } from "vuex";
import { watchEffect } from "vue";

const store = useStore();

const firebaseUser = () =>
  auth.onAuthStateChanged((user) => {
    if (user) store.commit("loginSuccess", user);
    else store.commit("loginError", "You are not logged in");
  });

watchEffect(firebaseUser);
</script>

<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="zhTW"
    :date-locale="dateZhTW">
    <NDialogProvider>
      <NMessageProvider placement="bottom-right">
        <NNotificationProvider>
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
