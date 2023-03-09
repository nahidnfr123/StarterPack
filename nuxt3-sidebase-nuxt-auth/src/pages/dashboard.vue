<template>
  <Container>
    <h1 class="my-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Dashboard</h1>
  </Container>
</template>

<script setup>
import Container from "~/components/common/Container.vue";

definePageMeta({
  middleware: ["require-auth"]
})
</script>
