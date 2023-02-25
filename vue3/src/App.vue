<script setup lang="ts">
import {computed} from 'vue'
import {useRoute, RouterLink, RouterView} from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();

const layout = computed(() => {
  const layout = route?.meta?.layout;
  return layout ? `${layout}-layout` : 'default-layout';
});
</script>

<template>
  <component :is="layout">
    <RouterView :layout.sync="layout"/>
  </component>
</template>
