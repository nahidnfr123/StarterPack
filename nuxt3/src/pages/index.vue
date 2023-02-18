<template>
  <Container>
    {{ authStore.user }}
  </Container>
</template>

<script setup>
import Container from "~/components/common/Container.vue";
import {useAuthStore} from "~/stores/auth";

const authStore = useAuthStore()
authStore.getUser()
</script>
