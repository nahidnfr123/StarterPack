<template>
  <template v-if="props.error && props.error.statusCode == '404'">
    <Error404/>
  </template>
  <template v-else-if="props.error && props.error.statusCode == '500'">
    {{ props.error }}
  </template>
  <template v-else>
    An error occurred
  </template>
</template>
<script setup>
import Error404 from "~/components/Error/Error404.vue";

// const error = useError()

const props = defineProps({
  error: Object
})

const handleError = () => clearError({redirect: '/'})
</script>
