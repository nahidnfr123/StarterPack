<template>
  <div :class="`flex rounded-lg p-4 mb-4 text-sm ${color}`" role="alert">
    <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
    </svg>
    <div>
      <slot/>
    </div>
  </div>
</template>


<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {type: String, default: ''}
})

const color = computed(() => {
  if (props.type === 'info') return 'bg-blue-100 text-blue-700'
  else if (props.type === 'danger' || props.type === 'error') return 'bg-red-100 text-red-700'
  else if (props.type === 'success') return 'bg-green-100 text-green-700'
  else if (props.type === 'warning') return 'bg-yellow-100 text-yellow-700'
  else return 'bg-zinc-100 text-zinc-700'
})
</script>
