<template>
  <main class="min-h-screen">
    <TheHeader/>
    <main class="min-h-[70vh] mb-10">
      <slot/>
    </main>
    <TheFooter/>
  </main>
</template>

<script setup>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import {defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";

defineComponent({
  name: 'DefaultLayout'
})

const authStore = useAuthStore()
authStore.getUser()
</script>
