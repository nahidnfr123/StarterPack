<template>
  <main class="min-h-screen">
    <Header/>
    <main class="min-h-[70vh] mb-10">
      <slot></slot>
    </main>
    <Footer/>
  </main>
</template>

<script setup lang="ts">
import Header from "~/components/common/Header.vue";
import Footer from "~/components/common/Footer.vue";
</script>
