<script setup lang="ts">
import { NDataTable, NH2, NPopover, NButton, useMessage } from "naive-ui";
import { useQuery } from "@vue/apollo-composable";
import { queryAllPlayers } from "@wanin/helpers/GraphQL/query";
import { playerListColumns } from "@wanin/config/player-list-columns.config";
import { getShortDateTime } from "@wanin/utils/day.util";
import { phoneFormat } from "@wanin/utils/phone.util";
import { DownloadIcon } from "@wanin/components/Icons";
import { exportAllPlayers } from "@wanin/helpers/api";
import { reactive } from "vue";
import { useFileDownload } from "@wanin/composables";
import type { RegisterResult } from "@wanin/shared/types";
import { refreshToken } from "@wanin/helpers/firebase/auth/services";
import { useRoute } from "vue-router";

type PlayerList = {
  register: RegisterResult[];
};

const route = useRoute();
const { result } = useQuery<PlayerList>(
  queryAllPlayers(route.params.slug as string)
);
const paginationReactive = reactive({
  page: 1,
  pageSize: 50,
  showSizePicker: true,
  pageSizes: [10, 50, 100],
  onChange: (page: number) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  },
});
const localState = reactive({
  isLoading: false,
});
const message = useMessage();

const { download, refAnchorElement } = useFileDownload({
  preDownloading: () => {
    localState.isLoading = true;
  },
  postDownloading: () => {
    localState.isLoading = false;
  },
  apiDefinition: () =>
    refreshToken().then((token) =>
      exportAllPlayers(token, route.params.slug as string)
    ),
  getFileName: () => "all-players.xlsx",
  onError: () => message.error("下載失敗"),
});
</script>

<template>
  <div>
    <div class="flex items-center mb-5 w-full justify-between">
      <NH2 class="m-0">註冊表單</NH2>
      <div class="md:mr-10">
        <NPopover trigger="hover" placement="bottom">
          <template #trigger>
            <NButton
              :loading="localState.isLoading"
              :disabled="localState.isLoading"
              @click="download">
              <DownloadIcon class="w-4 h-4 mr-1" /> 匯出
            </NButton>
          </template>
          所有玩家
        </NPopover>
        <a ref="refAnchorElement" class="hidden" />
      </div>
    </div>
    <div class="rounded-2xl overflow-hidden shadow-lg pb-2">
      <NDataTable
        v-if="result"
        :columns="playerListColumns"
        :data="
          result.register.map((d) => ({
            id: d.id,
            phone: phoneFormat(d.phone),
            created_at: getShortDateTime(d.created_at),
          }))
        "
        :pagination="paginationReactive"
        :bordered="false" />
    </div>
  </div>
</template>
