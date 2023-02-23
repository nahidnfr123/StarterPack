<template>
  <NuxtLayout>
    <!-- Show Page once User fetch request is complete -->
    <NuxtPage v-if="!isLoading"/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";

const authStore = useAuthStore()
const isLoading = ref(true)
const init = async () => {
  await authStore.getUser()
  isLoading.value = false
}

init()
</script>
