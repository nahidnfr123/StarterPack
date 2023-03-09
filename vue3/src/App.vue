<script setup>
import {computed} from 'vue'
import {useRoute, RouterLink, RouterView} from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import {useAuthStore} from "@/stores/auth";

const route = useRoute();

const layout = computed(() => {
  const layout = route?.meta?.layout;
  return layout ? `${layout}-layout` : 'default-layout';
});

const authStore = useAuthStore()
authStore.getUser()
</script>

<template>
  <component :is="layout">
    <RouterView :layout.sync="layout"/>
  </component>
</template>
