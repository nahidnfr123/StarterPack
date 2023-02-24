<template>
  <button
      :disabled="disabled || isLoading"
      :class="`relative flex align-middle items-center justify-center py-4 pl-4 pr-12 overflow-hidden font-semibold text-white
       transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 hover:shadow-lg bg-primary-color group shadow-lg
       disabled:pointer-events-none ${className}`"
  >
    <template v-if="isLoading">
      <Icon name="svg-spinners:gooey-balls-2" class="mt-1 mr-2"/>
    </template>
    <template v-else>
      <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-sky-500 group-hover:h-full disabled:group-hover:h-1"></span>
      <slot name="icon-start">
        <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12 disabled:group-hover:translate-x-0">
          <Icon name="fa6-solid:arrow-right-long" class="ml-2"/>
        </span>
      </slot>

      <slot name="icon-end">
        <span class="absolute left-0 pl-2.5 -translate-x-12 disabled:group-hover:-translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <Icon name="fa6-solid:arrow-right-long" class="ml-2"/>
        </span>
      </slot>
      <slot>
        <span class="relative w-full text-center transition-colors duration-150 ease-in-out text-white">{{ text }}</span>
      </slot>
    </template>
  </button>
</template>

<script setup>
defineProps({
  text: {type: String, default: 'Button'},
  isLoading: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  className: {type: String, default: ''},
})
</script>
