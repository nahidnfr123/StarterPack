<template>
  <button
      :disabled="disabled || loading"
      :class="`flex align-center justify-center text-white bg-primary-color border-0 py-2 px-6 focus:outline-none
       hover:bg-sky-500 disabled:bg-sky-700 hover:shadow-lg
       duration-500 text-lg flex justify-center align-center
       active:bg-primary-color active:shadow-lg transition duration-200 ease-in-out
      ${className}`"
  >
    <template v-if="loading">
      <Icon name="svg-spinners:gooey-balls-2" class="mt-1 mr-2"/>
    </template>
    <template v-else>
      <slot name="icon-start"></slot>
      <slot>
        <span>{{ text }}</span>
      </slot>
      <slot name="icon-end"></slot>
    </template>
  </button>
</template>

<script setup>
defineProps({
  text: {type: String, default: 'Button'},
  loading: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  className: {type: String, default: ''},
})
</script>
