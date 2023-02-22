<template>
  <Container>
    Dash
  </Container>
</template>

<script setup>
import Container from "~/components/common/Container.vue";

definePageMeta({
  middleware: ["require-auth"]
})
</script>
