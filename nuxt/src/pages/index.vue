<template>
  Index Page
</template>

<script setup>
import {useAuthStore} from "~/stores/auth";

const authStore = useAuthStore()
authStore.getUser()
</script>
