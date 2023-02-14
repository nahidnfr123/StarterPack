<template>
  <Container>
    <Banner/>
    {{ authStore.user }}
  </Container>
</template>

<script setup>
import Container from "~/components/common/Container.vue";
import Banner from "~/components/Home/Banner.vue";
import {useAuthStore} from "~/stores/auth";

const authStore = useAuthStore()
authStore.getUser()
</script>
