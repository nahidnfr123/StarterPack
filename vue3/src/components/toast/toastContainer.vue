<template>
  <div :class="`toastContainer ${option.position}`">
    <Toast :option="option"/>
  </div>
</template>

<script setup>

import Toast from "@/components/toast/toast.vue";

const option = {
  position: 'bottom left',
  duration: 3000,
  delay: 400,
}
</script>

<style scoped>
.toastContainer {
  height: 100%;
  width: 100%;
  position: absolute;

  z-index: 99999;
  display: flex;
}

.bottom {
  bottom: 0;
}

.top {
  top: 0;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>
