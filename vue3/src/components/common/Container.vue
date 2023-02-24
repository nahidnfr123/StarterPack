<template>
  <div :class="`container max-w-7xl sm:px-2 px-4 mx-auto ${className}`">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  className: {type: String, default: ''}
})
</script>
