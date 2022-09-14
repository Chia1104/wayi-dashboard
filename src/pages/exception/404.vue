<script setup lang="ts">
import { NResult, NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <NResult
      status="404"
      title="404 Not Found"
      description="You know life is always ridiculous.">
      <template #footer>
        <NButton :on-click="() => router.push('/')"> Go Home </NButton>
      </template>
    </NResult>
  </div>
</template>
