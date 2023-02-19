<template>
  <main class="min-h-screen">
    <TheHeader/>
    <main class="min-h-[70vh] mb-10">
      <div class="authBG flex flex-col justify-center items-center">
        <slot></slot>
      </div>
    </main>
  </main>
</template>


<style lang="scss">
.authBG {
  height: calc(100vh - 100px);
  width: 100%;
  background: url("/images/authBg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
<script setup lang="ts">
import TheHeader from "~/components/common/TheHeader.vue";
</script>
