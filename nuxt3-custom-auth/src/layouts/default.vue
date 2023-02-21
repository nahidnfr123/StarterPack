<template>
  <main class="min-h-screen">
    <TheHeader/>
    <main class="min-h-[70vh] mb-10">
      <slot></slot>
    </main>
    {{ authStore.user }}
    <TheFooter/>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "~/components/common/TheHeader.vue";
import TheFooter from "~/components/common/TheFooter.vue";

import {useAuthStore} from "~/stores/auth";

const authStore = useAuthStore()
authStore.getUser()
</script>
